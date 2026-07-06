import { Controller, Get, Post, Param, Body, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateTodoCommand } from './commands/impl/create-todo.command';
import { GetAllTodosQuery } from './queries/impl/get-all-todos.query';
import { GetTodoByIdQuery } from './queries/impl/get-todo-by-id.query';
import { DeleteTodoCommand } from './commands/impl/delete-todo.command';
import { UpdateTodoCommand } from './commands/impl/update-todo.command';

@Controller('todolist')
export class TodolistController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus) { }

    @Get('all')
    public async getAllTodos() {
        return this.queryBus.execute(new GetAllTodosQuery());
    }

    @Get(':id')
    public async getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.queryBus.execute(
            new GetTodoByIdQuery(id),
        );
    }

    @Post('create')
    public async createTodo(@Body() bodyPara: CreateDto) {
        return this.commandBus.execute(
            new CreateTodoCommand(bodyPara),
        );
    }

    @Delete(':id')
    public async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(
            new DeleteTodoCommand(id),
        );
    }

    @Put(':id')
    public async updateTask(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDto) {
        return this.commandBus.execute(new UpdateTodoCommand(id, data));
    }

}
