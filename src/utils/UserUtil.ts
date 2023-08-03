import bcrypt from 'bcrypt';
import envConfig from '../configs/env.config';
import { EMAIL_REGEX } from "../constants/const";

/**
 * @description 현재 사용 안 하는 중. 해당 메소드들 user.entity로 옮김
 */
export default class UserUtil {
  static async hashPassword( password: string ): Promise<string> { 
    const salt = await bcrypt.genSalt( +envConfig.passwordSalt );
    return await bcrypt.hash( password, salt );
  }

  static async isCorrectPassword( password: string, hashedPassword: string ): Promise<boolean> {
    return await bcrypt.compare( password, hashedPassword );
  }
}
