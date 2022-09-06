import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { register } from '../firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Paper from 'react-native-paper';
import { generateRandomName } from '../constants/utils';

export default function Register({ navigation }) {

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(displayName, email, password);
    }

    const passwordsAreNotEqual = () => {
        return password !== confirmPassword;
    }

    const handleRandomName = () => {
        setDisplayName(generateRandomName());
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            scrollToOverflowEnabled={true}
            keyboardShouldPersistTaps='handled'
            enableAutomaticScroll={true}
            scrollEnabled={true}
            style={{ marginBottom: 100 }}
            showsVerticalScrollIndicator={true}
            bounces={false}
            enableResetScrollToCoords={false}
            resetScrollToCoords={{ y: 0, x: 0 }}
            keyboardOpeningTime={0}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.label}>Display Name</Text>
                <Paper.TextInput
                    label='Display Name'
                    placeholder='John Doe'
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    minLength={3}
                    style={styles.input}
                    theme={styles.inputColor}
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                    mode='outlined'
                    left={
                        <Paper.TextInput.Icon
                            name="account"
                            style={{ marginTop: 15 }}
                        />
                    }
                    right={

                        <Paper.TextInput.Icon
                            name="refresh"
                            style={{ marginTop: 15 }}
                            onPress={handleRandomName}
                        />
                    }
                />

                <Text style={styles.label}>E-mail</Text>
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

                {passwordsAreNotEqual() && <Text style={styles.error}>Passwords do not match!</Text>}
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

                <Text style={styles.label}>Confirm Password</Text>
                <Paper.TextInput
                    label='Confirm Password'
                    placeholder='******'
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
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
                    onPress={handleSubmit}
                    style={{
                        opacity: passwordsAreNotEqual() || !displayName || !email || !password || !confirmPassword ? 0.5 : 1,
                        backgroundColor: 'tomato',
                        marginTop: 15,
                        marginBottom: 5
                    }}
                    disabled={!displayName || !email || !password || !confirmPassword || passwordsAreNotEqual()}
                    icon="account-edit"
                >
                    <Text style={styles.buttonText}>Register</Text>
                </Paper.Button>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginText}>Already have an account?</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
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
        padding: 12,
        margin: 12,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        fontSize: 15,
        margin: 5,
        fontWeight: 'bold'
    },
    error: {
        color: 'red',
        margin: 10,
        fontSize: 15,
        borderWidth: 2,
        borderColor: 'red',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    textInputOutlineStyle: {
        colors: {
            placeholder: 'white',
            text: 'white', primary: 'white',
            underlineColor: 'transparent',
            background: '#0f1a2b'
        }
    },
    loginText: {
        color: '#039BE5',
        fontSize: 15,
        margin: 5,
        fontWeight: 'bold',
    }

});