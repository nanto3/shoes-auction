import { Router } from "express";
import respond, { ProcessReq } from "./responder";

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export const getHttpMethod = ( router: Router, baseUrl='' ) => {
  
  const methodFormat = ( httpMethod: HttpMethod ) => 
    ( url: string, ...middlewares ) => ( _, processReq: ProcessReq ) => {
      return router[httpMethod]( baseUrl + url, middlewares, respond( processReq ) );  
    };

  return {
    get: methodFormat( 'get' ),
    post: methodFormat( 'post' ),
    patch: methodFormat( 'patch' ),
    put: methodFormat( 'put' ),
    destroy: methodFormat( 'delete' ),
  };
};
