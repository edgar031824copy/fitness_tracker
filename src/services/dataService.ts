import type { Exercise, CompletedExercise } from "../types";
import { exercisesData, completedExercisesData } from "../data/exercises";

// Getter methods
export const getExercises = (): Exercise[] => {
  return [...exercisesData];
};

export const getCompletedExercises = (): CompletedExercise[] => {
  return [...completedExercisesData];
};

// Create method
export const addExerciseToData = (exercise: Exercise): void => {
  exercisesData.push(exercise);
};

// Update method
export const updateExerciseInData = (
  exerciseId: string,
  updates: Partial<Exercise>
): Exercise => {
  const exerciseIndex = exercisesData.findIndex((ex) => ex.id === exerciseId);

  if (exerciseIndex === -1) {
    throw new Error("Exercise not found");
  }

  const currentExercise = exercisesData[exerciseIndex];
  const updatedExercise = { ...currentExercise, ...updates };

  // Update the exercise in the main array
  exercisesData[exerciseIndex] = updatedExercise;

  // Handle completed exercises history
  const existingHistoryIndex = completedExercisesData.findIndex(
    (ex) => ex.id === exerciseId
  );

  if (updatedExercise.isCompleted) {
    // Exercise is completed - update or create history record
    const completedExercise: CompletedExercise = {
      id: updatedExercise.id,
      name: updatedExercise.name,
      targetSets: updatedExercise.targetSets,
      completedSets: updatedExercise.completedSets,
      completedAt: updatedExercise.completedAt || new Date(),
    };

    if (existingHistoryIndex >= 0) {
      // Update existing history record
      completedExercisesData[existingHistoryIndex] = completedExercise;
    } else {
      // Create new history record
      completedExercisesData.push(completedExercise);
    }
  } else {
    // Exercise is not completed - remove from history if it exists
    if (existingHistoryIndex >= 0) {
      completedExercisesData.splice(existingHistoryIndex, 1);
    }
  }

  return updatedExercise;
};
