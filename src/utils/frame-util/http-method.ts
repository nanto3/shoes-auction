import { type Router } from "express";
import respond, { ProcessReq } from "./responder";

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

const httpMethodFormat = ( router: Router, httpMethod: HttpMethod, baseUrl: string ) => 
  ( url: string, ...middlewares ) => ( _, processReq: ProcessReq ) => {
    return router[httpMethod]( baseUrl + url, middlewares, respond( processReq ) );  
  };

const getHttpMethod = ( router: Router, baseUrl='' ) => {
  return {
    get: httpMethodFormat( router, 'get', baseUrl ),
    post: httpMethodFormat( router, 'post', baseUrl ),
    patch: httpMethodFormat( router, 'patch', baseUrl ),
    put: httpMethodFormat( router, 'put', baseUrl ),
    destroy: httpMethodFormat( router, 'delete', baseUrl ),
  };
};

export default getHttpMethod;
