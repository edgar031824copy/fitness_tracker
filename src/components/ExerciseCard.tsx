import type { FC } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Box,
  LinearProgress,
  IconButton,
  Chip,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { FitnessCenter, Add, Remove } from "@mui/icons-material";
import type { Exercise } from "../types";

type ExerciseCardProps = {
  exercise: Exercise;
  onToggleComplete: (id: string) => void;
  onUpdateSets: (id: string, sets: number) => void;
  isLoading?: boolean;
};

export const ExerciseCard: FC<ExerciseCardProps> = ({
  exercise,
  onToggleComplete,
  onUpdateSets,
  isLoading = false,
}) => {
  const progressPercentage =
    (exercise.completedSets / exercise.targetSets) * 100;

  const isCompleted = exercise.completedSets >= exercise.targetSets;

  const handleIncrementSets = () => {
    if (exercise.completedSets < exercise.targetSets) {
      onUpdateSets(exercise.id, exercise.completedSets + 1);
    }
  };

  const handleDecrementSets = () => {
    if (exercise.completedSets > 0) {
      onUpdateSets(exercise.id, exercise.completedSets - 1);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
          borderColor: "primary.main",
        },
        ...(exercise.isCompleted && {
          opacity: 0.8,
          backgroundColor: "grey.100",
        }),
        position: "relative",
      }}
    >
      {isLoading && (
        <Backdrop
          sx={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 1,
          }}
          open={isLoading}
        >
          <CircularProgress size={40} />
        </Backdrop>
      )}

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FitnessCenter sx={{ mr: 1, color: "primary.main" }} />
          <Typography
            variant="h6"
            component="h3"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
            }}
          >
            {exercise.name}
          </Typography>
          <Checkbox
            checked={exercise.isCompleted}
            onChange={() => onToggleComplete(exercise.id)}
            disabled={isLoading}
            sx={{
              color: "success.main",
              "&.Mui-checked": {
                color: "success.main",
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {exercise.completedSets}/{exercise.targetSets} sets
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "grey.200",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: isCompleted ? "success.main" : "primary.main",
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: "block" }}
          >
            {Math.round(progressPercentage)}% complete
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleDecrementSets}
              disabled={
                exercise.completedSets === 0 ||
                exercise.isCompleted ||
                isLoading
              }
              size="small"
              sx={{
                backgroundColor: "grey.100",
                "&:hover": {
                  backgroundColor: "grey.200",
                },
              }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6" sx={{ minWidth: 40, textAlign: "center" }}>
              {exercise.completedSets}
            </Typography>
            <IconButton
              onClick={handleIncrementSets}
              disabled={
                exercise.completedSets >= exercise.targetSets ||
                exercise.isCompleted ||
                isLoading
              }
              size="small"
              sx={{
                backgroundColor: "primary.50",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.100",
                },
              }}
            >
              <Add />
            </IconButton>
          </Box>

          {isCompleted && (
            <Chip
              label="Completed!"
              color="success"
              variant="filled"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
