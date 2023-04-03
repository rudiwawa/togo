export const theme: ThemeType = {
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Roboto Condensed, sans-serif",
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
    },
    weights: {
      normal: 400,
      bold: 700,
    },
  },
  colors: {
    primary: "#00AA5B",
    primaryHover: "#03AC0E",
    "gray-100": "#f7fafc",
    "gray-200": "#edf2f7",
    "gray-300": "#e2e8f0",
    "gray-400": "#cbd5e0",
    "gray-500": "#a0aec0",
    "gray-600": "#718096",
    "gray-700": "#4a5568",
    "gray-800": "#2d3748",
    "gray-900": "#1a202c",

    "red-500": "#D6001C",
    "red-600": "#EF144A",
    yellow1: "#FFC400",
  },
  typography: {
    fontSize: "16px",
    lineHeight: "1.5",
  },
  shadows: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px 0 rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px 0 rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px 0 rgba(0, 0, 0, 0.1)",
    xxl: "0 25px 50px 0 rgba(0, 0, 0, 0.1)",
  },
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },
};

export type ThemeType = {
  colors: {
    primary: string;
    primaryHover: string;
    "gray-100": string;
    "gray-200": string;
    "gray-300": string;
    "gray-400": string;
    "gray-500": string;
    "gray-600": string;
    "gray-700": string;
    "gray-800": string;
    "gray-900": string;

    "red-500": string;
    "red-600": string;
    yellow1: string;
  };
  fonts: {
    body: string;
    heading: string;
    sizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    weights: {
      normal: number;
      bold: number;
    };
  };
  typography: {
    fontSize: string;
    lineHeight: string;
  };
  shadows: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
};
