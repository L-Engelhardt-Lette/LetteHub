"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const router = (0, express_1.Router)();
router.post('/create', projectController_1.createProject);
router.get('/all', projectController_1.getAllProjects);
exports.default = router;
