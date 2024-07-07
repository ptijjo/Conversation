/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  public title: string;

  /*@IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(5000)
  public media?: string;*/
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  public title: string;

  /*@IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(5000)
  public media?: string;*/
}
