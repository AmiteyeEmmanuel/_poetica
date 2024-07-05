import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular_Italic,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
} from "@expo-google-fonts/nunito";
import { FontAwesome } from "@expo/vector-icons";
import { emptyCart } from "@/assets";
import { Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { initPaymentSheet, useStripe } from "@stripe/stripe-react-native";
import OrderSucessPage from "@/components/partials/content/order.success";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartLength, setCartLength] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
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

  const onRefresh = async () => {
    setRefreshing(true);
    const cart: any = await AsyncStorage.getItem("cart");
    setCartItems(cart);
    setRefreshing(false);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    return totalPrice.toFixed(2);
  };

  const handlePoemDetails = (poemDetails: any) => {
    router.push({
      pathname: "/(routes)/poem-details",
      params: { item: JSON.stringify(poemDetails) },
    });
  };

  const handleRemoveItem = async (item: any) => {
    const existingCartData = await AsyncStorage.getItem("cart");
    const data = existingCartData ? JSON.parse(existingCartData) : [];
    const updatedCartData = data.filter((i: any) => i._id !== item._id);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCartData));
    setCartItems(updatedCartData);
    setCartLength(updatedCartData?.length);
  };

  const handlePayment = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    const amount = Math.round(
      cartItems.reduce((total, item) => total + item.price, 0) * 100
    );
    await axios
      .post(
        `${SERVER_URI}/orders/payment`,
        { amount },
        {
          headers: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        }
      )
      .then(async (res: any) => {
        await initPaymentSheet({
          merchantDisplayName: "Peotica Ltd",
          paymentIntentClientSecret: res.data.client_secret,
          returnURL: "yourapp://payment-complete",
        })
          .then(async (res) => {
            // Present payment sheet.
            const paymentResponse = await presentPaymentSheet();
            if (paymentResponse.error) {
              console.log(paymentResponse.error);
            }
            await createOrder(paymentResponse);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createOrder = async (paymentResponse: any) => {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    await axios
      .post(
        `${SERVER_URI}/orders/create-order`,
        {
          poemId: cartItems[0]._id,
          payment_info: paymentResponse,
        },
        {
          headers: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        }
      )
      .then((res) => {
        setOrderSuccess(true);
        AsyncStorage.removeItem("cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [fontLoaded, fontError] = useFonts({
    Nunito_700Bold_Italic,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold_Italic,
    Raleway_600SemiBold,
  });

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#83B4FF"]}
      style={{ flex: 1, backgroundColor: "#FFF" }}
    >
      {orderSuccess ? (
        <OrderSucessPage/>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#EEEEEE",
                  marginHorizontal: 10,
                }}
              >
                <TouchableOpacity onPress={() => handlePoemDetails(item)}>
                  <Image
                    source={{ uri: item.thumbnail.url }}
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 16,
                      borderRadius: 8,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <TouchableOpacity onPress={() => handlePoemDetails(item)}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        fontFamily: "Nunito_700Bold_Italic",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 16,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#808080",
                          fontWeight: 900,
                          fontFamily: "Nunito_400Regular_Italic",
                        }}
                      >
                        ${item.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveItem(item)}
                  style={{
                    backgroundColor: "#FF6347",
                    borderRadius: 5,
                    padding: 2,
                    marginTop: 1,
                    width: 30,
                    alignSelf: "flex-start",
                  }}
                >
                  <FontAwesome
                    style={{ textAlign: "center" }}
                    name="close"
                    size={16}
                    color="#FFF"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Image
                  source={emptyCart}
                  style={{ width: 320, height: 400, resizeMode: "contain" }}
                />
                {/* <Text
              style={{
                fontSize: 24,
                marginTop: 20,
                color: "#333",
                fontFamily: "Nunito_700Bold_Italic",
              }}
            >
              No Item
            </Text> */}
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

          <View style={{ marginBottom: 20 }}>
            {cartItems?.length === 0 ||
              (cartItems?.length > 0 && (
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    marginTop: 20,
                    fontFamily: "Nunito_700Bold_Italic",
                  }}
                >
                  Total Price: ${calculateTotalPrice()}
                </Text>
              ))}
            {cartItems.length === 0 ||
              (cartItems.length > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#5A72A0",
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 20,
                    width: "80%",
                    alignSelf: "center",
                  }}
                  onPress={() => handlePayment()}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 18,
                      textAlign: "center",
                      fontFamily: "Nunito_600SemiBold_Italic",
                    }}
                  >
                    {" "}
                    Check Out
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </>
      )}
    </LinearGradient>
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
