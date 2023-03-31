
import { Post } from 'src/post/entities/post.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const usuario = process.env.DATABASE_USER

export const AppDataSource:DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: usuario,
  password: '',
  database: 'api-login',
  entities: [User, Post, Profile],
  synchronize: true,
  // autoLoadEntities: true
  migrations: [User],
  migrationsTableName: "custom_migration_table",
};

export default DataSource;