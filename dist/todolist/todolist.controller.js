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
exports.TodolistController = void 0;
const common_1 = require("@nestjs/common");
const todolist_service_1 = require("./todolist.service");
const create_dto_1 = require("./dto/create.dto");
const cqrs_1 = require("@nestjs/cqrs");
const create_todo_command_1 = require("./commands/impl/create-todo.command");
const get_all_todos_query_1 = require("./queries/impl/get-all-todos.query");
const get_todo_by_id_query_1 = require("./queries/impl/get-todo-by-id.query");
const delete_todo_command_1 = require("./commands/impl/delete-todo.command");
const update_todo_command_1 = require("./commands/impl/update-todo.command");
let TodolistController = class TodolistController {
    todoService;
    commandBus;
    queryBus;
    constructor(todoService, commandBus, queryBus) {
        this.todoService = todoService;
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async getAllTodos() {
        return this.queryBus.execute(new get_all_todos_query_1.GetAllTodosQuery());
    }
    async getTaskById(id) {
        return this.queryBus.execute(new get_todo_by_id_query_1.GetTodoByIdQuery(id));
    }
    async createTodo(bodyPara) {
        return this.commandBus.execute(new create_todo_command_1.CreateTodoCommand(bodyPara));
    }
    async deleteTask(id) {
        return this.commandBus.execute(new delete_todo_command_1.DeleteTodoCommand(id));
    }
    async updateTask(id, data) {
        return this.commandBus.execute(new update_todo_command_1.UpdateTodoCommand(id, data));
    }
};
exports.TodolistController = TodolistController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodolistController.prototype, "getAllTodos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodolistController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDto]),
    __metadata("design:returntype", Promise)
], TodolistController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodolistController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_dto_1.CreateDto]),
    __metadata("design:returntype", Promise)
], TodolistController.prototype, "updateTask", null);
exports.TodolistController = TodolistController = __decorate([
    (0, common_1.Controller)('todolist'),
    __metadata("design:paramtypes", [todolist_service_1.TodolistService,
        cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], TodolistController);
//# sourceMappingURL=todolist.controller.js.map