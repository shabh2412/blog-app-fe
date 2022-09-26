import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import theme from "./common/extendedTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</ChakraProvider>
);
