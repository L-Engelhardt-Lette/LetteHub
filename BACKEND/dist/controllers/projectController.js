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
exports.getProjects = exports.createProject = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, startdate, enddate, personworkinon, description } = req.body;
    try {
        const [result] = yield dbConfig_1.default.execute("INSERT INTO projects (title, startdate, enddate, personworkinon, description) VALUES (?, ?, ?, ?, ?)", [title, startdate, enddate, JSON.stringify(personworkinon), description]);
        res.status(201).json({ message: "Project created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Project creation failed" });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield dbConfig_1.default.execute("SELECT * FROM projects");
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve projects" });
    }
});
exports.getProjects = getProjects;
