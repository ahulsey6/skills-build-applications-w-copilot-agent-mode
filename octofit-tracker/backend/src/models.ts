import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, default: 'intermediate' },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'users' },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    focus: { type: String, default: 'fitness' },
    members: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'teams' },
);

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'activities' },
);

const leaderboardSchema = new Schema(
  {
    userName: { type: String, required: true },
    totalPoints: { type: Number, default: 0 },
    streak: { type: Number, default: 1 },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'leaderboard' },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, default: 'beginner' },
    instructions: { type: String, default: 'Stay consistent and hydrate.' },
  },
  { collection: 'workouts' },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
