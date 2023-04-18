
import { ConfigModule } from '@nestjs/config';
import { Post } from 'src/post/entities/post.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: '.env'
})
const options = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Post, Profile],
  synchronize: true,
  // autoLoadEntities: true
  migrations: [User],
  migrationsTableName: "custom_migration_table",
};

export const dataSource = new DataSource(
  options as DataSourceOptions,
);