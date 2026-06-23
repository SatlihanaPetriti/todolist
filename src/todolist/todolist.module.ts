import { Module } from '@nestjs/common';
import { TodolistController } from './todolist.controller';
import { TodolistService } from './todolist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './Entity/todo.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoHandler } from './commands/handlers/create-todo.handler';
import { GetTodoByIdHandler } from './queries/handlers/get-todo-by-id.handler';
import { UpdateTodoHandler } from './commands/handlers/update-todo.handler';
import { DeleteTodoHandler } from './commands/handlers/delete-todo.handler';
import { GetAllTodosHandler } from './queries/handlers/get-all-todos.handler';

const CommandHandlers = [
  CreateTodoHandler,
  DeleteTodoHandler,
  UpdateTodoHandler,
];

const QueryHandlers = [
  GetTodoByIdHandler,
  GetAllTodosHandler,

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