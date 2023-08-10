import respond from "./responder";

type MethodType =  'get' | 'post' | 'patch' | 'put' | 'delete';

const httpMethodFormat = ( methodType: MethodType ) => 
  ( url, ...middlewares ) => ( callback ) => {
    callback.httpMethod = methodType;
    callback.url = url;
    callback.middlewares = middlewares;

    return callback;
  };

export const Get = httpMethodFormat( 'get' );
export const Post = httpMethodFormat( 'post' );
export const Patch = httpMethodFormat( 'patch' );
export const Put = httpMethodFormat( 'put' );
export const Delete = httpMethodFormat( 'delete' );


export const injectDependency = ( dependencyInfo: Record<string, any[]> ) => {
  return Object.entries( dependencyInfo ).map( ([ baseUrl, funcs ]) => {
    const [ Controller, Service, ...repositoryAndElse ] = funcs;
    const initailized = repositoryAndElse.map( f => new f() );
    const service = new Service( ...initailized );
    return [ baseUrl, new Controller( service ) ];
  });
};

export const matchRouteWithControllers = ( router, controllers ) => {
  controllers.forEach( ([ baseUrl, controller ]) => {
    Object.values( controller ).forEach( ( method: any ) => {
      if ( !method.httpMethod ) {
        return;
      }
      const { httpMethod, url, middlewares } = method;
      delete method.httpMethod;
      delete method.url;
      delete method.middlewares;

      router[httpMethod]( `/${baseUrl}` + url, middlewares, respond( method ) );
    });
  });
};
