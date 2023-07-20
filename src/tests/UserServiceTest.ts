// import { describe, test, expect } from "@jest/globals";
// import UserService from "../domains/user/UserService";
// import ResException from "../models/ResException";
// import User from "../domains/user/User";

// describe( 'user-service', () => {
//   test( 'join', async () => {
//     const users = [];
//     const userRepository = {
//       createUser: ( user ) => {
//         const body = { ...user, id: 1 };
//         users.push( body );
//         return body;
//       },
//       findByEmail: ( email ) => users.find( anUser => anUser.email === email ),
//     };

//     const email = 'abc123@naver.com';
//     // const email = 'abc123naver.com';
//     const password = '1234';
//     const userService = new UserService( userRepository );
    
//     try {
//       expect( await userService.join( new User({ email, password }) ) )
//         .toEqual({ id: 1, email, password });
//     } catch ( error ) {
//       expect( error )
//         .toEqual( new ResException( 400, 'wrong email format' ) );
//     }
//   }); 
// });
