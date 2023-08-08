import { Transaction, Attributes, CreationAttributes } from 'sequelize';
import User from '../../entities/user.entity';
import ErrorException from '../../utils/error-exception';

export default class UserRepository {
  async createUser( user: CreationAttributes<User>, transaction?: Transaction ) {
    try {
      return await User.create( user, { transaction });
    } catch ( error ) {
      // TODO: validation 에러 처리 더 생각해 보기
      throw (
        error.errors && error.errors[0]?.type === 'Validation error' ? 
          new ErrorException( 400, 'validation error', error ) : 
          new ErrorException( 500, error ) 
      );
    }
  }

  async findOneBy<T extends keyof Attributes<User>>( where: Record<T, User[T]>, transaction?: Transaction ) {
    return await User.findOne({ where, transaction });
  }
}
