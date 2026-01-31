"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodolistService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const todo_entity_1 = require("./Entity/todo.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TodolistService = class TodolistService {
    todoRepository;
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async getAllTasks() {
        try {
            const result = await this.todoRepository.find();
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('We could not found date', common_2.HttpStatus.NOT_FOUND);
        }
    }
    async createTask(data) {
        try {
            const result = await this.todoRepository.save(data);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('We could not create a new task', common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTask(id) {
        try {
            const task = await this.todoRepository.findOne({ where: { id } });
            if (!task) {
                throw new common_1.HttpException(`Task with ID ${id} not found`, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.todoRepository.delete(id);
            return {
                status: 200,
                message: `Task with ID ${id} deleted successfully`,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Could not delete task with ID ${id}`, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTask(id, updateCreateDto) {
        try {
            const task = await this.todoRepository.findOne({ where: { id } });
            if (!task) {
                throw new common_1.HttpException(`Task with ID ${id} not found`, common_2.HttpStatus.NOT_FOUND);
            }
            await this.todoRepository.update(id, { title: updateCreateDto.title, description: updateCreateDto.description
            });
            return {
                status: 200,
                message: `Task with ID ${id} updated successfully`,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Could not delete task with ID ${id}`, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TodolistService = TodolistService;
exports.TodolistService = TodolistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(todo_entity_1.TodoEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TodolistService);
//# sourceMappingURL=todolist.service.js.map