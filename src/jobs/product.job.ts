import { Transaction, Op } from "sequelize";
import { sequelize } from "../entities";
import scheduler from "../configs/scheduler.config";
import { ProductRepository } from "../domains/product";
import { type AuctionRepository } from "../domains/auction";
import { Auction } from "../entities";

export default class ProductJob {
  constructor( 
    private productRepository: ProductRepository, 
    private auctionRepository: AuctionRepository ) {}

  async scheduleAuctionClose( productId: number, auctionCloseDate: Date ) {
    scheduler.makeSchedule({
      id: productId, 
      executionDate: auctionCloseDate, 
      job: async () => {
        try {
          const auction = await this.auctionRepository.findOneBy({ productId }, { order: [ [ 'bidPrice', 'desc' ] ] });
  
          if ( !auction ) {
            const pendingCloseDate = new Date( new Date( auctionCloseDate ).setDate( new Date( auctionCloseDate ).getDate() + 2 ) );

            return await this.setProductPending( productId, pendingCloseDate );
          }

          await this.achieveAuction( auction );
        } catch ( error ) {
          console.log( error );
        }
      }, 
    });
  }

  private async achieveAuction( auction: Auction ) {
    let transaction: Transaction;
    try {
      transaction = await sequelize.transaction();

      auction.result = 'SUCCEEDED';      
    
      await this.auctionRepository.save( auction, transaction );
      await this.auctionRepository.update({ result: 'FAILED' }, { where: { productId: auction.productId, id: { [Op.not]: auction.id } }, transaction });
      await this.productRepository.update({ status: 'WAITING' }, { where: { id: auction.productId }, transaction });
    } catch ( error ) {
      if ( transaction ) {
        await transaction.rollback().catch( err => console.error( err ) );
      }
      throw error;
    }
  }

  private async setProductPending( productId: number, pendingCloseDate: Date ) {
    await this.productRepository.update({ status: 'PENDING' }, { where: { id: productId } });
    
    scheduler.makeSchedule({
      id: productId, 
      executionDate: pendingCloseDate, 
      job: async () => {
        await this.productRepository.update({ status: 'FAILED' }, { where: { id: productId, status: 'PENDING' } });
      }, 
    });
  }
}
