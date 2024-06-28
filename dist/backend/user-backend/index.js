"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var database_1 = __importDefault(require("./utils/database"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = parseInt(process.env.PORT, 10) || 5000;
app.use(express_1.default.json());
// Test DB connection
database_1.default.authenticate()
    .then(function () { return console.log('MySQL connected'); })
    .catch(function (err) { return console.error('Unable to connect to the database:', err); });
// Sync DB models
database_1.default.sync({ alter: true });
app.use('/api/users', userRoutes_1.default);
app.get('/', function (req, res) {
    res.send('API is running...');
});
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
