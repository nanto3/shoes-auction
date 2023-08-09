import { type Router } from "express";
import getHttpMethod from "./http-method";

const injectDependencies = ( router: Router, dependencyInfo: Record<string, any[]> ) => {
  Object.entries( dependencyInfo ).forEach( ([ k, v ]) => {
    const [ controller, Service, ...repositoryAndElse ] = v;
    const initailized = repositoryAndElse.map( f => new f() );
    const service = new Service( ...initailized );
    controller( getHttpMethod( router, `/${k}` ), service );
  });
};

export default injectDependencies;
