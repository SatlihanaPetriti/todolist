import { Controller, Get, Post, Param, Body, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';

@Controller('todolist')
export class TodolistController {
    constructor(private readonly todoService: TodolistService) { }

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
        return this.todoService.createTask(bodyPara);
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
