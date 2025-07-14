import { useState, useEffect } from "react";
import type { FC } from "react";
import { Box, Typography, Fade, Paper } from "@mui/material";
import { FormatQuote } from "@mui/icons-material";
import type { Quote } from "../types";

const motivationalQuotes: Quote[] = [
  { id: 1, text: "Keep it up! You're doing great!", author: "Fitness Tracker" },
  { id: 2, text: "You're the best! Don't give up!", author: "Fitness Tracker" },
  {
    id: 3,
    text: "This component is motivating you!",
    author: "Edgar Hernandez",
  },
  {
    id: 4,
    text: "Every rep counts, every set matters!",
    author: "Fitness Tracker app",
  },
  {
    id: 5,
    text: "Strong today, stronger tomorrow!",
    author: "Ussain Bolt",
  },
  { id: 6, text: "Progress, not perfection!", author: "Mike tyson" },
  { id: 7, text: "Your only limit is you!", author: "Fitness Tracker" },
];

export const RotatingQuotes: FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
        setFadeIn(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = motivationalQuotes[currentQuoteIndex];

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 120,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 2,
        p: 3,
        mb: 3,
        position: "relative",
      }}
    >
      <FormatQuote
        sx={{
          fontSize: 40,
          opacity: 0.3,
          position: "absolute",
          top: 16,
          left: 16,
        }}
      />
      <Fade in={fadeIn} timeout={500}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            component="blockquote"
            sx={{
              fontStyle: "italic",
              fontWeight: 500,
              mb: 1,
            }}
          >
            "{currentQuote.text}"
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontWeight: 300,
            }}
          >
            — {currentQuote.author}
          </Typography>
        </Box>
      </Fade>
    </Paper>
  );
};
