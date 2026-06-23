import { Controller, Get, Post, Param, Body, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';
import { CommandBus } from "@nestjs/cqrs";
import { CreateTodoCommand } from './commands/impl/create-todo.command';

@Controller('todolist')
export class TodolistController {
    constructor(private readonly todoService: TodolistService,
        private readonly commandBus: CommandBus) { }

    @Get('all')
    public async getAllTasks() {
        return this.todoService.getAllTasks();
    }

    @Get(':id')
    public async getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.getTaskById(id);
    }

    @Post('create')
    public async createTodo(@Body() bodyPara: CreateDto) {
        return this.commandBus.execute(
            new CreateTodoCommand(bodyPara),
        );
    }
    
    @Delete(':id')
    public async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.deleteTask(id);
    }

    @Put(':id')
    public async updateTask(@Param('id', ParseIntPipe) id: number, @Body() data: CreateDto) {
        return this.todoService.updateTask(id, data);
    }

}
