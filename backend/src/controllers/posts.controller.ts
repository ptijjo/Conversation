/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Post } from '@interfaces/posts.interface';
import { PostService } from '@services/posts.service';


export class PostController {
  public postService = Container.get(PostService);

  //find all user
  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPostsData: Post[] = await this.postService.findAllPost();

      res.status(200).json({ data: findAllPostsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  //update user
  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = String(req.params.id);
      const userData: Post = req.body;
      const updatePostData: Post = await this.postService.updatePost(postId, userData, req);

      res.status(200).json({ data: updatePostData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  //delete user
  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postId = String(req.params.id);
      const deletePostData: Post = await this.postService.deletePost(postId, req);

      res.status(200).json({ data: deletePostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
