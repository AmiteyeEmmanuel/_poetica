import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_400Regular,
} from "@expo-google-fonts/nunito";
import { globalStyles } from "@/styles";
import { router } from "expo-router";
import { passwordReset } from "@/assets";

export default function ForgotPasswordScreen() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LinearGradient
      colors={["#83B4FF", "#FFFFFF"]}
      style={globalStyles.container}
    >
      <Image source={passwordReset}  style={globalStyles.resetImage} />
      <Text style={[globalStyles.headerText, { fontFamily: "Nunito_700Bold" }]}>
        Reset Email Password
      </Text>
      <TextInput
        style={[globalStyles.input, { fontFamily: "Nunito_400Regular" }]}
        placeholder="johndoe@gmail.com"
        keyboardType="email-address"
        // value={userInfo.email}
        // onChangeText={(value) => setUserInfo({ ...userInfo, email: value })}
      />
      <TouchableOpacity style={globalStyles.button}>
        <Text
          style={[globalStyles.buttonText, { fontFamily: "Nunito_400Regular" }]}
        >
          Send
        </Text>
      </TouchableOpacity>
      <View style={globalStyles.loginLink}>
        <Text
          style={[globalStyles.backText, { fontFamily: "Raleway_600SemiBold" }]}
        >
          Back To?
        </Text>

        <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Raleway_600SemiBold",
              color: "#5A72A0",
              marginLeft: 5,
              textDecorationLine: "underline",
            }}
          >
            login
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
