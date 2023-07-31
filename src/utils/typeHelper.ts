export const isString = ( param ) => typeof param === 'string';
export const isNumber = ( param ) => typeof param === 'number';
export const isBoolean = ( param ) => typeof param === 'boolean';
export const isFunction = ( param ) => typeof param === 'function';
export const isArray = ( param ) => Array.isArray( param );

/**
 * @notice null, array도 false
 */
export const isObject = ( param ) => {
  if ( typeof param !== 'object' ) {
    return false;
  }
  // filter null, array
  if ( !param || isArray( param ) ) {
    return false;
  }
  return true;
};

export const keys = ( object: Record<string, any> ) => Object.keys( object );
export const entries = ( object: Record<string, any> ) => Object.entries( object );
export const values = ( object: Record<string, any> ) => Object.values( object );

export const assign = ( a: Record<string, any>, b: Record<string, any> ) => Object.assign( a, b );
export const concat = ( a: any[], b: any[]) => a.concat( b );

export const isEmptyArray = ( param: any[]) => param.length === 0;
export const isEmptyObject = ( param: Record<string, any> ) => keys( param ).length === 0; 

export const deepCopy = ( param ) => {
  if ( !isObject( param ) && !isArray( param ) ) {
    return param;
  }

  // param: object | array
  return isObject( param ) ? 
    entries( param )
      .map( ([ key, value ]) => ({ [key]: deepCopy( value ) }) )
      .reduce( assign ) :
    param
      .map( elem => [ deepCopy( elem ) ])
      .reduce( concat )
  ;
};

/**
 * @returns 새로 생성된 객체
 */
export const deepAssign = ( passive: Record<string, any>, active: Record<string, any> ): Record<string, any> => {
  const hasObject = values( active ).some( ( value ) => isObject( value ) );
  if ( !hasObject ){
    return assign( deepCopy( passive ), active );
  }

  return keys( active )
    .map( key => ({ [key]: deepAssign( passive[key], active[key]) }) )
    .reduce( assign, deepCopy( passive ) );
};
