import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import Loader from "@/components/loader/loader";

export default function PoemAccessScreen() {
  const [loading, setLoading] = useState(true);
  const { poemData } = useLocalSearchParams();
  const [contentData, setContentData] = useState<PoemDataType[]>([]);  
  const [activeData, setActiveData] = useState(0);
  const data: PoemsType = JSON.parse(poemData as string);

  

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      await axios.get(`${SERVER_URI}/poems/get-poem-content/${data._id}`, {
          headers: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        })
        .then((res: any) => {
          console.log(res.data.content);
        })
        .catch((error) => {
          setLoading(false);
        //   router.push("/(routes)/poem-details");
        });
    };
      subscription();
  }, []);

  return (
    <>
        <ScrollView
          stickyHeaderIndices={[0]}
          style={{ flex: 1, padding: 10 }}
        >
            <View style={{padding: 10}}>
                 <Text>
                     {contentData[activeData]?.content}
                 </Text>
            </View>
        </ScrollView>
    
    </>
  );
}
