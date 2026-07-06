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
exports.UpdateTodoHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const cache_manager_1 = require("@nestjs/cache-manager");
const update_todo_command_1 = require("../impl/update-todo.command");
const todo_repository_interface_1 = require("../../repositories/todo.repository.interface");
let UpdateTodoHandler = class UpdateTodoHandler {
    todoRepository;
    cacheManager;
    constructor(todoRepository, cacheManager) {
        this.todoRepository = todoRepository;
        this.cacheManager = cacheManager;
    }
    async execute(command) {
        const { id, updateDto } = command;
        const task = await this.todoRepository.findById(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        try {
            const updated = await this.todoRepository.update(id, updateDto);
            await this.cacheManager.del(`task:${id}`);
            await this.cacheManager.del('tasks');
            return {
                status: 200,
                message: `Task with ID ${id} updated successfully`,
                result: updated,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Could not update task with ID ${id}`);
        }
    }
};
exports.UpdateTodoHandler = UpdateTodoHandler;
exports.UpdateTodoHandler = UpdateTodoHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_todo_command_1.UpdateTodoCommand),
    __param(0, (0, common_1.Inject)(todo_repository_interface_1.TODO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateTodoHandler);
//# sourceMappingURL=update-todo.handler.js.map