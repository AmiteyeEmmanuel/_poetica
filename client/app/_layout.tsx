import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";

import { useColorScheme } from "@/components/useColorScheme";
import { Stack } from "expo-router";
import OrderSuccessPage from "@/components/partials/content/order.success";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const [ isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/welcome-page/index" />
        <Stack.Screen name="(routes)/signup/index" />
        <Stack.Screen name="(routes)/login/index" />
        <Stack.Screen name="(routes)/forgot-password/index" />
        <Stack.Screen
          name="(routes)/poem-details/index"
          options={{
            headerShown: true,
            title: "Poem Details",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="(routes)/cart/index"
          options={{
            headerShown: true,
            title: "Cart 🛒",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="(routes)/poem-access/index"
          options={{
            headerShown: true,
            title: "Poem",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </ToastProvider>
  );
}
