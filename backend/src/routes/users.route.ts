import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { auth } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, auth, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, auth, this.userController.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.userController.createUser);
    this.router.post(`${this.path}-connection`, this.userController.connectUser);
    this.router.get(`${this.path}-who`, this.userController.getUserConnected);
    this.router.put(`${this.path}/:id`, auth, ValidationMiddleware(CreateUserDto, true), this.userController.updateUser);
    this.router.delete(`${this.path}/:id`, auth, this.userController.deleteUser);
  }
}
