import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import { localDate } from '@/utils/localDate';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  //Find all User
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.user.findMany();
    return allUser;
  }

  //Find user buy Id
  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  //Create new user
  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const findPseudoUser: User = await this.user.findUnique({ where: { pseudo: userData.pseudo } });
    if (findPseudoUser) throw new HttpException(409, `This psseudo ${userData.pseudo} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const avatar = 'https://vibz.s3.eu-central-1.amazonaws.com/logo/photoProfil.png';
    const created = localDate();
    const createUserData: User = await this.user.create({
      data: { ...userData, password: hashedPassword, photo_profil: avatar, created_at: created },
    });
    return createUserData;
  }

  //Connect user
  public async connectUser(userData: { email: string; password: string }): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} doesn't exists`);

    const findPassword = await bcrypt.compare(userData.password, findUser.password);
    if (!findPassword) throw new HttpException(409, `This password ${userData.password} is wrong`);

    const date = localDate();

    const updateConnection = await this.user.update({
      where: {
        email: findUser.email,
      },
      data: {
        last_connection: date,
      },
    });

    return updateConnection;
  }

  public async updateUser(userId: string, userData: CreateUserDto, req: any): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    if (findUser.id !== req.auth.userId || req.auth.userRole !== 'admin' || req.auth.userRole !== 'modo')
      throw new HttpException(401, 'Not authorized');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserData = await this.user.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
    return updateUserData;
  }

  public async deleteUser(userId: string, req: any): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    if (findUser.id !== req.auth.userId) throw new HttpException(401, 'Not authorized');

    if (req.auth.userRole === 'admin' || req.auth.userRole === 'modo') {
      const deleteUserData = await this.user.delete({ where: { id: userId } });
      return deleteUserData;
    }

    const deleteUserData = await this.user.delete({ where: { id: userId } });
    return deleteUserData;
  }
}
