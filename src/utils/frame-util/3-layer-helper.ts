import { Request, Response, NextFunction, Router } from "express";
import respond, { ProcessReq } from "./responder";

type HttpMethod =  'get' | 'post' | 'patch' | 'put' | 'delete';

type Middleware = ( req: Request, res: Response, next: NextFunction ) => void | Promise<void>;

type ControllerWithBaseUrl = [object, string];

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
        middlewares,
      },
    });
    return controllerMethod;
  };

export const Get = routeInfoSetterFormat( 'get' );
export const Post = routeInfoSetterFormat( 'post' );
export const Patch = routeInfoSetterFormat( 'patch' );
export const Put = routeInfoSetterFormat( 'put' );
export const Delete = routeInfoSetterFormat( 'delete' );

export const injectDependency = ( dependencyInfo: Record<string, any[]> ): ControllerWithBaseUrl[] => {
  return Object.entries( dependencyInfo ).map( ([ baseUrl, info ]) => {
    const [ Controller, Service, repositoryAndElse ] = info;
    const initailized = ( Array.isArray( repositoryAndElse ) ? 
      repositoryAndElse : 
      [ repositoryAndElse ]).map( f => {
      return typeof f === 'function' ? new f() : f;
    });
    const service = new Service( ...initailized );
    return [ new Controller( service ), baseUrl  ];
  });
};

export const routeWithControllers = ( router: Router, controllers: ControllerWithBaseUrl[]) => {
  controllers.forEach( ([ controller, baseUrl ]) => {
    Object.values( controller ).forEach( ( method: ProcessReq & { routeInfo: RouteInfo; }) => {
      if ( !method.routeInfo ) {
        return;
      }
      const { httpMethod, url, middlewares } = method.routeInfo;
      router[httpMethod]( `/${baseUrl}` + url, middlewares, respond( method ) );
    });
  });
};
