import {
  ScrollView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import React, { useState } from "react";
import { commonStyles } from "@/styles/common/common.styles";
import { loginUser } from "@/assets";
import { router } from "expo-router";
import { Toast } from "react-native-toast-notifications";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const isValidLength = password.length >= 6;
    const hasNumber = /(?=.*[0-9])/;
    const hasSpecialChar = /(?=.*[!@#$&*])/;

    if (!isValidLength) {
      setError({
        ...error,
        password: "Password length must be greater than 6",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!hasNumber.test(password)) {
      setError({ ...error, password: "Please enter at least one number" });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!hasSpecialChar.test(password)) {
      setError({
        ...error,
        password: "Please enter at least one special character",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({ ...error, password: "" });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleSignIn = async () => {
    if (!userInfo.email || !userInfo.password) {
      setRequired("All fields are required");
      return;
    }
    setButtonSpinner(true);
    try {
        await axios.post(`${SERVER_URI}/users/login`, {
        email: userInfo.email,
        password: userInfo.password,
      }).then(async (res) => {
        Toast.show("Successfully logged in", {
          type: "success"
        });
        await AsyncStorage.setItem("access_token", res.data.accessToken)
        await AsyncStorage.setItem("refresh_token", res.data.refreshToken)
        router.push("/(tabs)")
      })
    } catch (error:any) {
       Toast.show("Something went wrong!", {
        type: "danger"
       })
    } finally {
      setButtonSpinner(false);
    }
  };

  const [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold,
    Nunito_400Regular_Italic,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient colors={["#83B4FF", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView>
        <Image source={loginUser} style={commonStyles.loginImage} />
        <Text
          style={[commonStyles.loginText, { fontFamily: "Raleway_700Bold" }]}
        >
          Welcome Back!
        </Text>
        <Text
          style={[
            commonStyles.loginParagraph,
            { fontFamily: "Nunito_400Regular_Italic" },
          ]}
        >
          {/* {userInfo.username ? (      
                      <Text>
                            {userInfo.username}
                      </Text>
                  ) : (
                    <Text />
                   )} */}
          <Text />
        </Text>
        <View style={[commonStyles.inputContainer]}>
          <View>
            <TextInput
              style={[commonStyles.input]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="johndoe@gmail.com"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
            <Fontisto
              style={{ position: "absolute", left: 25, top: 17.8 }}
              name="email"
              size={20}
              color={"#9BB0C1"}
            />
            {required && (
              <View style={commonStyles.errorContainer}>
                <Entypo name="cross" size={18} color={"#E72929"} />
              </View>
            )}
            <View>
              <TextInput
                style={[commonStyles.input, { marginTop: 20 }]}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                defaultValue=""
                placeholder="***********"
                onChangeText={handlePasswordValidation}
              />
              <TouchableOpacity
                style={commonStyles.visibleIcon}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={23}
                    color={"#9BB0C1"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={23} color={"#9BB0C1"} />
                )}
              </TouchableOpacity>

              <SimpleLineIcons
                style={{ position: "absolute", left: 25, top: 33.8 }}
                name="lock"
                size={20}
                color={"#9BB0C1"}
              />
            </View>

            {error.password && (
              <View style={[commonStyles.errorContainer, { top: 145 }]}>
                <Entypo name="cross" size={18} color={"#E72929"} />
                <Text style={{ color: "#E72929", fontSize: 13, marginTop: -1 }}>
                  {" "}
                  {error.password}{" "}
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text
                style={[
                  commonStyles.forgotSection,
                  { fontFamily: "Nunito_600SemiBold" },
                ]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 8,
                marginHorizontal: 16,
                marginTop: 25,
                backgroundColor: "#5A72A0",
                opacity: !userInfo.email || error.password ? 0.5 : 1,
              }}
              onPress={handleSignIn}
              disabled={!userInfo.email || !!error.password}
            >
              {buttonSpinner ? (
                <ActivityIndicator size="small" color={"#FFF"} />
              ) : (
                <Text
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Login
                </Text>
              )}
            </TouchableOpacity>

            {/* <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20, fontFamily: 'Nunito_400Regular_Italic'}}>
                            Sign In Using 
                      </Text> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 22,
                gap: 12,
              }}
            >
              <TouchableOpacity>
                <FontAwesome name="google" size={28} color={"#5A72A0"} />
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome name="instagram" size={28} color={"#5A72A0"} />
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome name="twitter" size={28} color={"#5A72A0"} />
              </TouchableOpacity>
            </View>
            <View style={commonStyles.signUpRedirect}>
              <Text style={{ fontSize: 15, fontFamily: "Raleway_600SemiBold" }}>
                Don't have an account?
              </Text>

              <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Raleway_600SemiBold_Italic",
                    color: "#5A72A0",
                    marginLeft: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
