import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    ACTIVE_DEVICES,
    EDIT_PROFILE,
    RootStackParamList,
} from '../utils/routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

type Button = {
    name: string
    icon: string
    tip?: string
    isActive?: boolean
    onClick: () => void
}

const SettingsScreen: React.FC<Props> = ({ navigation, route }: Props) => {
    const [isBiometricsActive, setIsBiometricsActive] = useState(false)
    const [isPinActive, setIsPinActive] = useState(false)
    const [isMultiAccessActive, setIsMultiAccessActive] = useState(false)
    // console.log(route.params.data)

    const accountButtons: Button[] = [
        {
            name: 'Edit Account',
            icon: 'pencil',
            onClick: () => {
                navigation.navigate(EDIT_PROFILE, { data: route.params.data })
            },
        },
        {
            name: 'Active Devices',
            icon: 'phone-portrait',
            onClick: () => {
                navigation.navigate(ACTIVE_DEVICES)
            },
        },
        {
            name: 'Log Out',
            icon: 'log-out',
            onClick: () => {
                AsyncStorage.removeItem('userData')
                navigation.navigate('Login')
            },
        },
    ]

    const securityTuttons: Button[] = [
        {
            name: 'Biometrics',
            tip: 'Use biometric authentication (fingerprint or face recognition) to unlock the app',
            icon: '',
            isActive: isBiometricsActive,
            onClick: () => {
                setIsBiometricsActive(!isBiometricsActive)
            },
        },
        {
            name: 'Pin',
            tip: 'Use a pin as your primary protection method',
            icon: '',
            isActive: isPinActive,
            onClick: () => {
                setIsPinActive(!isPinActive)
            },
        },
        {
            name: 'Multi-Device Access',
            tip: 'Remain logged in on multiple devices at the same time',
            icon: '',
            isActive: isMultiAccessActive,
            onClick: () => {
                setIsMultiAccessActive(!isMultiAccessActive)
            },
        },
    ]

    const miscButtons: Button[] = [
        {
            name: 'About Direct Security',
            tip: 'Version 1-alpha',
            icon: '',
            onClick: () => {},
        },
    ]

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>Account</Text>
                    <View style={{ marginTop: '5%' }}>
                        {accountButtons.map((button, index) => (
                            <Pressable
                                onPress={button.onClick}
                                key={index + button.name}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? '#A6A6A6'
                                            : '#C4C4C4',
                                        elevation: pressed ? 2 : 0,
                                    },
                                    styles.button,
                                ]}>
                                <Text style={{ color: 'black' }}>
                                    {button.name}
                                </Text>
                                <Ionicon
                                    name={button.icon}
                                    size={25}
                                    color={'#383B3F'}
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>Security</Text>
                    <View style={{ marginTop: '5%' }}>
                        {securityTuttons.map((button, index) => (
                            <Pressable
                                onPress={button.onClick}
                                key={index + button.name}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? '#A6A6A6'
                                            : '#C4C4C4',
                                        elevation: pressed ? 2 : 0,
                                    },
                                    styles.button,
                                ]}>
                                <View style={{ width: '83%' }}>
                                    <Text style={{ color: 'black' }}>
                                        {button.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '400',
                                            fontStyle: 'italic',
                                        }}>
                                        {button.tip}
                                    </Text>
                                </View>
                                <Switch
                                    value={button.isActive}
                                    onValueChange={button.onClick}
                                    trackColor={{
                                        true: '#383B3F',
                                        false: '#A6A6A6',
                                    }}
                                    thumbColor={
                                        button.isActive ? 'white' : '#383B3F'
                                    }
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>Security</Text>
                    <View style={{ marginTop: '5%' }}>
                        {miscButtons.map((button, index) => (
                            <Pressable
                                onPress={button.onClick}
                                key={index + button.name}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? '#A6A6A6'
                                            : '#C4C4C4',
                                        elevation: pressed ? 2 : 0,
                                    },
                                    styles.button,
                                ]}>
                                <View style={{ width: '83%' }}>
                                    <Text style={{ color: 'black' }}>
                                        {button.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '400',
                                            fontStyle: 'italic',
                                        }}>
                                        {button.tip}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '7%',
        paddingVertical: '5%',
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 18,
        color: 'black',
    },
    button: {
        marginBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default SettingsScreen
