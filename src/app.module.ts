import { Module } from '@nestjs/common';
import { TodolistModule } from './todolist/todolist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from "./todolist/Entity/todo.entity";

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
    })
    , TodolistModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
