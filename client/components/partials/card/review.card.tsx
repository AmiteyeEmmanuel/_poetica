import { loginUser } from "@/assets";
import Ratings from "@/utils/ratings";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Image, Text, View } from "react-native";

export default function ReviewCard({ item }: { item: ReviewType }) {
  const [fontLoaded, fontError] = useFonts({
    Raleway_700Bold,
  });

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 100 }}
        source={{
          uri:
            item.user?.photo ||
            "https://res.cloudinary.com/dtdmwqrwx/image/upload/v1719348069/user_qcltb9.png",
        }}
      />
      <View style={{ marginHorizontal: 8, flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontFamily: "Raleway_700Bold" }}>
                {item.user.username}
              </Text>

              <View>
                  <Ratings 
                    rating={item.rating}
                  />
              </View>
              <Text style={{
                fontSize: 16,
                paddingVertical: 5,
                paddingHorizontal: 3
              }}>
                {item.comment}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
