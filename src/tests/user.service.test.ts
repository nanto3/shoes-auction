import { describe, test, expect } from "@jest/globals";
import UserService from "../domains/user/user.service";
import ResException from "../models/ResException";

describe( 'user-service', () => {
  test( 'join', async () => {
    const User = [];
    const userRepository = {
      createUser: ( user ) => {
        const body = { ...user, id: User.length + 1 };
        User.push( body );
        return body;
      },
      findByEmail: ( email ) => User.find( anUser => anUser.email === email ),
    };

    const email = 'abc123@naver.com';
    // const email = 'abc123naver.com';
    const password = '1234';
    const userService = new UserService( userRepository );

    try {
      expect( await userService.join({ email, password }) )
        .toEqual({ email, password, id: 1 });
    } catch ( error ) {
      expect( error )
        .toEqual( new ResException( 400, 'wrong email format' ) );
    }
  }); 
});
