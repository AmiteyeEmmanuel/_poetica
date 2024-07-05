import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  Raleway_400Regular,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_500Medium,
  Nunito_600SemiBold_Italic,
} from "@expo-google-fonts/nunito";
import { useLocalSearchParams } from "expo-router";

export default function Description({poemDetails}: {poemDetails: PoemsType}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [fontLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular,
    Nunito_600SemiBold_Italic,
    Nunito_500Medium,
  });

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoTitle}>Poem Description</Text>
      <Text>
        {isExpanded
          ? poemDetails.description
          : poemDetails?.description.slice(0, 302)}
      </Text>
      {poemDetails?.description.length > 302 && (
         <TouchableOpacity
           style={{marginTop: 3}}
           onPress={() => setIsExpanded(!isExpanded)}
         >
            <Text style={styles.expandedText}>
                { isExpanded ? "show Less" : "Show More"}
                { isExpanded ? "-" : "+" }
            </Text>
         </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginHorizontal: 16,
    marginVertical: 25,
    paddingHorizontal: 10
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
  },
  infoDescription: {
    color: "#525258",
    fontSize: 16,
    marginTop: 10,
    textAlign: "justify",
    fontFamily: "Nunito_500Medium",
  },
    expandedText: {
        color: '#5A72A0',
        fontSize: 14
    }
});
