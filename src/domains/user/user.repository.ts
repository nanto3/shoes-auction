import { Transaction } from 'sequelize';
import { User } from "../../entities";

interface UserBody {
  email: string;
  password: string;
}
export const createUser = async ( user: UserBody ) => await User.create( user );

export const findByEmail = async ( email: string, transaction?: Transaction ) => await User.findOne({ where: { email }, transaction });
