import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationProvider } from "./contexts/NotificationContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "./contexts/UserContext";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<UserProvider>
			<NotificationProvider>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</NotificationProvider>
		</UserProvider>
	</QueryClientProvider>
);
