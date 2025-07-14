import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Exercise } from "../types";
import { exerciseEndpoints } from "./endpoints";

// Get all exercises
export const useExercises = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: exerciseEndpoints.getExercises,
  });
};

// Get completed exercises (history)
export const useCompletedExercises = () => {
  return useQuery({
    queryKey: ["exercises", "history"],
    queryFn: exerciseEndpoints.getCompletedExercises,
  });
};

// Create new exercise mutation
export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exerciseEndpoints.createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};

// Update exercise mutation
export const useUpdateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      exerciseId,
      updates,
    }: {
      exerciseId: string;
      updates: Partial<Exercise>;
    }) => exerciseEndpoints.updateExercise(exerciseId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      queryClient.invalidateQueries({ queryKey: ["exercises", "history"] });
    },
  });
};
