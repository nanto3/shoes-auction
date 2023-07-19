import bcrypt from 'bcryptjs';
import envConfig from '../configs/env.config';
import { EMAIL_REGEX } from "../constants/const";

export default class UserUtil {
  static isEmail( value ) {
    return EMAIL_REGEX.test( value );
  }

  static async hashPassword( password: string ) { 
    return await bcrypt.hash( password, await bcrypt.genSalt( +envConfig.passwordSalt ) );
  }

  static async validatePassword( password: string, dbPassword: string ) {
    return await bcrypt.compare( password, dbPassword );
  }
}
