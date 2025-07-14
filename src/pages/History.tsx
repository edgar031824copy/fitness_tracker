import { Container, Typography, Box, Alert, Paper, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { History as HistoryIcon, FitnessCenter } from "@mui/icons-material";
import { useCompletedExercises } from "../api/queries";
import { GridSkeleton } from "../components/GridSkeleton";
import type { FC } from "react";

export const History: FC = () => {
  const {
    data: completedExercises = [],
    isFetching,
    error,
  } = useCompletedExercises();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Exercise",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FitnessCenter sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "completedSets",
      headerName: "Sets Completed",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={`${params.value} sets`}
          color="success"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "targetSets",
      headerName: "Target Sets",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={`${params.value} sets`}
          color="primary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "completedAt",
      headerName: "Completed At",
      flex: 1.5,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      ),
    },
    {
      field: "progress",
      headerName: "Progress",
      flex: 1,
      renderCell: (params) => {
        const percentage = Math.round(
          (params.row.completedSets / params.row.targetSets) * 100
        );
        return (
          <Chip
            label={`${percentage}%`}
            color={percentage === 100 ? "success" : "warning"}
            variant="filled"
            size="small"
          />
        );
      },
    },
  ];

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Failed to load exercise history. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <HistoryIcon sx={{ mr: 2, color: "primary.main", fontSize: 32 }} />
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          sx={{
            fontWeight: 700,
          }}
        >
          Exercise History
        </Typography>
      </Box>

      {completedExercises.length === 0 && !isFetching ? (
        <Alert severity="info" sx={{ textAlign: "center" }}>
          No completed exercises yet! Complete some exercises on the Dashboard
          to see your history here.
        </Alert>
      ) : (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Completed Exercises ({completedExercises.length})
          </Typography>

          <Box sx={{ height: 400, width: "100%" }}>
            {isFetching ? (
              <GridSkeleton />
            ) : (
              <DataGrid
                rows={completedExercises}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                  sorting: {
                    sortModel: [{ field: "completedAt", sort: "desc" }],
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "grey.50",
                    fontWeight: "bold",
                  },
                }}
              />
            )}
          </Box>
        </Paper>
      )}
    </Container>
  );
};
