import { Transaction, Attributes, CreationAttributes } from 'sequelize';
import User from '../../entities/UserEntity';

export default class UserRepository {
  async createUser( user: CreationAttributes<User>, transaction?: Transaction ) {
    return await User.create( user, { transaction });
  }

  async findOneBy<T extends keyof Attributes<User>>( where: Record<T, unknown>, transaction?: Transaction ) {
    return await User.findOne({ where, transaction });
  }
}
