import { StyleSheet } from "react-native";
import { responsiveWidth as rw, responsiveHeight as rh } from "react-native-responsive-dimensions"


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    resetImage: {
        width: '29%',
        height: 100,
        alignSelf: 'center',
        marginTop: 40,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        paddingHorizontal: 15

    },
    button: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#5A72A0',
        width: rw(88),
        height: rw(12),
        marginHorizontal: 5,
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16
    },
    loginLink: {
        flexDirection: 'row',
        marginTop: 30
    },
    loginText: {
        color: '#5A72A0',
        marginLeft: 5,
        fontSize: 16
    },
    backText: {
        fontSize: 16
    }
})