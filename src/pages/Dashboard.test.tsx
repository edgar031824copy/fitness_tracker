import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./Dashboard";

vi.mock("../api/queries", () => ({
  useExercises: vi.fn(() => ({
    data: [],
    isLoading: false,
    error: null,
  })),
  useCreateExercise: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
  useUpdateExercise: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    variables: null,
  })),
}));

vi.mock("../components/RotatingQuotes", () => ({
  RotatingQuotes: () => (
    <div data-testid="rotating-quotes">Motivational Quote</div>
  ),
}));

vi.mock("../components/ExerciseForm", () => ({
  ExerciseForm: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="exercise-form">
      <button disabled={isLoading}>Add Exercise</button>
    </div>
  ),
}));

vi.mock("../components/ExerciseCard", () => ({
  ExerciseCard: ({ exercise }: { exercise: { id: string; name: string } }) => (
    <div data-testid="exercise-card" data-exercise-id={exercise.id}>
      {exercise.name}
    </div>
  ),
}));

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main dashboard elements", () => {
    renderWithQueryClient(<Dashboard />);

    expect(screen.getByText("Today's Workout")).toBeInTheDocument();

    expect(screen.getByText("Add New Exercise")).toBeInTheDocument();
    expect(screen.getByText("Your Exercises")).toBeInTheDocument();
    expect(screen.getByTestId("rotating-quotes")).toBeInTheDocument();
    expect(screen.getByTestId("exercise-form")).toBeInTheDocument();
  });

  it("shows empty state when no exercises", () => {
    renderWithQueryClient(<Dashboard />);

    expect(
      screen.getByText("No exercises yet. Add your first exercise above!")
    ).toBeInTheDocument();
  });
});
