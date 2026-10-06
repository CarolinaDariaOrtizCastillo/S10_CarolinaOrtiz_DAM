import { colors } from "./colors";

export const theme = {
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },

  radius: {
    small: 8,
    medium: 12,
  },

  fontSize: {
    title: 28,
    subtitle: 16,
    body: 15,
    button: 16,
  },
};

export const Colors = {
  light: {
    background: "#FFFFFF",
    text: "#0F172A",
    tint: colors.primary,
    icon: "#0F172A",
    tabIconDefault: "#94A3B8",
    tabIconSelected: colors.primary,
  },
  dark: {
    background: "#0F172A",
    text: "#F8FAFC",
    tint: "#93C5FD",
    icon: "#F8FAFC",
    tabIconDefault: "#94A3B8",
    tabIconSelected: "#93C5FD",
  },
};
