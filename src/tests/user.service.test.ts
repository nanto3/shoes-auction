import { describe, it, test, expect } from "@jest/globals";
import UserService from "../domains/user/user.service";
import ResException, { excptIfTruthy, excptIfFalsy } from "../utils/ResException";

describe( 'user-service', () => {
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

  describe( 'join', () => {
    const email = 'abc123@test.com';
    const password = '1234';

    it( 'returns user with id', async () => {
      const userService = new UserService( UserRepository() );

      const user = await userService.join( email, password );
    
      expect( user ).toEqual({ id: 1, email, password });
    });

    it( 'throws error - already registered email', async () => {
      const userService = new UserService( UserRepository() );

      expect.assertions( 1 );
      
      try {
        await userService.join( email, password );
        await userService.join( email, password );
      } catch ( error ) {
        expect( error.message ).toMatch( 'already registered email' );
      }
    });
  });

  // describe( 'login', () => {
  //   it( 'returns two jwt with userUuid', () => {
      
  //   });
  // });
});
