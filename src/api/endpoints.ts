import type { Exercise, ExerciseFormData, CompletedExercise } from "../types";
import {
  getExercises,
  getCompletedExercises,
  addExerciseToData,
  updateExerciseInData,
} from "../services/dataService";
import { delay, API_DELAY } from "./client";

// Exercise API endpoints
export const exerciseEndpoints = {
  // Get all exercises
  getExercises: async (): Promise<Exercise[]> => {
    await delay(API_DELAY);
    return getExercises();
  },

  // Get completed exercises (history)
  getCompletedExercises: async (): Promise<CompletedExercise[]> => {
    await delay(API_DELAY);
    return getCompletedExercises();
  },

  // Create new exercise
  createExercise: async (exerciseData: ExerciseFormData): Promise<Exercise> => {
    await delay(API_DELAY);

    const exercise: Exercise = {
      id: crypto.randomUUID(),
      name: exerciseData.name,
      targetSets: exerciseData.targetSets,
      completedSets: 0,
      isCompleted: false,
      createdAt: new Date(),
    };

    addExerciseToData(exercise);
    return exercise;
  },

  // Update exercise
  updateExercise: async (
    exerciseId: string,
    updates: Partial<Exercise>
  ): Promise<Exercise> => {
    await delay(API_DELAY);
    return updateExerciseInData(exerciseId, updates);
  },
};
