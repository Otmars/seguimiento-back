
import { ConfigModule } from '@nestjs/config';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { AsignaturaToCompetencia } from 'src/asignatura/entities/asignaturaCompetencia.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Post } from 'src/post/entities/post.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { Roles } from 'src/user/entities/roles.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import {DataSourceOptions} from 'typeorm/data-source'
ConfigModule.forRoot({
  envFilePath: '.env'
})
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt( process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    User,
    Docente,
    Asignatura,
    Roles,
    Estudiante,
    Competencia,
    AsignaturaToCompetencia,
  ],
  synchronize: true,
  // autoLoadEntities: true
  // migrations: [User],
  // migrationsTableName: "custom_migration_table",
};

export const dataSource = new DataSource(dataSourceOptions);
export default dataSource