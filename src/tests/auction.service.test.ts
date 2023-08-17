import { describe, it, test, expect } from "@jest/globals";
import { AuctionService } from "../domains/auction";
import { ProductService } from "../domains/product";

describe( 'auction-service', () => {

  const AuctionRepository = () => {
    const auctions = [];
    return {
      save: ( auction ) => auction,   
      findOneBy: ({ id }: any ) => auctions.find( anAuction => anAuction.id === id ), 
    } as any;
  };

  describe( 'bid', () => {

    const ProductRepository = () => {
      const products = [];
      return {
        createProduct: ( product ) => {
          const body = { ...product, id: products.length + 1 };
          products.push( body );
          return body;
        },
        saveProduct: ( product ) => product,
        findAndCountAll: ( ...params ) => { return products;},
        findOneBy: ({ email }: any ) => products.find( anUser => anUser.email === email ),
      } as any;
    };

    let productRepository;
    let auctionService;
    let auctionVO;

    beforeAll( async () => {
      productRepository = ProductRepository();
      const productService = new ProductService( productRepository )
      ;
      await productService.createProdudct({
        userId: 1,
        brand: 'NIKE' as 'NIKE'|'ADIDAS'|'ETC',
        name: 'jordan1 cichago',
        price: 500_000,
        auctionCloseDate: new Date( '2023-08-20 22:00:00' ),
      });
    });

    beforeEach( () => {
      auctionService = new AuctionService( AuctionRepository(), productRepository );

      // success case
      auctionVO = { 
        userId: 2, 
        productId: 1, 
        bidPrice: 500_000, 
        nowDate: new Date( '2023-08-19 22:00:00' ), 
      };
    });


    it( 'should need an product which coincides productId', async () => {
      try {
        auctionVO.productId = 2;

        await auctionService.bid( auctionVO );
      } catch ( error ) {
        expect( error.message ).toMatch( 'product not exist' );
      }
    });

    it( 'should have earlier nowDate than auctionCloseDate', async () => {
      try {
        auctionVO.nowDate = new Date( '2023-08-21 22:00:00' );

        await auctionService.bid( auctionVO );
      } catch ( error ) {
        expect( error.message ).toMatch( 'auction closed' );
      }
    });

    it( 'should be different user', async () => {
      try {
        auctionVO.userId = 1;

        await auctionService.bid( auctionVO );
      } catch ( error ) {
        expect( error.message ).toMatch( `can't bid for own product` );
      }
    });

    it( 'should have larger bidPrice than last one', async () => {
      try {
        auctionVO.bidPrice = 490_000;

        await auctionService.bid( auctionVO );
      } catch ( error ) {
        expect( error.message ).toMatch( 'bidPrice should be larger than last bidPrice' );
      }
    });
    
    it( 'returns auction', async () => {
    });
  });
});
