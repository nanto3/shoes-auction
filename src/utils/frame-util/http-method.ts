import { Express } from "express";
import respond, { ProcessReq } from "./responder";

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'
export const getHttpMethod = ( app: Express, baseUrl='' ) => {

  const methodFormat = ( httpMethod: HttpMethod ) => 
    ( url: string, ...middlewares: any[]) => ( callback: ProcessReq | any[]) => {
      if ( Array.isArray( callback ) ) {
        return ( processReq: ProcessReq ) => {
          app[httpMethod]( baseUrl + url, [ ...middlewares, ...callback ], respond( processReq ) );
        };
      }
      app[httpMethod]( baseUrl + url, middlewares ,respond( callback ) );
    };

  return {
    get: methodFormat( 'get' ),
    post: methodFormat( 'post' ),
    patch: methodFormat( 'patch' ),
    put: methodFormat( 'put' ),
    destroy: methodFormat( 'delete' ),
  };
};
