import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { logout } from "../../firebase";
import { logout as logoutHandle } from "../../store/auth";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Paper from 'react-native-paper';


export default function LogoutModal({ close }) {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const handleLogout = async () => {
        await logout();
        dispatch(logoutHandle());
        close();
        navigation.navigate('Main');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Are you sure you want to logout?</Text>
            <Paper.Button
                mode="contained"
                onPress={handleLogout}
                style={styles.button}
                icon="logout"
            >
                <Text style={styles.buttonText}>Logout</Text>
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
        margin: 80,

    },
    button: {
        backgroundColor: 'tomato',
        marginTop: 15,
        marginBottom: 5
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    label: {
        fontSize: 15,
        margin: 5,
        fontWeight: "500"
    }

});
