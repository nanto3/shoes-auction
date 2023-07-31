const isString = ( param: unknown ) => typeof param === 'string';
const isNumber = ( param: unknown ) => typeof param === 'number';
const isBoolean = ( param: unknown ) => typeof param === 'boolean';
const isArray = ( param: unknown ) => Array.isArray( param );
/**
 * @notice null, array도 false
 */
const isObject = ( param: unknown ) => {
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
