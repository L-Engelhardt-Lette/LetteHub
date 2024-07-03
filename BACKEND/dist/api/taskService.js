"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = exports.createTask = void 0;
const baseUrl = "http://localhost:5000/api";
const createTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}/tasks/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Task creation failed");
    }
    return yield response.json();
});
exports.createTask = createTask;
const getTasks = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${baseUrl}/tasks/${project_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to retrieve tasks");
    }
    return yield response.json();
});
exports.getTasks = getTasks;
