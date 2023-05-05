import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { Docente } from 'src/docente/entities/docente.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Roles } from './entities/roles.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Docente) private docenteRepository: Repository<Docente>,
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    private jwtService: JwtService, // @InjectRepository(Docente) private docenteRepository: Repository<Docente>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { fnacimiento } = createUserDto;
    const datofecha = fnacimiento.split('-');

    const nuevapassword =
      datofecha[2] + '-' + datofecha[1] + '-' + datofecha[0];
    // console.log(nuevapassword);

    const passCryps = await hash(nuevapassword, 10);
    createUserDto = { ...createUserDto, password: passCryps };

    const { nombres } = createUserDto;
    const primernombre = nombres.split(' ');
    const { ci } = createUserDto;
    const { rol } = createUserDto;
    createUserDto = { ...createUserDto, username: primernombre[0] + '_' + ci };
    const userFound = await this.userRepository.findOne({
      where: {
        username: primernombre[0] + '_' + ci,
      },
    });
    if (userFound) {
      return new HttpException('Usuario ya existe', HttpStatus.CONFLICT); //throw en lugar del return
    }

    const newUser = await this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(newUser);
    // this.docenteRepository.save({user: newUser.id})
    const datosEstudiante = {
      ru: createUserDto.ru,
      iduser: savedUser.id,
    };
    const id = { iduser: savedUser.id };

    // if (roles.toString() == 'docente') {
    // }

    // console.log(JSON.stringify(savedUser.rol) == "1");

    if (JSON.stringify(savedUser.rol) == '1') {
      console.log('entra');

      this.docenteRepository.save(id);
    }
    if (JSON.stringify(savedUser.rol) == '3') {
      this.estudianteRepository.save(datosEstudiante);
    }
    // }
    // if (savedUser.rol.nombreRol == "estudiante") {
    //   this.estudianteRepository.save(id)
    //   console.log("entro");

    // }
    // this.docenteRepository.create(id)
    // this.docenteRepository.save(id)
    return savedUser;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['rol'],
    });
  }

  async findOne(id: string) {
    const userFound = await this.userRepository.find({
      // select: { username: true },
      where: { id },
      relations: ['rol'],
    });
    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    // return this.userRepository.update({id},updateUserDto)
    const updateUser = Object.assign(userFound, updateUserDto);
    return this.userRepository.save(updateUser);
  }

  async remove(id: string) {
    // const userFound =  await this.userRepository.findOne({
    //   where :{id}
    // })
    // if (!userFound) {
    //   return new HttpException('Usuario no existe',HttpStatus.NOT_FOUND)
    // }
    // return this.userRepository.delete({id})
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    return { result, resultado: 'Usuario Eliminado' };
  }
  async createProfile(id: string, createProfileDto: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // const newProfile = this.profileRepository.create(createProfileDto);
    // const savedProfile = await this.profileRepository.save(newProfile);
    // userFound.profile = savedProfile;

    return this.userRepository.save(userFound);
  }
  async getProfiles() {
    return await this.profileRepository.find({
      relations: ['user'],
    });
  }
  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    // console.log(username);

    const finduser = await this.userRepository.findOne({
      where: { username },
      relations: ['rol'],
    });
    // console.log(finduser);

    if (!finduser) {
      return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    const checkpass = await compare(password, finduser.password);
    if (!checkpass) {
      return new HttpException('Contraseña incorrecta', HttpStatus.FORBIDDEN);
    }

    const token = await this.jwtService.sign({
      id: finduser.id,
      username: finduser.username,
      rol: finduser.rol.nombreRol,
      nombres: finduser.nombres,
      apellidoPaterno: finduser.apellidoPaterno,
      apellidoMaterno: finduser.apellidoMaterno,
      email: finduser.email,
      telefono: finduser.telefono,
      direccion: finduser.direccion,
      ci: finduser.ci,
      fnacimiento: finduser.fnacimiento,
    });
    const data = {
      //user: finduser,
      token,
    };

    return data;
  }
}
