"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await models_1.User.deleteMany({});
        await models_1.Team.deleteMany({});
        await models_1.Activity.deleteMany({});
        await models_1.LeaderboardEntry.deleteMany({});
        await models_1.Workout.deleteMany({});
        await models_1.User.create([
            { name: 'Ava Patel', email: 'ava.patel@example.com', fitnessLevel: 'advanced' },
            { name: 'Noah Kim', email: 'noah.kim@example.com', fitnessLevel: 'intermediate' },
            { name: 'Mia Chen', email: 'mia.chen@example.com', fitnessLevel: 'beginner' },
        ]);
        await models_1.Team.create([
            { name: 'Momentum', focus: 'strength', members: ['Ava Patel', 'Noah Kim'] },
            { name: 'Endurance', focus: 'cardio', members: ['Mia Chen', 'Ava Patel'] },
        ]);
        await models_1.Activity.create([
            { userName: 'Ava Patel', type: 'run', durationMinutes: 35, calories: 420 },
            { userName: 'Noah Kim', type: 'cycle', durationMinutes: 50, calories: 380 },
            { userName: 'Mia Chen', type: 'yoga', durationMinutes: 30, calories: 180 },
        ]);
        await models_1.LeaderboardEntry.create([
            { userName: 'Ava Patel', totalPoints: 940, streak: 7 },
            { userName: 'Noah Kim', totalPoints: 810, streak: 5 },
            { userName: 'Mia Chen', totalPoints: 690, streak: 3 },
        ]);
        await models_1.Workout.create([
            { name: 'HIIT Circuit', category: 'strength', durationMinutes: 25, difficulty: 'intermediate', instructions: 'Perform 30 seconds of work with 15 seconds rest.' },
            { name: 'Morning Mobility', category: 'mobility', durationMinutes: 20, difficulty: 'beginner', instructions: 'Focus on slow controlled stretches.' },
            { name: 'Tempo Run', category: 'cardio', durationMinutes: 40, difficulty: 'advanced', instructions: 'Alternate faster and slower intervals.' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
