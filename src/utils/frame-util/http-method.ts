import { Express } from "express";
import respond, { ProcessReq } from "./responder";

export const getHttpMethods = ( app: Express, baseUrl='' ) => {
  return {
    get: ( url: string, ...middlewares ) => ( processReq: ProcessReq ) => {
      app.get( baseUrl + url, middlewares, respond( processReq ) );
    },
    post: ( url: string, ...middlewares ) => ( processReq: ProcessReq ) => {
      app.post( baseUrl + url, middlewares, respond( processReq ) );
    },
    patch: ( url: string, ...middlewares ) => ( processReq: ProcessReq ) => {
      app.patch( baseUrl + url, middlewares, respond( processReq ) );
    },
    put: ( url: string, ...middlewares ) => ( processReq: ProcessReq ) => {
      app.put( baseUrl + url, middlewares, respond( processReq ) );
    },
    destroy: ( url: string, ...middlewares ) => ( processReq: ProcessReq ) => {
      app.delete( baseUrl + url, middlewares, respond( processReq ) );
    },
  };
};
