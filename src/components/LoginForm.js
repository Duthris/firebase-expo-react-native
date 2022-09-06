import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import * as Paper from 'react-native-paper';
import store from "../store";
import { openModal } from '../store/modal';
import { useNavigation } from "@react-navigation/native";

export default function LoginForm({ handleSubmit, noEmail = false }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const navigation = useNavigation();

    const handle = (e) => {
        handleSubmit(e, email, password);
    }

    const handleResetPassword = () => {
        store.dispatch(openModal({
            name: 'forgot-password-modal'
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            {!noEmail && (
                <>
                    <Text style={styles.label}>Email</Text>
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
                        left={
                            <Paper.TextInput.Icon
                                name="email"
                                style={{ marginTop: 15 }}
                            />
                        }
                    />
                </>
            )}


            {noEmail && <Text style={styles.error}>Please confirm your current password to change your password!</Text>}

            <Text style={styles.label}>Password</Text>
            <Paper.TextInput
                label='Password'
                placeholder='******'
                value={password}
                onChangeText={text => setPassword(text)}
                minLength={3}
                style={styles.input}
                theme={styles.inputColor}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                mode='outlined'
                secureTextEntry={secureTextEntry}
                right={
                    <Paper.TextInput.Icon
                        name={secureTextEntry ? "eye" : "eye-off"}
                        onPress={() => {
                            setSecureTextEntry(!secureTextEntry)
                            return false;
                        }}
                        style={{ marginTop: 15 }}
                    />
                }

                left={
                    <Paper.TextInput.Icon
                        name="lock"
                        style={{ marginTop: 15 }}
                    />
                }
            />

            <Paper.Button
                mode="contained"
                onPress={handle}
                style={{
                    opacity: noEmail ? !password ? 0.5 : 1 : !password || !email ? 0.5 : 1,
                    backgroundColor: 'tomato',
                    marginTop: 15,
                    marginBottom: 5
                }}
                disabled={noEmail ? !password : !email || !password}
                icon="login"
            >
                <Text style={styles.buttonText}>{noEmail ? 'Confirm' : 'Login'}</Text>
            </Paper.Button>

            {!noEmail && (
                <>

                    <TouchableOpacity
                        onPress={handleResetPassword}
                    >
                        <Text style={styles.resetText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.signUpText}>Don't have an account? Sign Up!</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    input: {
        width: '80%',
        height: 50,
    },
    inputColor: {
        colors: {
            primary: 'tomato',
            placeholder: '#ccc',
            text: '#000',
        }
    },
    button: {
        backgroundColor: 'tomato',
        marginTop: 15,
        marginBottom: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        fontSize: 20,
        margin: 10,
        color: 'red',
    },
    error: {
        margin: 10,
        fontSize: 15,
        color: 'red',
        borderWidth: 2,
        borderColor: 'red',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    label: {
        fontSize: 15,
        margin: 5,
        fontWeight: 'bold'
    },
    resetText: {
        fontSize: 15,
        margin: 5,
        fontWeight: '500',
        color: '#039BE5'
    },
    signUpText: {
        fontSize: 15,
        margin: 5,
        fontWeight: '500',
        color: 'tomato'
    }


});