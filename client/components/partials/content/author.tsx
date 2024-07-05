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

export default function Author({authorDetails}:{authorDetails: PoemsType}) {
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
      <View style={{marginBottom: 10}}>
      <Text style={[styles.infoTitle, {}]}>Author</Text>
      <Text>
          {authorDetails.user.username}
      </Text>
      </View>
      <Text style={styles.infoTitle}>Biography</Text>
      <Text>
          {authorDetails.bio}
      </Text>
      {authorDetails?.description.length > 302 && (
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
