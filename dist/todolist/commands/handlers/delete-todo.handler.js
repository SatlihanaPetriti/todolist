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
exports.DeleteTodoHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const cache_manager_1 = require("@nestjs/cache-manager");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("../../Entity/todo.entity");
const delete_todo_command_1 = require("../impl/delete-todo.command");
let DeleteTodoHandler = class DeleteTodoHandler {
    todoRepository;
    cacheManager;
    constructor(todoRepository, cacheManager) {
        this.todoRepository = todoRepository;
        this.cacheManager = cacheManager;
    }
    async execute(command) {
        const { id } = command;
        const task = await this.todoRepository.findOne({
            where: { id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        try {
            await this.todoRepository.delete(id);
            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');
            return {
                status: 200,
                message: `Task with ID ${id} deleted successfully`,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Could not delete task with ID ${id}`);
        }
    }
};
exports.DeleteTodoHandler = DeleteTodoHandler;
exports.DeleteTodoHandler = DeleteTodoHandler = __decorate([
    (0, cqrs_1.CommandHandler)(delete_todo_command_1.DeleteTodoCommand),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.TodoEntity)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], DeleteTodoHandler);
//# sourceMappingURL=delete-todo.handler.js.map