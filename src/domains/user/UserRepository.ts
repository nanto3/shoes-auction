import { Transaction, Attributes, CreationAttributes } from 'sequelize';
import User from '../../entities/UserEntity';

export default class UserRepository {
  async createUser( user: CreationAttributes<User> ) {
    return await User.create( user );
  }

  async findOneBy<T extends keyof Attributes<User>>( where: Record<T, unknown>, transaction?: Transaction ) {
    return await User.findOne({ where, transaction });
  }
}
