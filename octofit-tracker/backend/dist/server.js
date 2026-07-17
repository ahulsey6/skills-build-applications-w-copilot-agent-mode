"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const getApiBaseUrl = () => codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${port}`;
app.use(express_1.default.json());
const seedData = async () => {
    const userCount = await models_1.User.countDocuments();
    if (userCount === 0) {
        await models_1.User.create([
            { name: 'Ava', email: 'ava@example.com', fitnessLevel: 'advanced' },
            { name: 'Noah', email: 'noah@example.com', fitnessLevel: 'intermediate' },
        ]);
    }
    const teamCount = await models_1.Team.countDocuments();
    if (teamCount === 0) {
        await models_1.Team.create([
            { name: 'Momentum', focus: 'strength', members: ['Ava', 'Noah'] },
            { name: 'Endurance', focus: 'cardio', members: ['Ava'] },
        ]);
    }
    const activityCount = await models_1.Activity.countDocuments();
    if (activityCount === 0) {
        await models_1.Activity.create([
            { userName: 'Ava', type: 'run', durationMinutes: 35, calories: 420 },
            { userName: 'Noah', type: 'cycle', durationMinutes: 50, calories: 380 },
        ]);
    }
    const leaderboardCount = await models_1.LeaderboardEntry.countDocuments();
    if (leaderboardCount === 0) {
        await models_1.LeaderboardEntry.create([
            { userName: 'Ava', totalPoints: 940, streak: 7 },
            { userName: 'Noah', totalPoints: 810, streak: 5 },
        ]);
    }
    const workoutCount = await models_1.Workout.countDocuments();
    if (workoutCount === 0) {
        await models_1.Workout.create([
            { name: 'HIIT Circuit', category: 'strength', durationMinutes: 25, difficulty: 'intermediate' },
            { name: 'Morning Mobility', category: 'mobility', durationMinutes: 20, difficulty: 'beginner' },
        ]);
    }
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiUrl: getApiBaseUrl() });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json({ apiUrl: getApiBaseUrl(), users });
});
app.post('/api/users/', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), user });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().lean();
    res.json({ apiUrl: getApiBaseUrl(), teams });
});
app.post('/api/teams/', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), team });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().lean();
    res.json({ apiUrl: getApiBaseUrl(), activities });
});
app.post('/api/activities/', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), activity });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().sort({ totalPoints: -1 }).lean();
    res.json({ apiUrl: getApiBaseUrl(), leaderboard });
});
app.post('/api/leaderboard/', async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), entry });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json({ apiUrl: getApiBaseUrl(), workouts });
});
app.post('/api/workouts/', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json({ apiUrl: getApiBaseUrl(), workout });
});
mongoose_1.default
    .connect(mongoUri)
    .then(async () => {
    console.log('Connected to MongoDB');
    await seedData();
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
