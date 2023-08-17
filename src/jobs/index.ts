import type EventEmitter from 'events';
import ProductJob from './product.job';

export default class JobEvent {
  constructor( 
    private emitter: EventEmitter, 
    private productJob: ProductJob ) {

    this.emitter.on( 'register-product', ( productId, auctionCloseDate ) =>{
      console.log( 'Emit product event: register-product' );
      this.productJob.scheduleAuctionClose( productId, auctionCloseDate );
    });
  }
  
  scheduleAuctionClose( productId: number, auctionCloseDate: Date ) {
    this.emitter.emit( 'register-product', productId, auctionCloseDate );
  }
}

export { ProductJob };
