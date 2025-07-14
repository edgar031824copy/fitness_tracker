import type { FC } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { ExerciseForm } from "../components/ExerciseForm";
import { ExerciseCard } from "../components/ExerciseCard";
import { RotatingQuotes } from "../components/RotatingQuotes";
import {
  useExercises,
  useCreateExercise,
  useUpdateExercise,
} from "../api/queries";
import type { ExerciseFormData } from "../types";

export const Dashboard: FC = () => {
  const { data: exercises, isLoading, error } = useExercises();
  const { mutate: createExercise, isPending: isCreatingExerciseLoading } =
    useCreateExercise();
  const {
    mutate: updateExercise,
    isPending: updateExerciseLoading,
    variables: updateVariables,
  } = useUpdateExercise();

  const handleAddExercise = (exerciseData: ExerciseFormData) => {
    createExercise(exerciseData);
  };

  const handleToggleComplete = (id: string) => {
    const exercise = exercises?.find((ex) => ex.id === id);
    if (exercise) {
      updateExercise({
        exerciseId: id,
        updates: { isCompleted: !exercise.isCompleted },
      });
    }
  };

  const handleUpdateSets = (id: string, completedSets: number) => {
    const exercise = exercises?.find((ex) => ex.id === id);
    if (exercise) {
      const isCompleted = completedSets >= exercise.targetSets;
      updateExercise({
        exerciseId: id,
        updates: {
          completedSets,
          isCompleted,
          ...(isCompleted && { completedAt: new Date() }),
        },
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" textAlign="center">
          Error loading exercises
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Today's Workout
      </Typography>
      <RotatingQuotes />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Exercise
        </Typography>
        <ExerciseForm
          onSubmit={handleAddExercise}
          isLoading={isCreatingExerciseLoading}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your Exercises
        </Typography>
        {exercises?.length === 0 ? (
          <Typography color="text.secondary">
            No exercises yet. Add your first exercise above!
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {exercises?.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onToggleComplete={handleToggleComplete}
                onUpdateSets={handleUpdateSets}
                isLoading={
                  updateExerciseLoading &&
                  updateVariables?.exerciseId === exercise.id
                }
              />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};
