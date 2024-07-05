import React, { useState } from "react";
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
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
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
import { commonStyles } from "@/styles/common/common.styles";
import { User } from "@/assets";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";

export default function SignUpScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });

  const handlePasswordValidation = (value: any) => {
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

  const handleSignUp = async () => {
    if (!userInfo.username || !userInfo.email || !userInfo.password) {
      setRequired("All fields are required");
      return;
    }
    setButtonSpinner(true);
    try {
        await axios.post(`${SERVER_URI}/users/registration`, {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
      }).then(async (res) => {
        await AsyncStorage.setItem(
          'activation_token',
           res.data.activationToken
        );
        Toast.show(res.data.message, {
          type: "success"
        });
        setUserInfo({
           username: "",
           email: "",
           password: ""
        });
        router.push("/(routes)/verify-account")
      })
    } catch (error:any) {
       Toast.show("Email already exist!", {
        type: "danger"
       })
    } finally {
      setButtonSpinner(false);
    }
  };

  // const pickImage = async () => {
  //   // Ask for permission to access camera and media library
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Sorry, we need camera roll permissions to make this work!");
  //     return;
  //   }

  //   // Launch the image picker
  //   // const result = await ImagePicker.launchImageLibraryAsync({
  //   //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //   //   allowsEditing: true,
  //   //   aspect: [4, 3],
  //   //   quality: 1,
  //   // });

  //   // if (!result.canceled) {
  //   //   setUserInfo({ ...userInfo, photo: result.assets[0].uri });
  //   // }
  // };

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
    <LinearGradient colors={["#FFFFFF", "#83B4FF"]} style={{ flex: 1 }}>
      <ScrollView>
        {/* <TouchableOpacity onPress={pickImage}>
          {userInfo.photo ? (
          <Image source={{ uri: userInfo.photo }} style={commonStyles.loginImage} />
        ) : (
            <Image source={User}  style={commonStyles.loginImage} />
        )}
        </TouchableOpacity> */}

        <Image source={User} style={commonStyles.loginImage} />

        <Text
          style={[commonStyles.loginText, { fontFamily: "Raleway_700Bold" }]}
        >
          Create an account!
        </Text>
        <Text
          style={[
            commonStyles.loginParagraph,
            { fontFamily: "Nunito_400Regular_Italic" },
          ]}
        >
          Explore the beauty of poetry.
        </Text>
        <View style={[commonStyles.inputContainer]}>
          <View>
            <TextInput
              style={[commonStyles.input, { marginBottom: -10 }]}
              keyboardType="default"
              value={userInfo.username}
              placeholder="John Doe"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, username: value })
              }
            />
            <AntDesign
              style={{ position: "absolute", left: 25, top: 17.8 }}
              name="user"
              size={20}
              color={"#9BB0C1"}
            />
          </View>
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
                    name="eye-outline"
                    size={23}
                    color={"#9BB0C1"}
                  />
                ) : (
                  <Ionicons name="eye-off-outline" size={23} color={"#9BB0C1"} />
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
            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 8,
                marginHorizontal: 16,
                marginTop: 40,
                backgroundColor: "#5A72A0",
              }}
              onPress={handleSignUp}
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
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            {/* <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 20, fontFamily: 'Nunito_400Regular_Italic'}}>
                            Sign Up Using 
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
                Already have an account?
              </Text>

              <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Raleway_600SemiBold_Italic",
                    color: "#5A72A0",
                    marginLeft: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
