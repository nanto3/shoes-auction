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
        findAndCountAll: ( ...params ) => { return products;},
        findOneBy: ({ id }: any ) => products.find( anProduct => anProduct.id === id ),
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

    it( 'returns products', async () => {
      const productService = new ProductService( ProductRepository() );
      const product = await productService.createProdudct( productVO );
      
      const products = await productService.getProducts({ page: 1, limit: 10, brand: null });
      
      expect( products ).toEqual([ product ]);
    });
  });
});
