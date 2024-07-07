import { Router } from 'express';
import { PostController } from '@controllers/posts.controller';
import { CreatePostDto } from '@dtos/posts.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { auth } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, auth, this.postController.getPosts);
    this.router.put(`${this.path}/:id`, auth, ValidationMiddleware(CreatePostDto, true), this.postController.updatePost);
    this.router.delete(`${this.path}/:id`, auth, this.postController.deletePost);
  }
}
