import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import Loader from "@/components/loader/loader";
import { LinearGradient } from "expo-linear-gradient";

export default function PoemScreen() {
  const [poems, setPoems] = useState<PoemsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    try {
      axios.get(`${SERVER_URI}/admin/get-layout/Categories`).then((res) => {
        setCategories(res.data.layout.categories);
        fetchPoems();
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const fetchPoems = () => {
    try {
      axios.get(`${SERVER_URI}/poems/get-poems`).then((res: any) => {
        setPoems(res.data.poems);
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCategories = (e: string) => {
    setActiveCategory(e);
    const filteredPoems = poems?.filter((item: PoemsType) => item.categories === e);
    console.log(filteredPoems);
  };
  

  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#83B4FF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
          style={{ flex: 1, paddingTop: 65 }}
        >
          <View style={{ padding: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor:
                    activeCategory === "All" ? "#5A72A0" : "#7D8ABC",
                  borderRadius: 50,
                  paddingHorizontal: 20,
                }}
                onPress={() => handleCategories("All")}
                key="All"
              >
                <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "600" }}>
                  All
                </Text>
              </TouchableOpacity>
              {categories?.map((item: any, index: number) => (
                <TouchableOpacity
                  key={item.title} 
                  style={{
                    padding: 10,
                    backgroundColor:
                      activeCategory === item?.title ? "#5A72A0" : "#7D8ABC",
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    marginHorizontal: 8,
                  }}
                  onPress={() => handleCategories(item?.title)}
                >
                  <Text
                    style={{ color: "#FFF", fontSize: 18, fontWeight: "600" }}
                  >
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{marginVertical :10}}>

          </View>
        </LinearGradient>
      )}
    </>
  );
}

const style = StyleSheet.create({});
