import { Express } from "express";
import respond from "./responder";

export const getHttpMethods = ( app: Express, baseUrl='' ) => {
  return {
    get: ( url, ...middlewares ) => ( callback ) => {
      app.get( baseUrl + url, middlewares, respond( ( req, options ) => {
        return callback( req, options );
      }) );
    },
    post: ( url, ...middlewares ) => ( callback ) => {
      app.post( baseUrl + url, middlewares, respond( ( req, options ) => {
        return callback( req, options );
      }) );
    },
    patch: ( url, ...middlewares ) => ( callback ) => {
      app.patch( baseUrl + url, middlewares, respond( ( req, options ) => {
        return callback( req, options );
      }) );
    },
    put: ( url, ...middlewares ) => ( callback ) => {
      app.put( baseUrl + url, middlewares, respond( ( req, options ) => {
        return callback( req, options );
      }) );
    },
    destroy: ( url, ...middlewares ) => ( callback ) => {
      app.delete( baseUrl + url, middlewares, respond( ( req, options ) => {
        return callback( req, options );
      }) );
    },
  };
};
