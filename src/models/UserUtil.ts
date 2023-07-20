import bcrypt from 'bcryptjs';
import envConfig from '../configs/envConfig';
import { EMAIL_REGEX } from "../constants/const";

export default class UserUtil {
  static isEmail( value: string ): boolean {
    return EMAIL_REGEX.test( value );
  }

  static async hashPassword( password: string ): Promise<string> { 
    return await bcrypt.hash( password, await bcrypt.genSalt( +envConfig.passwordSalt ) );
  }

  static async validatePassword( password: string, target: string ): Promise<boolean> {
    return await bcrypt.compare( password, target );
  }
}
