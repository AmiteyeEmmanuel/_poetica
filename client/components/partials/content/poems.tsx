import { Dimensions, View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { poemStyles } from "@/styles/common/poem.styles";
import Carousel from "react-native-reanimated-carousel";
import {
  Raleway_700Bold,
  Raleway_400Regular_Italic,
} from "@expo-google-fonts/raleway";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import PoemCard from "../card/poem.card";
import { Nunito_600SemiBold_Italic } from "@expo-google-fonts/nunito";



export default function Poems() {
  const width = Dimensions.get("window").width;
  const [poems, setPoems ] = useState<PoemsType>();
  const [loading, setLoading] = useState();

  useEffect(() => {
     try {
         axios.get(`${SERVER_URI}/poems/get-poems`)
         .then((res:any) => {
            setPoems(res.data.poems);
         })
     } catch (error: any) {
        console.log(error);
     }
  }, [])
 

  const [ isVertical ] = useState(false);
  const [pagingEnabled ] = useState(true);
  const [ snapEnabled ] = useState(true);
  const progressValue = useSharedValue(0);
  const baseOptions : any = isVertical
    ? {
        vertical: true,
      }
    : {
        vertical: false,
        width: width,
        height: width * 1,
      };
  const [fontsLoaded, fontError] = useFonts({
    Raleway_400Regular_Italic,
    Nunito_600SemiBold_Italic,
    Raleway_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={{ flex: 1, marginHorizontal: 16, marginTop: -50 }}>
      <View style={poemStyles.wrapper}>
        <Text
          style={[poemStyles.headerText, { fontFamily: "Raleway_700Bold" }]}
        >
          Trending Now
        </Text>

        <TouchableOpacity onPress={() => router.push("/(tabs)/poems")}>
          <Text
            style={[
              poemStyles.text,
              { fontFamily: "Nunito_600SemiBold_Italic" },
            ]}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[poemStyles.sliderWrapper]}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Carousel
            {...baseOptions}
            style={{
              width: width,
            }}
            loop
            pagingEnabled={pagingEnabled}
            snapEnabled={snapEnabled}
            autoPlayInterval={1500}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress)
            }
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            data={poems}
            renderItem={({ item, index }) => (
              <PoemCard item={item} index={index} />
            )}
          />
          {!!progressValue && (
            <View
              style={
                isVertical
                  ? {
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: 10,
                      alignSelf: "center",
                      position: "absolute",
                      right: 5,
                      top: 40,
                    }
                  : {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 100,
                      alignSelf: "center",
                    }
              }
            ></View>
          )}
        </View>
      </View>
    </View>
  );
}
