import theme from "@/utils/theme";
import { initAxios } from "@/utils/theme/axiosInterceptor.utils";
import { ThemeProvider } from "@shopify/restyle";
import { Stack, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout() {
  useFocusEffect(
    useCallback(() => {
      initAxios();
    }, [])
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
