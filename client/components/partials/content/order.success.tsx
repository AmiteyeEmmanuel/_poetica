import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  useFonts,
  Nunito_700Bold,
  Nunito_600SemiBold_Italic,
  Nunito_400Regular_Italic,
} from "@expo-google-fonts/nunito";

import AnimatedLoader from "react-native-animated-loader";

export default function OrderSuccessPage() {
  const [fontLoaded, fontError] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold_Italic,
  });

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255, 255, 255, 0.75"
        source={require("@/assets/animation/payment.json")}
        animationStyle={{
          width: 200,
          height: 200,
        }}
        speed={0.7}
      />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Payment Successful!</Text>
          <Text
            style={[
              styles.message,
              { fontFamily: "Nunito_600SemiBold_Italic" },
            ]}
          >
             Thank you for your purchase! Your order has been processed successfully.
          </Text>
          <Text
            style={[styles.message, { fontFamily: "Nunito_400Regular_Italic" }]}
          >
            You can now enjoy your purchased poems. Visit your library to start
            reading.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 250,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Nunito_700Bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginVertical: 5,
  },
});
