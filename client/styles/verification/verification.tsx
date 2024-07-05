import { StyleSheet } from "react-native";


export const verificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFF'
    },
    headerText: {
        fontSize: 25,
        fontWeight: '800',
        marginBottom: 10
    },
    subText: {
        fontSize: 16,
        color: '#5A72A0',
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    inputBox: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        textAlign: 'center',
        marginRight: 10,
        borderRadius: 10,
        fontSize: 22
    }
})