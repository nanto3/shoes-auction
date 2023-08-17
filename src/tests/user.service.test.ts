import { describe, it, test, expect } from "@jest/globals";
import { UserService } from "../domains/user/user.service";

describe( 'user-service', () => {

  const UserRepository = () => {
    const users = [];
    return {
      createUser: ( user ) => {
        const body = { ...user, id: users.length + 1 };
        users.push( body );
        return body;
      },
      saveUser: ( user ) => {return user;},
      findOneBy: ({ email }: any ) => users.find( anUser => anUser.email === email ),
    };
  };

  describe( 'join', () => {
    const email = 'abc123@test.com';
    const password = '1234';
    const birthday = '19920521';

    let userService;

    beforeEach( () => {
      userService = new UserService( UserRepository(), {} as any, {} as any );
    });
  
    it( 'throws error - already registered email', async () => {
      try {
        await userService.join({ email, password, birthday });
        await userService.join({ email, password, birthday });
  
      } catch ( error ) {
        expect( error.message ).toMatch( 'already registered' );
      }
    });
    
    it( 'returns user with hashed password', async () => {
      const user = await userService.join({ email, password, birthday });
      
      expect( await user.validatePassword( password ) ).toEqual( true );
    });
  });
  
  describe( 'login', () => {
    const firstUserMail = 'abc@test.com';
    const firstUserPassword = '1234';

    const UserRepository = () => {
      const users = [ { 
        id: 1, 
        email: firstUserMail, 
        password: firstUserPassword, 
        validatePassword: ( _password ) => users[0].password === _password, 
      } ];
      return {
        createUser: ( user ) => ({}) as any,
        saveUser: ( user ) => ({}) as any,
        findOneBy: ({ email }: any ) => users.find( anUser => anUser.email === email ) as any,
      };
    };
  
    it( 'throws error - not registered user', async () => {
      const email =  'a' + firstUserMail;
      const password = firstUserPassword;
      const userService = new UserService( UserRepository(), {} as any, {} as any );
        
      try {
        await userService.login( email, password );
  
      } catch ( error ) {
        expect( error.message ).toMatch( 'not registered' );
      }
    });
  
    it( 'throws error - wrong password', async () => {
      const email = firstUserMail;
      const password = 'a' + firstUserPassword;
      const userService = new UserService( UserRepository(), {} as any, {} as any );
        
      try {
        await userService.login( email, password );
  
      } catch ( error ) {
        expect( error.message ).toMatch( 'wrong password' );
      }
    });
  });
});
