export type Exercise = {
  id: string;
  name: string;
  targetSets: number;
  completedSets: number;
  isCompleted: boolean;
  createdAt: Date;
  completedAt?: Date;
};

export type ExerciseFormData = {
  name: string;
  targetSets: number;
};

export type CompletedExercise = {
  id: string;
  name: string;
  targetSets: number;
  completedSets: number;
  completedAt: Date;
};

export type Quote = {
  id: number;
  text: string;
  author?: string;
};
