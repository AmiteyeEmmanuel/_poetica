import { View, Text, Image } from 'react-native'
import React from 'react'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { useFonts } from 'expo-font'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { bannerStyles } from '@/styles/common/banner.styles'
import Swiper from 'react-native-swiper'
import { bannerData } from '@/constants/bannerData'

export default function HomeBannerSlider() {
    const [ fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_700Bold,
        Nunito_400Regular
      });

      if(!fontsLoaded && !fontError) {
        return null;
      }

  return (
    <View style={bannerStyles.container}>
        <Swiper
          dotStyle={bannerStyles.dot}
          activeDotStyle={bannerStyles.activeDot}
          autoplay={true}
          autoplayTimeout={5}
        >
            {bannerData.map((item:BannerDataType, index: number) => (
                <View key={index}
                 style={bannerStyles.slide}
                >
                    <Image 
                      source={item.bannerImageUrl}
                      style={{width: 400, height: 215}}

                    />
                </View>
            ))}
        </Swiper>
    </View>
  )
}