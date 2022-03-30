// import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './views/HomeScreen'
import {
    HOME,
    LOGIN,
    MAGIC,
    RootStackParamList,
    SETTINGS,
    SIGNUP,
} from './utils/routes'
import Login from './views/LoginScreen'
import SignUpScreen from './views/SignUpScreen'
import MagicCodeScreen from './views/MagicCodeScreen'
import SettingsScreen from './views/SettingsScreen'
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
    React.useEffect(() => {
        SplashScreen.hide()
    })

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={LOGIN}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={HOME}
                    component={Home}
                    options={{ animation: 'fade' }}
                />
                <Stack.Screen
                    name={LOGIN}
                    component={Login}
                    options={{ animation: 'slide_from_bottom' }}
                />
                <Stack.Screen
                    name={SIGNUP}
                    component={SignUpScreen}
                    options={{ animation: 'slide_from_bottom' }}
                />
                <Stack.Screen
                    name={MAGIC}
                    component={MagicCodeScreen}
                    options={{ animation: 'slide_from_bottom' }}
                />
                <Stack.Screen name={SETTINGS} component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
