import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { EXPIRED_TOKEN, SECRET_KEY } from '@/config';
import jsonwebtoken from 'jsonwebtoken';

export class UserController {
  public userService = Container.get(UserService);

  //find all user
  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  //find user by id
  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  //create new user
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  //connect user
  public connectUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;
      const connectUser: User = await this.userService.connectUser(userData);

      //Creation du token d'authentification

      const token = jsonwebtoken.sign(
        {
          userId: connectUser.id,
          userEmail: connectUser.email,
          userPseudo: connectUser.pseudo,
          userRole: connectUser.role,
          userPhoto: connectUser.photo_profil,
        },
        SECRET_KEY as string,
        { expiresIn: EXPIRED_TOKEN as string },
      );

      res.status(200).json({ data: connectUser, token: token, message: 'connected' });
    } catch (error) {
      next(error);
    }
  };

  //who is connected
  public getUserConnected = (req: any, res: Response) => {
    const auth = req.headers.authorization.split(' ')[1];
    const userConnected = jsonwebtoken.verify(auth, SECRET_KEY as string) as {
      userId: string;
      userEmail: string;
      userRole: string;
      userPseudo: string;
      userPhoto: string;
    };

    res.status(200).json({ userConnected });
  };

  //update user
  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData, req);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  //delete user
  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId, req);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
