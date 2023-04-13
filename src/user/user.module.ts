import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt';
import { Docente } from 'src/docente/entities/docente.entity';
import { DocenteModule } from 'src/docente/docente.module';
@Module({
  imports: [
    DocenteModule,
    TypeOrmModule.forFeature([User, Profile ,Docente]),
    PassportModule,
    JwtModule.register({
      secret: 'mi clave secreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
