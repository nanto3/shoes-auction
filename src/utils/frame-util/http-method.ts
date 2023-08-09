import { type Router } from "express";
import respond, { ProcessReq } from "./responder";

export type HttpMethodType = 'get' | 'post' | 'patch' | 'put' | 'delete';

export interface ReturnHttpMethod {
  getMethod: ( baseUrl: string ) => Record<string, any>;
}

const httpMethodFormat = ( router: Router, httpMethod: HttpMethodType, baseUrl: string ) => 
  ( url: string, ...middlewares ) => ( _, processReq: ProcessReq ) => {
    router[httpMethod]( baseUrl + url, middlewares, respond( processReq ) );  
  };

const HttpMethod = ( router: Router ): ReturnHttpMethod => {
  return {
    getMethod: ( baseUrl: string ) => ({
      get: httpMethodFormat( router, 'get', baseUrl ),
      post: httpMethodFormat( router, 'post', baseUrl ),
      patch: httpMethodFormat( router, 'patch', baseUrl ),
      put: httpMethodFormat( router, 'put', baseUrl ),
      destroy: httpMethodFormat( router, 'delete', baseUrl ),
    }),
  };
};

export default HttpMethod;
