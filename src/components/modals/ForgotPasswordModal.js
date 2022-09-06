import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { resetPassword } from "../../firebase";
import { useNavigation } from '@react-navigation/native';
import * as Paper from 'react-native-paper';
import { useState } from "react";


export default function ForgotPasswordModal({ close }) {

    const [email, setEmail] = useState("");

    const navigation = useNavigation();

    const handleResetPassword = async () => {
        const result = await resetPassword(email);
        close();
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Forgot your password?</Text>
            <Paper.TextInput
                label='E-mail'
                placeholder='example@example.com'
                value={email}
                onChangeText={text => setEmail(text)}
                minLength={3}
                style={styles.input}
                theme={styles.inputColor}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                mode='outlined'
            />

            <Paper.Button
                mode="contained"
                onPress={handleResetPassword}
                style={{
                    opacity: !email ? 0.5 : 1,
                    backgroundColor: 'tomato',
                    marginTop: 15,
                    marginBottom: 5,
                    borderRadius: 4,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}
                disabled={!email}
                icon="email-fast"
            >
                <Text style={styles.buttonText}>Send me reset password mail</Text>
            </Paper.Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,

    },
    button: {
        backgroundColor: "tomato",
        padding: 8,
        margin: 12,
        marginTop: 20,
        borderRadius: 4,
        height: 40,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 15,
    },
    label: {
        fontSize: 15,
        margin: 10,
        fontWeight: "600"
    },
    input: {
        width: "80%",
        height: 50,
    },
    inputColor: {
        colors: {
            primary: 'tomato',
            placeholder: '#ccc',
            text: '#000',
        }
    }


});
