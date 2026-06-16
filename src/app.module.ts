import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todolist/Entity/todo.entity';

import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Inna1998',
      database: 'todolist',
      entities: [TodoEntity],
      synchronize: true,
    }),

    CacheModule.register({
      isGlobal: true,
      stores: [
        new KeyvRedis('redis://localhost:6379'),
      ],
      ttl: 5000,
    }),

    TodolistModule,
  ],
})
export class AppModule { }