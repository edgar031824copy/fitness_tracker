import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { History } from "./History";

// Mock the API hooks
const mockUseCompletedExercises = vi.fn(() => ({
  data: [],
  isFetching: false,
  error: null,
}));

vi.mock("../api/queries", () => ({
  useCompletedExercises: () => mockUseCompletedExercises(),
}));

vi.mock("@mui/x-data-grid", () => ({
  DataGrid: ({ rows }: { rows: unknown[] }) => (
    <div data-testid="data-grid">DataGrid with {rows.length} rows</div>
  ),
}));

vi.mock("../components/GridSkeleton", () => ({
  GridSkeleton: () => <div data-testid="grid-skeleton">Loading grid...</div>,
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

describe("History", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCompletedExercises.mockReturnValue({
      data: [],
      isFetching: false,
      error: null,
    });
  });

  it("renders the main history heading", () => {
    renderWithQueryClient(<History />);

    expect(screen.getByText("Exercise History")).toBeInTheDocument();
  });

  it("shows empty state when no completed exercises", () => {
    renderWithQueryClient(<History />);

    expect(
      screen.getByText(
        "No completed exercises yet! Complete some exercises on the Dashboard to see your history here."
      )
    ).toBeInTheDocument();

    expect(screen.queryByText(/Completed Exercises/)).not.toBeInTheDocument();

    expect(screen.queryByTestId("data-grid")).not.toBeInTheDocument();
  });

  it("shows loading skeleton when fetching", () => {
    mockUseCompletedExercises.mockReturnValue({
      data: [],
      isFetching: true,
      error: null,
    });

    renderWithQueryClient(<History />);

    expect(screen.getByTestId("grid-skeleton")).toBeInTheDocument();
  });
});
