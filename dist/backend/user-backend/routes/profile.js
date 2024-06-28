"use strict";
// src/routes/profile.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
router.get('/profile', auth_1.protect, function (req, res) {
    var userId = req.user; // Now TypeScript should recognize req.user as a string
    res.send("User profile for user ID ".concat(userId));
});
exports.default = router;
