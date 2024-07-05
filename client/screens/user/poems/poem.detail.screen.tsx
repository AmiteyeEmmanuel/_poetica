import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
} from "@expo-google-fonts/nunito";
import {
  Raleway_400Regular,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Description from "@/components/partials/content/description";
import Author from "@/components/partials/content/author";
import Reviews from "@/components/partials/content/review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthUser from "@/hooks/auth/auth.user";

export default function PoemDetailScreen() {
  const [activeButton, setActiveButton] = useState("Description");
  const { user } = AuthUser();
  const { item } = useLocalSearchParams();
  const [poemData, setPoemData] = useState<PoemsType | null>(null);
  const [checkPurchased, setCheckPurchased] = useState(false);

  useEffect(() => {
    if (item) {
      try {
        const parsedItem = JSON.parse(item as string);
        setPoemData(parsedItem);
      } catch (error) {
        console.error("Error parsing item:", error);
      }
    }
  }, [item]);

  useEffect(() => {
    if (user && poemData) {
      if (
        user.poems?.find((i: any) => String(i.poemId) === String(poemData._id))
      ) {
        setCheckPurchased(true);
      }
    }
  }, [user, poemData]);

  const handleAddToCart = async () => {
    try {
      const existingCartData = await AsyncStorage.getItem("cart");
      let data = [];

      if (existingCartData) {
        try {
          data = JSON.parse(existingCartData);
          if (!Array.isArray(data)) {
            data = [];
          }
        } catch (error) {
          data = [];
        }
      }

      // Check if the item already exists in the cart
      const itemExists = data.some((item: any) => item._id === poemData?._id);

      // If the item doesn't exist, add it to the cart
      if (!itemExists && poemData) {
        data.push(poemData);
        await AsyncStorage.setItem("cart", JSON.stringify(data));
      }

      // Redirect to the cart page
      router.push("/(routes)/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const [fontLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Raleway_400Regular,
    Raleway_700Bold,
  });

  if (!fontLoaded && !fontError) {
    return null;
  }

  if (!poemData) {
    return <Text>...</Text>;
  }

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#83B4FF"]}
      style={{ flex: 1, paddingTop: 8 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ position: "absolute", zIndex: 14, right: 0 }}>
            <View style={styles.detailSection}>
              <FontAwesome name="star" size={14} color={"#FFFFFF"} />
              <Text
                style={{
                  color: "#FFFFFF",
                  marginLeft: 4,
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                {" "}
                {poemData.rating}
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: poemData.thumbnail.url! }}
            style={{ width: "100%", height: 230, borderRadius: 6 }}
          />
        </View>
        <Text style={[styles.descriptionHeader]}>{poemData.name}</Text>

        <View style={styles.priceContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.priceText}>${poemData.price}</Text>

            <Text style={styles.estimatedPrice}>
              ${poemData.estimatedPrice}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>
            {poemData.purchased} Sales
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}> Description</Text>
          {poemData.prerequisites.map(
            (item: PrerequistesType, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  gap: 6,
                  paddingLeft: 4,
                  paddingVertical: 4,
                  width: "95%",
                }}
              >
                <Ionicons name="checkmark-done-outline" size={18} />
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
              </View>
            )
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}> Benefits</Text>
          {poemData.benefits.map((item: BenefitType, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                gap: 6,
                paddingLeft: 4,
                paddingVertical: 4,
                width: "95%",
              }}
            >
              <Ionicons name="checkmark-done-outline" size={18} />
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor:
                activeButton === "Description" ? "#5A72A0" : "transparent",
              borderRadius: activeButton === "Description" ? 50 : 0,
            }}
            onPress={() => setActiveButton("Description")}
          >
            <Text
              style={{
                fontSize: 14,
                color: activeButton === "Description" ? "#FFF" : "#000",
                fontFamily: "Nunito_600SemiBold_Italic",
              }}
            >
              Description
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor:
                activeButton === "Author" ? "#5A72A0" : "transparent",
              borderRadius: activeButton === "Author" ? 50 : 0,
            }}
            onPress={() => setActiveButton("Author")}
          >
            <Text
              style={{
                fontSize: 15,
                color: activeButton === "Author" ? "#FFF" : "#000",
                fontFamily: "Nunito_600SemiBold_Italic",
              }}
            >
              Author
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor:
                activeButton === "Reviews" ? "#5A72A0" : "transparent",
              borderRadius: activeButton === "Reviews" ? 50 : 0,
            }}
            onPress={() => setActiveButton("Reviews")}
          >
            <Text
              style={{
                fontSize: 15,
                color: activeButton === "Reviews" ? "#FFF" : "#000",
                fontFamily: "Nunito_600SemiBold_Italic",
              }}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {activeButton === "Description" && (
          <Description poemDetails={poemData} />
        )}

        {activeButton === "Author" && <Author authorDetails={poemData} />}

        {activeButton === "Reviews" && <Reviews reviewDetails={poemData} />}

        <View
          style={{
            marginHorizontal: 16,
            paddingVertical: 11,
            marginTop: -15,
          }}
        >
          {checkPurchased === true ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFF",
                alignItems: "center",
                marginHorizontal: 16,
                borderRadius: 10,
                padding: 10,
              }}
              onPress={() =>
                router.push({
                  pathname: "/(routes)/poem-access",
                  params: { poemData: JSON.stringify(poemData) },
                })
              }
            >
              <Text
                style={{
                  color: "#5A72A0",
                  fontWeight: "bold",
                  fontSize: 16,
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Start Reading
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#5A72A0",
                alignItems: "center",
                marginHorizontal: 16,
                borderRadius: 10,
                padding: 10,
                marginBottom: 30
              }}
              onPress={() => handleAddToCart()}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: 16,
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Add To Cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  detailSection: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    backgroundColor: "#839FC0",
    borderRadius: 50,
  },
  descriptionHeader: {
    color: "#839FC0",
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 900,
    paddingVertical: 4,
    marginHorizontal: 16,
    paddingTop: 10,
    fontFamily: "Nunito_600SemiBold_Italic",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  priceText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: 700,
    fontFamily: "Nunito_600SemiBold",
  },
  estimatedPrice: {
    fontSize: 18,
    fontWeight: 700,
    position: 'relative',
    bottom: 5,
    color: "#FE0000",
    paddingLeft: 6,
    fontFamily: "Nunito_600SemiBold",
    textDecorationLine: "line-through",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 8,
  },
});
