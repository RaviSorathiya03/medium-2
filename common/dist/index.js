"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdates = exports.blogInputs = exports.signinInputs = exports.signupInputs = void 0;
const zod_1 = require("zod");
exports.signupInputs = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
exports.signinInputs = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.blogInputs = zod_1.z.object({
    title: zod_1.z.string().min(3),
    content: zod_1.z.string().min(50)
});
exports.blogUpdates = zod_1.z.object({
    title: zod_1.z.string().min(3),
    content: zod_1.z.string().min(50),
    id: zod_1.z.number()
});
