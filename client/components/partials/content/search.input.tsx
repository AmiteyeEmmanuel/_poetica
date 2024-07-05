import { View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { searchStyles } from '@/styles/common/partial.styles';
import { AntDesign } from '@expo/vector-icons';

export default function SearchInput() {
    const [ fontsLoaded, fontError] = useFonts({
        Nunito_700Bold,
      });
    
      if(!fontsLoaded && !fontError) {
        return null;
      }
  return (
    <View style={searchStyles.filterContainer}>
       <View style={searchStyles.searchContainer}>
       <TextInput style={[searchStyles.input, {fontFamily: 'Nunito_700Bold'}]}
          placeholder='Search Poems'
          placeholderTextColor={'#C7C8CC'}
         />
         <TouchableOpacity style={searchStyles.searchIconContainer}>
            <AntDesign
             name='search1'
             size={23}
             color={'#C7C8CC'}
            />
         </TouchableOpacity>
       </View>
    </View>
  )
}