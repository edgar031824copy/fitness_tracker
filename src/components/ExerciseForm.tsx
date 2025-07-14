import { useState } from "react";
import type { FC } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Slider,
  Alert,
} from "@mui/material";
import { Add, FitnessCenter } from "@mui/icons-material";
import type { ExerciseFormData } from "../types";

type ExerciseFormProps = {
  onSubmit: (data: ExerciseFormData) => void;
  isLoading?: boolean;
};

export const ExerciseForm: FC<ExerciseFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [exerciseName, setExerciseName] = useState("");
  const [targetSets, setTargetSets] = useState(3);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!exerciseName.trim()) {
      setError("Exercise name is required");
      return;
    }

    if (targetSets < 1 || targetSets > 10) {
      setError("Target sets must be between 1 and 10");
      return;
    }

    setError(null);
    onSubmit({
      name: exerciseName.trim(),
      targetSets,
    });

    // Reset form
    setExerciseName("");
    setTargetSets(3);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <FitnessCenter sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Add New Exercise
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          placeholder="e.g., Push-ups, Squats, Planks"
          fullWidth
          variant="outlined"
          disabled={isLoading}
        />

        <Box>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            Target Sets: {targetSets}
          </Typography>
          <Slider
            value={targetSets}
            onChange={(_, newValue) => setTargetSets(newValue)}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            disabled={isLoading}
            color="primary"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Add />}
          disabled={!exerciseName.trim() || isLoading}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          {isLoading ? "Adding..." : "Add Exercise"}
        </Button>
      </Box>
    </Paper>
  );
};
