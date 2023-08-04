import { describe, it, test, expect } from "@jest/globals";
import UserService from "../domains/user/user.service";
import ResException, { excptIfTruthy, excptIfFalsy } from "../utils/ResException";

describe( 'user-service', () => {

  describe( 'join', () => {
    const UserRepository = () => {
      const users = [];
      return {
        createUser: ( user ) => {
          const body = { ...user, id: users.length + 1 };
          users.push( body );
          return body;
        },
        findOneBy: ({ email }: any ) => users.find( anUser => anUser.email === email ),
      };
    };
    
    const email = 'abc123@test.com';
    const password = '1234';

    it( 'throws error - already registered email', async () => {
      const userService = new UserService( UserRepository() );

      try {
        await userService.join( email, password );
        await userService.join( email, password );

      } catch ( error ) {
        expect( error.message ).toMatch( 'already registered' );
      }
    });

    it( 'returns user with id', async () => {
      const userService = new UserService( UserRepository() );

      const user = await userService.join( email, password );
    
      expect( user ).toEqual({ id: 1, email, password });
    });
  });

  describe( 'login', () => {
    const UserRepository = () => {
      const users = [ { 
        id: 1, 
        email: 'abc@test.com', 
        password: '1234', 
        validatePassword: ( _password ) => '1234' === _password, 
      } ];
      return {
        createUser: ( () => ({}) ) as any,
        findOneBy: ({ email }: any ): any => users.find( user => user.email === email ), 
      };
    };

    it( 'throws error - not registered user', async () => {
      const email = 'abc123@test.com';
      const password = '1234';
      const userService = new UserService( UserRepository() );
      
      try {
        await userService.login( email, password );

      } catch ( error ) {
        expect( error.message ).toMatch( 'not registered' );
      }
    });

    it( 'throws error - wrong password', async () => {
      const userService = new UserService( UserRepository() );
      
      try {
        await userService.login( 'abc@test.com', '1111' );

      } catch ( error ) {
        expect( error.message ).toMatch( 'wrong password' );
      }
    });
  });
});
