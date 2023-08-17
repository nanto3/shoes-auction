import { Request, Response, NextFunction, Router } from "express";
import respond, { ProcessReq } from "./responder";

type HttpMethod =  'get' | 'post' | 'patch' | 'put' | 'delete';
type Middleware = ( req: Request ) => void | Promise<void>;
type ControllerWithBaseUrl = [any, string];

interface RouteInfo {
  httpMethod: HttpMethod;
  url: string;
  middlewares: Middleware[];
}

const routeInfoSetterFormat = ( httpMethod: HttpMethod ) => 
  ( url: string, ...middlewares: Middleware[]) => ( controllerMethod: ProcessReq ) => {
    Object.defineProperty( controllerMethod, 'routeInfo', {
      value: {
        httpMethod,
        url,
        middlewares: middlewares.map( middleware => {
          return ( req: Request, _, next: NextFunction ) =>{
            try { 
              middleware( req );
              next();
            }
            catch ( error ) {
              next( error );
            }
          };
        }),
      },
    });
    return controllerMethod;
  };
export const Get = routeInfoSetterFormat( 'get' );
export const Post = routeInfoSetterFormat( 'post' );
export const Patch = routeInfoSetterFormat( 'patch' );
export const Put = routeInfoSetterFormat( 'put' );
export const Delete = routeInfoSetterFormat( 'delete' );

const construct = ( constructor, dependency? ) => {
  if ( typeof constructor !== 'function' ) {
    return constructor;
  }
  dependency = dependency && ( Array.isArray( dependency ) ? dependency : [ dependency ]);
  try {
    return dependency?.length > 0 ? 
      new constructor( ...dependency ): 
      new constructor();
  } catch {
    try {
      return dependency?.length > 0 ? 
        constructor( ...dependency ) : 
        constructor();
    } catch {
      return construct;
    }
  }
};

const injectDependency = ( dependencyInfo: any[]) => {
  return dependencyInfo
    .reverse()
    .reduce( ( dependency, constructor ) => {
      if ( Array.isArray( constructor ) ) {
        return constructor.map( f => Array.isArray( f ) ? 
          injectDependency( f ) : 
          construct( f ) );
      }
      return construct( constructor, dependency );
    }, null );
};

export const inject3LayerDependency = ( dependencyInfos: Record<string, any[]> ): ControllerWithBaseUrl[] => {
  return Object.entries( dependencyInfos ).map( ([ baseUrl, dependencyInfo ]) => {
    const controller = injectDependency( dependencyInfo );
    console.log( controller );
    return [ controller, baseUrl  ];
  });
};

export const routeWithControllers = ( router: Router, controllerWithBaseUrls: ControllerWithBaseUrl[]) => {
  controllerWithBaseUrls.forEach( ([ controller, baseUrl ]) => {
    Object.values( controller ).forEach( ( method: ProcessReq & { routeInfo: RouteInfo; }) => {
      if ( !method.routeInfo ) {
        return;
      }
      const { httpMethod, url, middlewares } = method.routeInfo;
      router[httpMethod]( `/${baseUrl}` + url, middlewares, respond( method ) );
    });
  });
};
