import { ReturnHttpMethod } from "./http-method";

const injectDependencies = ( httpMethod: ReturnHttpMethod, dependencyInfo: Record<string, any[]> ) => {
  Object.entries( dependencyInfo ).forEach( ([ baseUrl, funcs ]) => {
    const [ controller, Service, ...repositoryAndElse ] = funcs;
    const initailized = repositoryAndElse.map( f => new f() );
    const service = new Service( ...initailized );
    controller( httpMethod.getMethod( `/${baseUrl}` ), service );
  });
};

export default injectDependencies;
