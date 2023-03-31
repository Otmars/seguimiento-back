import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const userFound = this.userService.findOne(createPostDto.autorId)
    if (!userFound) {
      return new HttpException('User no existe',HttpStatus.NOT_FOUND)
    }
    const newPost = this.postRepository.create(createPostDto)
    await this.postRepository.save(newPost)
    return newPost
  }

  findAll() {
    return this.postRepository.find({
      relations:['autor']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
