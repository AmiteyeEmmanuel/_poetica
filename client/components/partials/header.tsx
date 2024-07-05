import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Raleway_700Bold, Raleway_400Regular_Italic } from "@expo-google-fonts/raleway";
import { useFonts } from "expo-font";
import { partialStyles } from "@/styles/common/partial.styles";
import { loginUser } from "@/assets";
import AuthUser from "@/hooks/auth/auth.user";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const [ cartItems , setCartItems ] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
      const subscription = async () => {
        const cart = await AsyncStorage.getItem("cart");
        const data = cart ? JSON.parse(cart) : [];
        setCartItems(data);
        setCartLength(data.length);
      };
      subscription();
  }, []);
  
  const { user } = AuthUser();
  const [ fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
  });

  if(!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={partialStyles.container}>
      <View style={partialStyles.headerWrapper}>
        <TouchableOpacity>
          <Image
            source={user?.photo ? user.photo : loginUser}
            style={partialStyles.image}
          />
        </TouchableOpacity>

        <View>
          <Text
            style={[partialStyles.helloText, { fontFamily: "Raleway_700Bold" }]}
          >
             Hi,
          </Text>
          <Text style={[partialStyles.text, {fontFamily: "Raleway_700Bold "}]}>
              {user?.username}
          </Text>
        </View>
      </View>
       <TouchableOpacity style={partialStyles.bellButton}
        onPress={() => router.push('/(routes)/cart')}
       >
          <Feather name="shopping-bag" size={26} color={'black'}/>
          <View style={[partialStyles.bellContainer]}>
              <Text style={{color : '#FFF', fontSize: 14}}> {cartLength}</Text>
          </View>
       </TouchableOpacity>
    </View>
  );
}
