import { StyleSheet } from "react-native"
import { responsiveWidth as rw, responsiveHeight as rh } from "react-native-responsive-dimensions"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp

} from 'react-native-responsive-screen';


export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeButton: {
        backgroundColor: '#5A72A0',
        width: rw(88),
        height: rh(5.5),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        // marginHorizontal: 5
    },
    buttonContainer: {
        backgroundColor: '#5A72A0',
        width: rw(88),
        height: rw(2.5),
        borderRadius: 5,
        marginHorizontal: 5
    },
    dotStyle: {
        backgroundColor: '#5A72A0',
        width: rw(2.5),
        height: rw(2.5),
        borderRadius: 5,
        marginHorizontal: 5
    },
    activeDotStyle: {
        backgroundColor: '#1A2130',
        width: rw(2.5),
        height: rw(2.5),
        borderRadius: 5,
        marginHorizontal: 5
    },
    slideImage: {
        alignSelf: 'center',
        marginBottom: 30,
        width: wp('80%'),
        height: hp(40),
        borderRadius: 30

    },
    title: {
        fontSize: hp('3.5%'),
        textAlign: 'center'
    },
    description: {
        fontSize: hp('2.5%'),
        color: '#575757',
        textAlign: 'center'
    },
    shortdescription: {
        fontSize: hp('2.2%'),
        textAlign: 'center',
        color: '#575757',
        marginTop: 2
    },

    // login Page

    loginImage: {
        width: '30%',
        height: 120,
        alignSelf: 'center',
        marginTop: 120,
        borderRadius: 100
    },
    // loginImage: {
    //     textAlign: 'center', 
    //     justifyContent: 'center', 
    //     alignItems: 'center',
    //     marginTop: 100,
    //     borderRadius: 100,
    //     width: wp('60%'),
    //     alignSelf: 'center',
    // },
    loginText: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 10
    },
    loginParagraph: {
        textAlign: 'center',
        color: '#575757',
        fontSize: 18,
        marginTop: 6
    },
    inputContainer: {
         marginHorizontal: 10,
         marginTop: 30,
         rowGap: 30
    },
    input: {
        height: 55,
        marginHorizontal: 16,
        borderRadius: 8,
        paddingLeft: 40,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        color: '#1A1A1A'
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        position: 'absolute',
        top: 60
    },
    visibleIcon: {
        position: 'absolute',
        top: 33.8,
        right: 25
    },
    forgotSection: {
       marginHorizontal: 16,
       textAlign: 'right',
       fontSize: 14,
       marginTop: 2
    },
    signUpRedirect: {
        flexDirection: 'row',
        marginHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 15
    },
    uploadPhotoButton: {
        position: 'absolute', 
        right: 90 , 
        top: 253.8, 
        zIndex: 1, 
        padding: 10,
    }
})

