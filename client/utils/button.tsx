import { Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { commonStyles } from '@/styles/common/common.styles'

export default function Button({title, onPress}:{title:string, onPress: () => void}) {
    const {width} = Dimensions.get('window');
  return (
    <TouchableOpacity 
        style={[
        commonStyles.buttonContainer, 
        {height: 45,
         width: width * 1 - 100,
         alignItems: 'center', 
         flexDirection: 'row', 
         justifyContent: 'center'
        }]}
        onPress={() => onPress()}
    >
        <Text 
          style={{
            color: '#FFF', 
            fontSize: 20, 
            fontWeight: 600
            }} > 
            {title}
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})