import { SafeAreaView, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { setUserData, generateRandomName } from "../constants/utils";
import { update, updatePass, verify, uploadImage, storage } from "../firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Paper from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref } from "firebase/storage";
import { EMPTY_AVATAR_URL } from "@env";

export default function Settings({ navigation }) {
    const user = useSelector(state => state.auth.user);
    const [displayName, setDisplayName] = useState(user.displayName || "");
    const [avatar, setAvatar] = useState(user.photoURL || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await update({
            displayName,
            photoURL: avatar
        });
        setUserData();
    }

    const handleRemoveAvatar = async () => {
        // store.dispatch(openModal({
        //     name: 'remove-avatar-modal',
        // }))
        setUserData();
        setAvatar(EMPTY_AVATAR_URL);
    }

    const handleUpdatePass = async (e) => {
        e.preventDefault();
        const result = await updatePass(password);
        if (result) {
            setPassword("");
            setConfirmPassword("");
        }
    }

    const handleVerification = async () => {
        await verify();
    }

    const pickAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            await setAvatarURL(result.uri);
        }
    }

    const setAvatarURL = async (pickedAvatar) => {
        const imageName = `${user.uid}_${user.displayName}_avatar`;
        const storageRef = ref(storage, `images/${imageName}`);
        await uploadImage(pickedAvatar, imageName).then(() => {
            getDownloadURL(storageRef).then(url => {
                setAvatar(url);
            }
            ).catch((error) => {
                console.log(error);
            })
        })
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
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    {!user.emailVerified &&
                        <>
                            <Text style={styles.warning}>
                                You need to verify your email address before you can change your settings.
                            </Text>

                            <Paper.Button
                                mode="contained"
                                onPress={handleVerification}
                                style={styles.button}
                                icon="email-check"
                            >
                                <Text style={styles.buttonText}>Send me a verification mail</Text>
                            </Paper.Button>
                        </>
                    }

                    {user.emailVerified &&
                        <>
                            <Text style={styles.title}>Display Name</Text>
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

                            <Text style={styles.title}>Avatar</Text>
                            {avatar && avatar !== EMPTY_AVATAR_URL &&
                                <TouchableOpacity onPress={pickAvatar}>
                                    <Image source={{ uri: avatar }} style={styles.avatar} />
                                </TouchableOpacity>
                            }

                            <Paper.TextInput
                                label='Choose an avatar or paste a link...'
                                placeholder='https://example.com/avatar.png'
                                onChangeText={text => setAvatar(text)}
                                style={styles.input}
                                value={avatar === EMPTY_AVATAR_URL ? '' : avatar}
                                theme={styles.inputColor}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                mode='outlined'
                                left={
                                    <Paper.TextInput.Icon
                                        name="image-move"
                                        style={{ marginTop: 15 }}
                                        onPress={pickAvatar}
                                    />
                                }
                                right={
                                    <Paper.TextInput.Icon
                                        name="image-remove"
                                        style={{ marginTop: 15 }}
                                        onPress={handleRemoveAvatar}
                                    />
                                }
                            />



                            <Paper.Button
                                mode="contained"
                                onPress={handleSubmit}
                                style={{
                                    opacity: !displayName && !avatar ? 0.5 : 1,
                                    backgroundColor: 'tomato',
                                    marginTop: 15,
                                    marginBottom: 5
                                }}
                                disabled={!displayName && !avatar}
                                icon="content-save-edit"
                            >
                                <Text style={styles.buttonText}>Update</Text>
                            </Paper.Button>


                            {password !== confirmPassword &&
                                <Text style={styles.warning}>
                                    Passwords do not match!
                                </Text>
                            }

                            <Text style={styles.title}>Password</Text>
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

                            <Text style={styles.title}>Confirm Password</Text>
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
                                onPress={handleUpdatePass}
                                style={{
                                    opacity: !password && !confirmPassword || password !== confirmPassword ? 0.5 : 1,
                                    backgroundColor: 'tomato',
                                    marginTop: 15,
                                    marginBottom: 5
                                }}
                                disabled={!password && !confirmPassword || password !== confirmPassword}
                                icon="content-save-edit"
                            >
                                <Text style={styles.buttonText}>Update Password</Text>
                            </Paper.Button>
                        </>
                    }
                </SafeAreaView>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
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
    title: {
        fontSize: 15,
        margin: 5,
        fontWeight: 'bold'
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
    warning: {
        margin: 10,
        fontSize: 15,
        color: 'red',
        borderWidth: 2,
        borderColor: 'red',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 10
    }
});