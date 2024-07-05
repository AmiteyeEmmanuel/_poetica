import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedLoader from 'react-native-animated-loader'

export default function Loader() {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
        <AnimatedLoader
         visible={true}
         overlayColor="rgba(255, 255, 255, 0.75"
         source={require("@/assets/animation/loader.json")}
         animationStyle={{ width: 250, height: 250}}
         speed={1.5}
         />
    </LinearGradient>
  );
}
