import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './Entity/todo.entity';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateTodoHandler } from './commands/handlers/create-todo.handler';

const CommandHandlers = [
  CreateTodoHandler,
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
  ],
})
export class TodolistModule { }