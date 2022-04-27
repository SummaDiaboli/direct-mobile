import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabParamList, RootStackParamList } from '../../utils/routes'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { UserDataContext } from '../../contexts/UserDataContext'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import HistoryTab from './HistoryTab'
import HomeTab from './HomeTab'
import Ionicon from 'react-native-vector-icons/Ionicons'
import QRTab from './QRTab'

// import { createDrawerNavigator } from '@react-navigation/drawer'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
const Tab = createBottomTabNavigator<BottomTabParamList>()
// const Drawer = createDrawerNavigator()

type UserData = {
    username: string
    email: string
    id: string
}

const HomeScreen: React.FC<Props> = ({ route }: Props) => {
    const [username, setUsername] = useState(
        route.params?.data ? route.params.data.username : '',
    )
    const [email, setEmail] = useState(
        route.params?.data ? route.params.data.email : '',
    )
    const [id, setId] = useState(
        route.params?.data ? route.params.data.id : '',
    )

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData')
            const userData: UserData = value !== null ? JSON.parse(value) : null
            setUsername(userData.username ?? '')
            setEmail(userData.email ?? '')
            setId(userData.id ?? '')
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getData()
        // getData()
    }, [])

    return (
        <UserDataContext.Provider
            value={{
                // username: route.params.data.username,
                // email: route.params.data.email,
                // id: route.params.data.id,
                username,
                email,
                id,
            }}>
            {/* <Drawer.Navigator> */}
            <Tab.Navigator
                initialRouteName="HomeTab"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        paddingBottom: 4,
                        paddingTop: 4,
                        backgroundColor: '#383B3F',
                        minHeight: '9%',
                    },
                    tabBarShowLabel: false,
                }}>
                <Tab.Screen
                    name="HomeTab"
                    component={HomeTab}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            let iconName = focused ? 'home' : 'home-outline'

                            return (
                                <Ionicon
                                    name={iconName}
                                    size={24}
                                    color={'white'}
                                />
                            )
                        },
                        tabBarLabelStyle: { color: 'white', fontSize: 12 },
                        tabBarLabel: 'Home',
                    }}
                />

                <Tab.Screen
                    name="QRTab"
                    component={QRTab}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            let iconName = focused
                                ? 'qr-code'
                                : 'qr-code-outline'

                            return (
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 30,
                                        height: 60,
                                        width: 60,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Ionicon
                                        name={iconName}
                                        size={35}
                                        color="black"
                                    />
                                </View>
                            )
                        },
                        tabBarLabel: 'Scan QR Code',
                    }}
                />

                <Tab.Screen
                    name="HistoryTab"
                    component={HistoryTab}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            let iconName = focused ? 'time' : 'time-outline'

                            return (
                                <Ionicon
                                    name={iconName}
                                    size={24}
                                    color={'white'}
                                />
                            )
                        },
                        tabBarLabelStyle: { color: 'white', fontSize: 12 },
                        tabBarLabel: 'History',
                    }}
                />
            </Tab.Navigator>
            {/* </Drawer.Navigator> */}
        </UserDataContext.Provider>
    )
}

export default HomeScreen
