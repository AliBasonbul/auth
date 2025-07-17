import prisma from '../prisma/client';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { AppError } from '../middlewares/error.middleware';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  type?: 'USER' | 'ADMIN';
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  async register(data: RegisterData) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new AppError('Email already exists', 409);

    const hashed = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashed,
        type: data.type || 'USER',
      },
    });

    const { password, ...userWithoutPass } = user;
    return userWithoutPass;
  }

  async login(data: LoginData) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await comparePassword(data.password, user.password))) {
      throw new AppError('Wrong information', 401);
    }

    const token = generateToken({ id: user.id, email: user.email, type: user.type });
    return { token };
  }
}
