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
exports.CreateTodoHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const create_todo_command_1 = require("../impl/create-todo.command");
const http_status_enum_1 = require("@nestjs/common/enums/http-status.enum");
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const todo_repository_interface_1 = require("../../repositories/todo.repository.interface");
let CreateTodoHandler = class CreateTodoHandler {
    todoRepository;
    cacheManager;
    constructor(todoRepository, cacheManager) {
        this.todoRepository = todoRepository;
        this.cacheManager = cacheManager;
    }
    async execute(command) {
        try {
            const { createDto } = command;
            const result = await this.todoRepository.create(createDto);
            await this.cacheManager.del('tasks');
            return result;
        }
        catch (error) {
            throw new http_exception_1.HttpException('We could not create a new task', http_status_enum_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CreateTodoHandler = CreateTodoHandler;
exports.CreateTodoHandler = CreateTodoHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_todo_command_1.CreateTodoCommand),
    __param(0, (0, common_1.Inject)(todo_repository_interface_1.TODO_REPOSITORY)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, Object])
], CreateTodoHandler);
//# sourceMappingURL=create-todo.handler.js.map