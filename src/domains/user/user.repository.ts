import { Transaction } from 'sequelize';
import { User } from "../../entities";

interface UserBody {
  email: string;
  password: string;
}

export default class UserRepository {
  async createUser ( user: UserBody ) {
    return await User.create( user );
  }
  
  async findByEmail ( email: string, transaction?: Transaction ) {
    return await User.findOne({ where: { email }, transaction });
  }
}
