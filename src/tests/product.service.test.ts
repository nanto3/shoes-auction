import { describe, it, test, expect } from "@jest/globals";
import { ProductService } from "../domains/product/product.service";

describe( 'product-service', () => {

  describe( 'register', () => {
    const ProductRepository = () => {
      const products = [];
      return {
        createProduct: ( product ) => {
          const body = { ...product, id: products.length + 1 };
          products.push( body );
          return body;
        },
        saveProduct: ( product ) => product,
        findAndCountAll: ( ...params ) => { return {} as any;},
        findOneBy: ({ email }: any ) => products.find( anUser => anUser.email === email ),
      } as any;
    };
    const productVO = {
      userId: 1,
      brand: 'NIKE' as 'NIKE'|'ADIDAS'|'ETC',
      name: 'jordan1 cichago',
      price: 500_000,
      auctionCloseDate: new Date( '2023-08-20 22:00:00' ),
    };
    
    it( 'returns product with id', async () => {
      const productService = new ProductService( ProductRepository() );
  
      const product = await productService.createProdudct( productVO );
      
      expect( product ).toEqual({ id: 1, ...productVO });
    });
  });
});
