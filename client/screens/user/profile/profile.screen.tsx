import { View, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AuthUser from "@/hooks/auth/auth.user";
import Loader from "@/components/loader/loader";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";
import axios from "axios";
import { StyleSheet } from "react-native";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStripe } from "@stripe/stripe-react-native";

export default function ProfileScreen() {
  const { user, loading } = AuthUser();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartLength, setCartLength] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [orderSucess, setOrderSuccess] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    const subscription = async () => {
      const cart = await AsyncStorage.getItem("cart");
      const data = cart ? JSON.parse(cart) : [];
      setCartItems(data);
      setCartLength(data.length);
    };
    subscription();
  }, []);

  const handleLogout = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    const amount = Math.round(
      cartItems.reduce((total, item) => total + item.price, 0) * 100
    );
    await axios
      .post(
        `${SERVER_URI}/users/logout`,
      )
      .then(async (res: any) => {
         console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Raleway_700Bold,
  });

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#83B4FF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
          style={{ flex: 1, paddingTop: 80 }}
        >
          <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ position: "relative" }}>
                <Image
                  source={{
                    uri:
                      user?.photo?.url ||
                      "https://res.cloudinary.com/dtdmwqrwx/image/upload/v1719606738/user_hrdhyc.jpg",
                  }}
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 5,
                    width: 30,
                    height: 30,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 100,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="camera" size={25} color={"#000"} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  paddingTop: 10,
                  fontWeight: 600,
                  fontFamily: "Nunito_600SemiBold_Italic",
                }}
              >
                {user?.username}
              </Text>
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 16,
                  fontFamily: "Raleway_700Bold",
                }}
              >
                Account Details
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#000",
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center" }}
                      name="user-o"
                      size={20}
                      color={"#000"}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 16, fontFamily: "Nunito_700Bold" }}
                    >
                      Profile Details
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Nunito_400Regular",
                        color: "#575757",
                      }}
                    >
                      Information Account
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={25} color={"#CBD5E0"} />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#000",
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ alignSelf: "center" }}
                      name="book-account-outline"
                      size={20}
                      color={"#000"}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 16, fontFamily: "Nunito_700Bold" }}
                    >
                      Available Poems
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Nunito_400Regular",
                        color: "#575757",
                      }}
                    >
                      All Poems
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={25} color={"#CBD5E0"} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Logout  */}
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <View style={styles.innerContainer}>
                <View>
                  <Text style={styles.logoutText}>Logout</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 30,
  },
  logoutText: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    color: "#FE0000",
  },
});
