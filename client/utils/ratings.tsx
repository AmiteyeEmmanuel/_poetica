import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type rating = {
  rating: any;
};

export default function Ratings({ rating }: rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <FontAwesome key={i} name="star" size={18} color={"#f6ba00"} />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <FontAwesome key={i} name="star-half-full" size={18} color={"#f6ba00"} />
      );
    } else {
      stars.push(
        <FontAwesome key={i} name="star-o" size={18} color={"#f6ba00"} />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {stars}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 2,
    gap: 2
  },
  starsContainer: {
    flexDirection: 'row',
  },
});
