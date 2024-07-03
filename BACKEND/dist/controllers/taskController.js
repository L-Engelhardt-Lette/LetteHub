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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = exports.createTask = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task_name, project_id, description, persons, status, progress, startDate, finishDate, } = req.body;
    try {
        const [result] = yield dbConfig_1.default.execute("INSERT INTO tasks (task_name, project_id, description, persons, status, progress, startDate, finishDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
            task_name,
            project_id,
            description,
            JSON.stringify(persons),
            status,
            progress,
            startDate,
            finishDate,
        ]);
        res.status(201).json({ message: "Task created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Task creation failed" });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project_id } = req.params;
    try {
        const [rows] = yield dbConfig_1.default.execute("SELECT * FROM tasks WHERE project_id = ?", [project_id]);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve tasks" });
    }
});
exports.getTasks = getTasks;
