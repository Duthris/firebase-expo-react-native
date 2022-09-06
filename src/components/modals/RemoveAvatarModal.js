import { SafeAreaView, Text, StyleSheet } from "react-native";
import * as Paper from 'react-native-paper';
import { update } from "../../firebase";
import { setUserData } from "../../constants/utils";

export default function RemoveAvatarModal({ close }) {
    const handleRemoveAvatar = async () => {
        await update({
            photoURL: "https://i.hizliresim.com/52192xp.jpg"
        });
        setUserData();
        close();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Are you sure you want to remove your avatar?</Text>
            <Paper.Button
                mode="contained"
                onPress={handleRemoveAvatar}
                style={styles.button}
                icon="image-remove"
            >
                <Text style={styles.buttonText}>Remove Avatar</Text>
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
        margin: 45,

    },
    button: {
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: "center",
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
