"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.post('/create', taskController_1.createTask);
router.get('/project/:projectId', taskController_1.getTasksByProject);
exports.default = router;
