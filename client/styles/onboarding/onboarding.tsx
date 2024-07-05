import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp

} from 'react-native-responsive-screen';



export const styles = StyleSheet.create({
    firstContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    logo: {
        width: wp('23%'),
        height: hp('10%'),
        borderRadius: 30
    },
    titleWrapper: {
        flexDirection: 'row'
    },
    titleImage1: {
        position: 'absolute',
        top: -20,
        left:  -20
    },
    titleText: {
        fontSize: hp('3%'),
        marginTop: 10,
        textAlign: 'center'
    },
    titleTextShape2: {
        position: 'absolute',
        right: -40,
        top: -20,
    },
    titleShape3: {
        position: 'absolute',
        left: 60,
    },
    dscpWrapper: {
        marginTop: 30
    },
    dscpText: {
        textAlign: 'center',
        color: '#575757',
        fontSize: hp('2.2%')
    },
    buttonWrapper: {
        backgroundColor: '#5A72A0',
        width: wp('82%'),
        paddingVertical: 18,
        borderRadius: 15,
        marginTop: 40,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center'
    }

})