import { Image, Text, View } from 'react-native';
import { Nunito_400Regular, Nunito_400Regular_Italic, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { useFonts } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { onboardingSwiperData } from '@/constants/constants';
import { router } from 'expo-router';
import { commonStyles } from '@/styles/common/common.styles';
import { styles } from '@/styles/onboarding/onboarding';
import { Raleway_700Bold_Italic } from '@expo-google-fonts/raleway';

export default function WelcomePageScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular, 
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Raleway_700Bold_Italic
  });

  if (!fontsLoaded || fontError) {
    return null;
  }

  const renderItem = ({ item }: { item: onboardingSwiperDataType }) => (
    <LinearGradient
      colors={['#83B4FF', '#EEEEEE', '#DDDDD']}
      style={{ flex: 1, paddingHorizontal: 12 }}
    >
      <View style={{ marginTop: 80}}>
         <Image
           source={item.image}
           style={commonStyles.slideImage}
         />
         <Text style={[commonStyles.title, {fontFamily: 'Raleway_700Bold_Italic'}]}>
             {item.title}
         </Text>
         <View style={{ marginTop: 15}}>
             <Text style={[commonStyles.description, {fontFamily: 'Nunito_400Regular_Italic'}]}>
                  {item.description}
             </Text>
             <Text style={[commonStyles.shortdescription, {fontFamily: 'Nunito_400Regular_Italic'}]}>
                  {item.shortDescription}
             </Text>
         </View>
      </View>
    </LinearGradient>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        router.push('/signup');
      }}
      onSkip={() => {
        router.push('/signup');
      }}
      renderNextButton={() => (
        <View style={commonStyles.welcomeButton}>
          <Text style={[styles.buttonText, { fontFamily: 'Nunito_600SemiBold' }]}>
            Next
          </Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={commonStyles.welcomeButton}>
          <Text style={[styles.buttonText, { fontFamily: 'Nunito_600SemiBold' }]}>
            Done
          </Text>
        </View>
      )}
      showSkipButton={false}
      dotStyle={commonStyles.dotStyle}
      bottomButton={true}
      activeDotStyle={commonStyles.activeDotStyle}
    />
  );
}
