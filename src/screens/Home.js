import { StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { useSelector } from "react-redux";
import store from "../store";
import { openModal } from '../store/modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Paper from 'react-native-paper';
import { EMPTY_AVATAR_URL } from "@env";


export default function Home({ navigation }) {

    const user = useSelector(state => state.auth.user);

    const handleLogout = async () => {
        store.dispatch(openModal({
            name: 'logout-modal'
        }))
    }

    if (!user) {
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
                    <Image source={require('../../assets/native.png')} style={styles.logo} />
                    <Text style={styles.label}>Welcome to Native!</Text>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
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
                <Text>Welcome {user.displayName}</Text>
                {user.photoURL && user.photoURL !== EMPTY_AVATAR_URL && <Image source={{ uri: user.photoURL }} style={styles.avatar} />}
                <Text style={styles.name}>{user.displayName}</Text>
                <Text style={styles.email}>{user.email}</Text>
                {/* <TouchableOpacity
                onPress={handleSettings}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity> */}

                <Paper.Button
                    mode="contained"
                    onPress={handleLogout}
                    style={styles.button}
                    icon="logout"
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </Paper.Button>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 10,
        width: '80%',
        borderRadius: 5
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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 10
    },
    logo: {
        width: "100%",
        height: 100,
        marginBottom: 10,
        marginTop: 10,
        resizeMode: 'contain'
        
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'tomato'
    }
});