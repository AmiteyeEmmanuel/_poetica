import SearchInput from '@/components/partials/content/search.input'
import Header from '@/components/partials/header'
import HomeBannerSlider from '@/components/partials/home/home.banner.slider'
import Poems from '@/components/partials/content/poems'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native'


export default function HomeScreen() {
  return ( 
    <LinearGradient colors={["#EDEDED", "#FFFFFF"]}>
        <Header/>
        <ScrollView>
            <SearchInput/>
            <HomeBannerSlider/>
            <Poems/>
        </ScrollView>
      </LinearGradient>
  )
}