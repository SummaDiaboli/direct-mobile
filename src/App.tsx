// import 'react-native-gesture-handler';
import React, { useCallback, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './views/HomeScreen'
import {
    ACTIVE_DEVICES,
    EDIT_PROFILE,
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
import ActiveDevicesScreen from './views/ActiveDevicesScreen'
import EditProfileScreen from './views/EditProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    // let loggedIn = false

    const getLogin = useCallback(
        async () =>
            await AsyncStorage.getItem('userData').then(userData => {
                if (userData !== null) {
                    setLoggedIn(true)
                    // console.log({userData, loggedIn, loading})
                    // console.log({loggedIn})
                } else {
                    setLoggedIn(false)
                }
                setLoading(false)
            }),
        [],
    )

    React.useEffect(() => {
        // console.log('loading', loading)
        getLogin()
        loading ? null : SplashScreen.hide()
    }, [loading])

    return (
        <NavigationContainer>
            {loading ? (
                <View></View>
            ) : (
                <Stack.Navigator
                    initialRouteName={loggedIn ? HOME : LOGIN}
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
                    <Stack.Screen
                        name={SETTINGS}
                        component={SettingsScreen}
                        options={{
                            headerShown: true,
                            headerStyle: { backgroundColor: '#383B3F' },
                            // headerTitleStyle: { color: 'white' },
                            headerTintColor: 'white',
                            animation: 'slide_from_right',
                        }}
                    />
                    <Stack.Screen
                        name={ACTIVE_DEVICES}
                        component={ActiveDevicesScreen}
                        options={{
                            headerShown: true,
                            headerStyle: { backgroundColor: '#383B3F' },
                            // headerTitleStyle: { color: 'white' },
                            headerTintColor: 'white',
                            animation: 'slide_from_right',
                        }}
                    />
                    <Stack.Screen
                        name={EDIT_PROFILE}
                        component={EditProfileScreen}
                        options={{
                            headerShown: true,
                            headerStyle: { backgroundColor: '#383B3F' },
                            // headerTitleStyle: { color: 'white' },
                            headerTintColor: 'white',
                            animation: 'slide_from_right',
                        }}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default App
