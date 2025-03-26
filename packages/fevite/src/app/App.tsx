import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import AppProviders from "./providers/AppProviders";

const App = () => {
  return (
    <BrowserRouter>
      <FluentProvider theme={webLightTheme}>
        <AppProviders>
          <AppRouter />
        </AppProviders>
      </FluentProvider>
    </BrowserRouter>
  );
};

export default App;