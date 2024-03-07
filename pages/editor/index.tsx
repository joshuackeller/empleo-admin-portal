import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { useCallback, useMemo, useState, useEffect } from "react";
import Editor from "../../src/components/textEditor/Editor";

export default function App() {
  const [systemSettingsPrefersDarkMode, setSystemSettingsPrefersDarkMode] =
    useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      setSystemSettingsPrefersDarkMode(matchMedia.matches);
    }
  }, []);

  const [paletteMode, setPaletteMode] = useState<PaletteMode>(
    systemSettingsPrefersDarkMode ? "dark" : "light"
  );
  const togglePaletteMode = useCallback(
    () =>
      setPaletteMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          secondary: {
            main: "#42B81A",
          },
        },
      }),
    [paletteMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            mui-tiptap
          </Typography>

          <IconButton onClick={togglePaletteMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, maxWidth: 1207, margin: "0 auto" }}>
        <Editor />
      </Box>
    </ThemeProvider>
  );
}
