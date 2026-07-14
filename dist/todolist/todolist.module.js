"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodolistModule = void 0;
const common_1 = require("@nestjs/common");
const todolist_controller_1 = require("./todolist.controller");
const typeorm_1 = require("@nestjs/typeorm");
const todo_entity_1 = require("./Entity/todo.entity");
const cqrs_1 = require("@nestjs/cqrs");
const todo_repository_1 = require("./repositories/todo.repository");
const todo_repository_interface_1 = require("./repositories/todo.repository.interface");
const create_todo_handler_1 = require("./commands/handlers/create-todo.handler");
const get_todo_by_id_handler_1 = require("./queries/handlers/get-todo-by-id.handler");
const update_todo_handler_1 = require("./commands/handlers/update-todo.handler");
const delete_todo_handler_1 = require("./commands/handlers/delete-todo.handler");
const get_all_todos_handler_1 = require("./queries/handlers/get-all-todos.handler");
const todo_resolver_1 = require("./todo.resolver");
const CommandHandlers = [
    create_todo_handler_1.CreateTodoHandler,
    delete_todo_handler_1.DeleteTodoHandler,
    update_todo_handler_1.UpdateTodoHandler,
];
const QueryHandlers = [
    get_todo_by_id_handler_1.GetTodoByIdHandler,
    get_all_todos_handler_1.GetAllTodosHandler,
];
let TodolistModule = class TodolistModule {
};
exports.TodolistModule = TodolistModule;
exports.TodolistModule = TodolistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forFeature([todo_entity_1.TodoEntity]),
        ],
        controllers: [todolist_controller_1.TodolistController],
        providers: [
            ...CommandHandlers,
            ...QueryHandlers,
            {
                provide: todo_repository_interface_1.TODO_REPOSITORY,
                useClass: todo_repository_1.TodoRepository,
            },
            todo_resolver_1.TodoResolver,
        ],
    })
], TodolistModule);
//# sourceMappingURL=todolist.module.js.map