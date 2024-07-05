import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ReviewCard from '../card/review.card'

export default function Reviews({reviewDetails}: {reviewDetails: PoemsType}) {
  return (
    <View style={styles.reviewContainer}>
      <View style={{rowGap: 25}} >
         {reviewDetails?.reviews?.map((item:ReviewType, index: number) => 
              <ReviewCard item={item}
               key={index}
              />
         )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    reviewContainer: {
        marginHorizontal: 16,
        marginVertical: 25
    },

})