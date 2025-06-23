"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./api/auth.routes"));
const cart_routes_1 = __importDefault(require("./api/cart.routes"));
const catalog_routes_1 = __importDefault(require("./api/catalog.routes"));
const contact_routes_1 = __importDefault(require("./api/contact.routes"));
const search_routes_1 = __importDefault(require("./api/search.routes"));
const user_routes_1 = __importDefault(require("./api/user.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas principales de la API
app.use("/api/auth", auth_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/catalog", catalog_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
app.use("/api/search", search_routes_1.default);
app.use("/api", user_routes_1.default);
// Ruta de prueba
app.get("/", (_req, res) => {
    res.json({ message: "API de Plena Studio funcionando" });
});
exports.default = app;
