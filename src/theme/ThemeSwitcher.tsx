import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { MaterialUISwitch } from "../components/ui/themeSwitch";
import { useThemeMode } from "./ThemeContext";

export function ThemeSwitcher() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box>
      <FormControl>
        <MaterialUISwitch
          checked={mode === "dark"}
          onChange={toggleMode}
        />
      </FormControl>
    </Box>
  );
}
