import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './Entity/todo.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoHandler } from './commands/handlers/create-todo.handler';
import { GetTodoByIdHandler } from './queries/handlers/get-todo-by-id.handler';

const CommandHandlers = [
  CreateTodoHandler,
];

const QueryHandlers = [
  GetTodoByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [TodolistController],
  providers: [
    TodolistService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class TodolistModule { }