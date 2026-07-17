"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, default: 'intermediate' },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'users' });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    focus: { type: String, default: 'fitness' },
    members: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
}, { collection: 'teams' });
const activitySchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'activities' });
const leaderboardSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    totalPoints: { type: Number, default: 0 },
    streak: { type: Number, default: 1 },
    updatedAt: { type: Date, default: Date.now },
}, { collection: 'leaderboard' });
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, default: 'beginner' },
    instructions: { type: String, default: 'Stay consistent and hydrate.' },
}, { collection: 'workouts' });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
