import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from "react-native-responsive-dimensions";
import { banner4 } from "@/assets";
import { FontAwesome } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import { router } from "expo-router";

type PoemCardProps = {
  item: any;
  index: number;
};

export default function PoemCard({ item, index }: PoemCardProps) {
  const [fontLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
  });

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      key={index}
      onPress={() =>
        router.push({
          pathname: "/(routes)/poem-details",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <View>
        <Image style={styles.img} source={{uri: item.thumbnail?.url}} />
      </View>
      <View
        style={{
          width: wp(85),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            fontWeight: "800",
            marginTop: 10,
            fontFamily: "Raleway_600SemiBold",
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            position: "relative",
            backgroundColor: "#5A72A0",
            padding: 4,
            borderRadius: 10,
            gap: 6,
            left: 35,
          }}
        >
          <FontAwesome name="star" size={20} color={"#F4CE14"} />
          <Text style={{ fontSize: 18, color: "#fff" }}> {item.rating}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 4,
            height: 28,
            marginTop: 2,
          }}
        >
          <Text style={[styles.priceText, { fontSize: 20, fontWeight: 800 }]}>
            {" "}
            ${item?.price}{" "}
          </Text>
          <Text
            style={{
              position: "relative",
              bottom: 10,
              left: 4,
              fontSize: 20,
              textDecorationLine: "line-through",
              fontWeight: "800",
            }}
          >
            ${item.estimatedPrice}
          </Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 800, marginTop: 10 }}>
          {item.purchased} Sales
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    width: rw(100),
    marginHorizontal: 6,
    marginVertical: 15,
    marginTop: -15,
    overflow: "hidden",
  },
  img: {
    height: 200,
    width: wp(95),
    borderRadius: 5,
    alignSelf: "center",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 4,
    width: 55,
    height: 28,
  },
  priceText: {
    fontSize: 20,
  },
});
