import { extendTheme } from "@chakra-ui/react";

const config = {};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {},
    }),
  },
  colors: {
    defaultColor: {
      50: "#E6E9F0",
      100: "#C1C7D9",
      200: "#98A2C0",
      300: "#6E7DA6",
      400: "#4F6193",
      500: "#304580",
      600: "#2B3E78",
      700: "#24366D",
      800: "#1E2E63",
      900: "#131F50",
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({}),
        color: {
          _hover: { bg: "#564A95" },
          _active: { bg: "#564A95" },
        },
        "add-button": {
          bg: "defaultColor.500",
          _hover: { bg: "defaultColor.400" },
          color: "#fff",
        },
        "add-button-dark": {
          bg: "defaultColor.500",
          _hover: { bg: "defaultColor.700" },
          color: "#fff",
        },
        "add-button-clear": {
          bg: "defaultColor.300",
          _hover: { bg: "defaultColor.200" },
          color: "#fff",
        },
        "confirm-add-button": {
          bg: "defaultColor.300",
          _hover: { bg: "defaultColor.200" },
          color: "#fff",
        },
        "delete-button": {
          bg: "#d63031",
          color: "#fff",
          _hover: { bg: "#f05657" },
        },
        "cancel-action": {
          outline: "2px solid #cbd5e0",
          color: "#fff",
          _hover: { bg: "rgba(0, 0, 0, 0.20)" },
        },
        "cancel-action-black": {
          outline: "2px solid #cbd5e0",
          color: "#000",
          _hover: { bg: "rgba(0, 0, 0, 0.20)" },
        },
      },
    },
    Badge: {
      variants: {
        "required-error": {
          rounded: "md",
          px: "3",
          py: "0.5",
          w: "100%",
          mt: "1.5",
          textAlign: "center",
          bg: "#9E6A72",
          color: "#fff",
        },
      },
    },
    Link: {
      baseStyle: {
        fontWeight: "semibold",
        _hover: {
          bgGradient: "linear(to-r, cyan.400, blue.500, purple.600)",
          bgClip: "text",
          transform: "scale(1.06)",
          transition: "transform 1s, all 0.2s ease-in-out",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
