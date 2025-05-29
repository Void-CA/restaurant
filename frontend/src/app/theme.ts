import { createTheme } from "@mui/material/styles";
import config from "../config/appConfig";

const theme = createTheme({
  palette: {
    mode: config.theme.mode,
    primary: { main: config.theme.primary_color },
    secondary: { main: config.theme.secondary_color },
    background: { default: config.theme.background },
    highlight: { main: config.theme.highlight_color }, // color claro para labels, textos, etc
  },
});

export default theme;
