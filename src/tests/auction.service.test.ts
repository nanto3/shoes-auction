import { describe, it, test, expect } from "@jest/globals";
import { AuctionService } from "../domains/auction";
import { ProductService } from "../domains/product";

describe( 'auction-service', () => {

  describe( 'bid', () => {

    const AuctionRepository = () => {
      const auctions = [];
      return {
        save: ( auction ) => auction,   
        findOneBy: ({ id }: any ) => auctions.find( anAuction => anAuction.id === id ), 
      } as any;
    };

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

    const productRepository = ProductRepository();

    beforeAll( () => {
      const productVO = {
        userId: 1,
        brand: 'NIKE' as 'NIKE'|'ADIDAS'|'ETC',
        name: 'jordan1 cichago',
        price: 500_000,
        auctionCloseDate: new Date( '2023-08-20 22:00:00' ),
      };
      const productService = new ProductService( productRepository );
      productService.createProdudct( productVO );
    });
    
    it( 'returns product with id', async () => {
      const auctionService = new AuctionService( AuctionRepository(), productRepository );
  
      
      // expect( product ).toEqual({ id: 1, ...productVO });
    });
  });
});
