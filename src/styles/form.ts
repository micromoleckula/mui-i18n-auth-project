import type { Theme } from "@mui/material/styles";

export const form = (theme: Theme) => {
  return {
    width: 400,
    p: 4,
    borderRadius: 1,
    color: "text.primary",
    bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.50",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 6px 18px rgba(2,6,23,0.6)"
        : "0 6px 18px rgba(15,15,15,0.08)",
  };
};
