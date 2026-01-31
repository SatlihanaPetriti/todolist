import { Controller, Get, Post, Param, Body, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';

@Controller('todolist')
export class TodolistController {
    constructor(private readonly todoService: TodolistService) { }

    @Get('all')
    public async getAllTasks() {
        return await this.todoService.getAllTasks();
    }

    @Post('create')
    public async createTodo(@Body() bodyPara: CreateDto) {
        return this.todoService.createTask(bodyPara);
    }
    @Delete(':id')
    public async deleteTask(@Param('id') id: number) {
        return await this.todoService.deleteTask(id);
    }
    @Put(':id')
    public async updateTask(@Param('id', ParseIntPipe) id: number,
    @Body() updateCreateDto: { title?: string; description?: string }
    ) {
        return await this.todoService.updateTask(id, updateCreateDto);
    }
}
