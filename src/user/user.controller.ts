import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from './guardjwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('user')
@ApiBearerAuth()

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/profile')
  findallprofile() {
    return this.userService.getProfiles();
  }

  
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto ){
    return this.userService.login(loginUserDto);
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id') id: string,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.userService.createProfile(id, createProfileDto);
  }
}
