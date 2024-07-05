import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Raleway_700Bold_Italic, useFonts } from '@expo-google-fonts/raleway' 
import { Nunito_400Regular, Nunito_400Regular_Italic,  Nunito_700Bold } from '@expo-google-fonts/nunito'
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/onboarding/onboarding';
import { Poetica } from '@/assets';
import { router } from 'expo-router';


export default function OnBoardingScreen() {
  const [ fontsLoaded, fontError] = useFonts({
    Raleway_700Bold_Italic,
    Nunito_400Regular, 
    Nunito_400Regular_Italic,
    Nunito_700Bold
  });

  if(!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LinearGradient colors={['#83B4FF', '#EEEEEE']} 
    style={{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    }}>
       <View style={styles.firstContainer}>
         <View>
             <Image
              source={Poetica}
             style={styles.logo}/>
          </View>  
          <View style={styles.titleWrapper} >
            <Text style={[styles.titleText, {fontFamily: 'Raleway_700Bold_Italic'}]}> 
               Create and Explore With
            </Text>
          </View>

          <View>
                <Text style={[styles.titleText, {fontFamily: 'Raleway_700Bold_Italic'}]}>
                    Poetica
                </Text>
          </View>

          <View style={styles.dscpWrapper}>
            <Text style={[styles.dscpText, {fontFamily: 'Nunito_400Regular'}]}>
                The ultimate app for poetry enthusiasts!
            </Text>   

            <Text style={[styles.dscpText, {fontFamily: 'Nunito_400Regular_Italic', paddingHorizontal: 12} ]}>
              You can immerse yourself in the world of poetry by writing your own verses
            </Text>  
          </View>
          <TouchableOpacity style={styles.buttonWrapper}
           onPress={() => router.push('/(routes)/welcome-page')}
          >
              <Text style={[styles.buttonText,  {fontFamily: 'Nunito_700Bold'}]} >
                  Get Started →
              </Text>
          </TouchableOpacity>
       </View>
    </LinearGradient>
  )
}
