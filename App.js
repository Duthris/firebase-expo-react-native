import "./src/constants/ignoreWarnings";
import { StyleSheet } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store';
import ModalOpen from './src/constants/ModalOpen';
import NavBar from './src/components/layouts/NavBar';
import { Provider as PaperProvider } from 'react-native-paper';
import Splash from './src/constants/Splash';
import Onboarding from './src/components/Onboarding';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name='Main'
              component={NavBar}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name='Onboarding'
              component={Onboarding}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <Toast />
          <ModalOpen />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
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
    backgroundColor: '#000',
    padding: 12,
    margin: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
