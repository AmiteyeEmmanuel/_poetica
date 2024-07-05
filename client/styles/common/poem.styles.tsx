import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp

} from 'react-native-responsive-screen';

export const poemStyles = StyleSheet.create({
    wrapper: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 22,
        fontWeight: 700
    },
    text: {
        fontSize: 16,
        textDecorationLine: 'underline',
        fontWeight: 800,
        color: '#5776AD'

    },
    sliderWrapper: {
        marginTop: 12,
        height: hp("35%"),
        marginHorizontal: 16 
    }
})