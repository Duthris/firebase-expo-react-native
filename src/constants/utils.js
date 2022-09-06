import store from "../store";
import { closeModal, openModal } from "../store/modal";
import { login } from "../store/auth";
import { auth } from "../firebase";
import Toast from 'react-native-toast-message'
import { View, Dimensions } from "react-native";
import { uniqueNamesGenerator, starWars, adjectives, colors, animals } from "unique-names-generator";

export const setUserData = () => {
    store.dispatch(login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid
    }))
}

export const modalOpen = (name, data = false) => {
    store.dispatch(openModal({
        name,
        data
    }))
}

export const modalClose = () => {
    store.dispatch(closeModal());
}

export const showToast = (message, type, position) => {
    return Toast.show({
        text1: message,
        type: type,
        position: position,
    })
}

export function EmptyScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        </View>
    );
}

export function getWidth() {
    let width = Dimensions.get('window').width;

    width = width - 60;

    return width / 5;
}

export function generateRandomName() {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, animals, starWars, colors],
        length: 2,
        style: 'capital',
        separator: ' '
    })
}