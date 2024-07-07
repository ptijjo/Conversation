/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreatePostDto } from '@dtos/posts.dto';
import { HttpException } from '../exceptions/HttpException';
import { Post } from '../interfaces/posts.interface';
import { localDate } from '@/utils/localDate';

@Service()
export class PostService {
  public post = new PrismaClient().post;

  //Find all Post
  public async findAllPost(): Promise<Post[]> {
    const allUser: Post[] = await this.post.findMany();
    return allUser;
  }

  //Create new Post
  public async createPost(postData: CreatePostDto, userId: string): Promise<Post> {
    const created = localDate();
    const createPostData: Post = await this.post.create({
      data: { ...postData, created_at: created, authorId: userId },
    });
    return createPostData;
  }

  //Update Post
  public async updatePost(postId: string, postData: CreatePostDto, req: any): Promise<Post> {
    const findPost: Post = await this.post.findUnique({ where: { id: postId } });
    if (!findPost) throw new HttpException(409, "Post doesn't exist");
    if (findPost.id !== req.auth.userId || req.auth.userRole !== 'admin' || req.auth.userRole !== 'modo')
      throw new HttpException(401, 'Not authorized');

    const updatePostData = await this.post.update({ where: { id: postId }, data: { ...postData } });
    return updatePostData;
  }

  //Delete Post
  public async deleteUser(postId: string, req: any): Promise<Post> {
    const findPost: Post = await this.post.findUnique({ where: { id: postId } });
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    if (findPost.id !== req.auth.userId) throw new HttpException(401, 'Not authorized');

    if (req.auth.userRole === 'admin' || req.auth.userRole === 'modo') {
      const deleteUserData = await this.post.delete({ where: { id: postId } });
      return deleteUserData;
    }

    const deleteUserData = await this.post.delete({ where: { id: postId } });
    return deleteUserData;
  }
}
