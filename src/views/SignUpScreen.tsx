import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/routes'
import axios, { AxiosResponse } from 'axios'

type Props = NativeStackScreenProps<RootStackParamList, 'Sign Up'>
type Response = {
    id: string
    message: string
    email: string
    username: string
}

const SignUpScreen: React.FC<Props> = ({ navigation }: Props) => {
    const logo = require('../assets/images/Icon_Logo.png')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    // const [errorText, setErrorText] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const alreadyHaveAccountPressed = () => {
        navigation.navigate('Login')
    }

    const signUp = () => {
        if (username.length > 0 && email.length > 0) {
            setIsLoading(true)
            axios
                .post(
                    'http://10.3.128.231:8080/api/users',
                    {
                        username,
                        email, // "website": "Direct Security Official"
                    },
                    {
                        headers: {
                            Referer: 'Direct Mobile',
                        },
                    },
                )
                .then((res: AxiosResponse<Response, Response>) => {
                    if (res.status === 201) {
                        // navigator(`${Routes.SIGNUP}/${res.data.id}`);
                        console.log(res.data)
                        navigation.navigate('Magic Code', { id: res.data.id })
                        setIsLoading(false)
                        setIsError(false)
                        setUsernameError(false)
                        setEmailError(false)
                    }
                })
                .catch(err => {
                    console.error(err)
                    setIsLoading(false)
                    setIsError(true)
                })
        } else {
            setIsError(true)
            if (username.length === 0) {
                setUsernameError(true)
            } else {
                setUsernameError(false)
            }

            if (email.length === 0) {
                setEmailError(true)
            } else {
                setEmailError(false)
            }
        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#383B3F' }}>
            <SafeAreaView style={styles.container}>
                <Image source={logo} style={{ height: 90, width: 100 }} />
                <Text style={styles.headerText}>Sign Up</Text>

                <View style={{ marginTop: 50 }}>
                    <Text
                        style={{
                            color: 'white',
                            paddingLeft: 5,
                            marginBottom: 5,
                            fontSize: 16,
                        }}>
                        U
                        <Text style={{ fontSize: 14, color: 'white' }}>
                            SERNAME:
                        </Text>
                    </Text>
                    <TextInput
                        onChangeText={setUsername}
                        value={username}
                        style={styles.inputField}
                    />
                    <Text
                        style={{
                            color: usernameError ? '#ff6c61' : 'transparent',
                            marginTop: 3,
                        }}>
                        *Username cannot be empty
                    </Text>

                    <Text
                        style={{
                            color: 'white',
                            paddingLeft: 5,
                            marginBottom: 5,
                            marginTop: 35,
                            fontSize: 16,
                        }}>
                        E
                        <Text style={{ fontSize: 14, color: 'white' }}>
                            MAIL:
                        </Text>
                    </Text>
                    <TextInput
                        onChangeText={setEmail}
                        value={email}
                        keyboardType={'email-address'}
                        style={styles.inputField}
                    />
                    <Text
                        style={{
                            color: emailError ? '#ff6c61' : 'transparent',
                            marginTop: 3,
                        }}>
                        *Email cannot be empty
                    </Text>
                </View>

                <Pressable
                    onPress={signUp}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#4C6597' : '#6384C5',
                        },
                        {
                            backgroundColor: isLoading ? 'gray' : '#6384C5',
                        },
                        {
                            backgroundColor: isError ? '#d13d32' : '#6384C5',
                        },
                        styles.loginButton,
                    ]}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={'white'} />
                    ) : (
                        <Text
                            style={[
                                styles.whiteText,
                                { fontSize: 20, textTransform: 'uppercase' },
                            ]}>
                            S<Text style={{ fontSize: 18 }}>ign</Text> U
                            <Text style={{ fontSize: 18 }}>p</Text>
                        </Text>
                    )}
                </Pressable>

                <Pressable
                    onPress={alreadyHaveAccountPressed}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? '#706F71'
                                : 'transparent',
                        },
                        styles.invisibleButton,
                    ]}>
                    <Text
                        style={[
                            styles.whiteText,
                            { fontSize: 14, textTransform: 'uppercase' },
                        ]}>
                        I already have an account
                    </Text>
                </Pressable>
                {/* </View> */}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#383B3F',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 80,
        // justifyContent: 'center',
        // alignContent: 'center',
        alignItems: 'center',
    },

    whiteText: {
        color: 'white',
    },

    headerText: {
        color: 'white',
        fontSize: 24,
        fontVariant: ['small-caps'],
        textTransform: 'uppercase',
    },

    inputField: {
        color: 'black',
        height: 50,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 18,
    },

    loginButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderRadius: 10,
        marginTop: 50,
    },

    invisibleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: 300,
        borderRadius: 5,
        height: 30,
    },
})

export default SignUpScreen
