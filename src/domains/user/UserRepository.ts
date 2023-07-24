import { Transaction, CreationAttributes } from 'sequelize';
import User from '../../entities/UserEntity';

export default class UserRepository {
  async createUser( user: CreationAttributes<User> ) {
    return await User.create( user );
  }
  
  async findByEmail( email: string, transaction?: Transaction ) {
    return await User.findOne({ where: { email }, transaction });
  }
}
