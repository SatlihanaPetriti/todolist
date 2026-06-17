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
const cache_manager_1 = require("@nestjs/cache-manager");
let TodolistService = class TodolistService {
    todoRepository;
    cacheManager;
    constructor(todoRepository, cacheManager) {
        this.todoRepository = todoRepository;
        this.cacheManager = cacheManager;
    }
    async getAllTasks() {
        try {
            const cachedTasks = await this.cacheManager.get('tasks');
            if (cachedTasks) {
                console.log('Data from Redis');
                console.log(cachedTasks);
                return cachedTasks;
            }
            console.log('Data from MySQL');
            const result = await this.todoRepository.find();
            await this.cacheManager.set('tasks', result, 300000);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('We could not found data', common_2.HttpStatus.NOT_FOUND);
        }
    }
    async getTaskById(id) {
        const cacheKey = `task:${id}`;
        const cachedTask = await this.cacheManager.get(cacheKey);
        if (cachedTask) {
            console.log(`Redis: hit ${cacheKey}`);
            return cachedTask;
        }
        console.log(`Redis: miss ${cacheKey}`);
        const task = await this.todoRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.HttpException(`Task with ID ${id} not found`, common_2.HttpStatus.NOT_FOUND);
        }
        await this.cacheManager.set(cacheKey, task, 60000);
        console.log(`Redis: ${cacheKey} cached`);
        return task;
    }
    async createTask(data) {
        try {
            const result = await this.todoRepository.save(data);
            await this.cacheManager.del('tasks');
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
                throw new common_1.HttpException(`Task with ID ${id} not found`, common_2.HttpStatus.NOT_FOUND);
            }
            await this.todoRepository.delete(id);
            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');
            return {
                status: 200,
                message: `Task with ID ${id} deleted successfully`,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Could not delete task with ID ${id}`, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTask(id, data) {
        const task = await this.todoRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.HttpException(`Task with ID ${id} not found`, common_2.HttpStatus.NOT_FOUND);
        }
        try {
            await this.todoRepository.update(id, data);
            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');
            return {
                status: 200,
                message: `Task with ID ${id} updated successfully`,
                result: { id, ...data },
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Could not update task with ID ${id}`, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TodolistService = TodolistService;
exports.TodolistService = TodolistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(todo_entity_1.TodoEntity)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object])
], TodolistService);
//# sourceMappingURL=todolist.service.js.map