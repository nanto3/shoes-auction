import bcrypt from 'bcryptjs';
import envConfig from '../configs/env.config';

const { passwordSalt } = envConfig;

export const hashPassword = async ( password: string ) => await bcrypt.hash( password, await bcrypt.genSalt( +passwordSalt ) );

export const validatePassword = async ( password: string, dbPassword: string ) => await bcrypt.compare( password, dbPassword );

