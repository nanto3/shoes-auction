const isString = ( param: unknown ): boolean => typeof param === 'string';
const isNumber = ( param: unknown ): boolean => typeof param === 'number';
const isBoolean = ( param: unknown ): boolean => typeof param === 'boolean';
const isArray = ( param: unknown ): boolean => Array.isArray( param );
/**
 * @notice null, array도 false
 */
const isObject = ( param: unknown ): boolean => {
  if ( typeof param !== 'object' ) {
    return false;
  }
  // filter null, array
  if ( !param || isArray( param ) ) {
    return false;
  }
  return true;
};

export const typeChecker = { 
  'string': isString,
  'boolean': isBoolean,
  'number': isNumber,
};
