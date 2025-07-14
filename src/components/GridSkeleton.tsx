import type { FC } from "react";
import { Box, Skeleton } from "@mui/material";

export const GridSkeleton: FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 2, p: 1, backgroundColor: "grey.50" }}>
        <Skeleton variant="text" sx={{ flex: 2 }} height={30} />
        <Skeleton variant="text" sx={{ flex: 1 }} height={30} />
        <Skeleton variant="text" sx={{ flex: 1 }} height={30} />
        <Skeleton variant="text" sx={{ flex: 1.5 }} height={30} />
        <Skeleton variant="text" sx={{ flex: 1 }} height={30} />
      </Box>

      {Array.from({ length: 5 }).map((_, index) => (
        <Box key={index} sx={{ display: "flex", gap: 2, p: 1 }}>
          <Skeleton variant="text" sx={{ flex: 2 }} height={40} />
          <Skeleton
            variant="rectangular"
            sx={{ flex: 1, borderRadius: 1 }}
            height={25}
          />
          <Skeleton
            variant="rectangular"
            sx={{ flex: 1, borderRadius: 1 }}
            height={25}
          />
          <Skeleton variant="text" sx={{ flex: 1.5 }} height={40} />
          <Skeleton
            variant="rectangular"
            sx={{ flex: 1, borderRadius: 1 }}
            height={25}
          />
        </Box>
      ))}
    </Box>
  );
};
