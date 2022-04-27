import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    SafeAreaView,
    Pressable,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen: React.FC<Props> = ({ navigation }: Props) => {
    const logo = require('../assets/images/Icon_Logo.png')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorText, setErrorText] = useState('')

    // const textRef = useRef<TextInput>(null)

    const noAccountClicked = () => {
        navigation.navigate('Sign Up')
    }

    // console.log(process.env.IP_ADDRESS)

    const login = () => {
        if (username.length > 0) {
            setIsLoading(true)
            axios
                .get(`http://10.3.128.231:8080/api/login/${username}`)
                .then(
                    /*async*/ res => {
                        console.log(res.data)
                        if (res.status === 200) {
                            // navigator(`${Routes.SIGNUP}/${res.data.id}`);
                            console.log(res.data)
                            navigation.navigate('Magic Code', {
                                id: res.data.id,
                            })
                            setIsLoading(false)
                            setIsError(false)
                        }
                        // console.log(res.data)
                        // // const id = res.data.id
                        // setUsername('')
                        // await AsyncStorage.setItem(
                        //     'userData',
                        //     JSON.stringify(res.data),
                        // ).then(() => {
                        //     // TODO: Use another means of verification for login
                        //     // navigation.navigate("Magic Code", {id})
                        //     setIsLoading(false)
                        //     setIsError(false)
                        //     navigation.navigate('Home', { data: res.data })
                        //     // navigation.navigate("Home Tabs", )
                        // })
                    },
                )
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                    setIsError(true)
                    setErrorText('Username does not exist')
                })
        } else {
            setIsError(true)
            setErrorText('Username cannot be empty')
        }
    }

    return (
        <ScrollView
            style={{
                backgroundColor: '#383B3F',
            }}>
            <View style={styles.container}>
                <Image source={logo} style={{ height: 90, width: 100 }} />
                <Text style={styles.headerText}>Login</Text>

                <View style={{ marginTop: 100 }}>
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
                        // ref={textRef}
                        onChangeText={setUsername}
                        value={username}
                        style={styles.inputField}
                        onSubmitEditing={login}
                    />
                    <Text
                        style={{
                            color: isError ? '#ff6c61' : 'transparent',
                            marginTop: 5,
                        }}>
                        *{errorText}
                    </Text>
                </View>

                {/* <View style={{marginTop: 80}}> */}
                <Pressable
                    onPress={login}
                    disabled={isLoading}
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
                        <Text style={[styles.whiteText, { fontSize: 20 }]}>
                            L<Text style={{ fontSize: 18 }}>OG</Text> I
                            <Text style={{ fontSize: 18 }}>N</Text>
                        </Text>
                    )}
                </Pressable>

                <Pressable
                    onPress={noAccountClicked}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? '#706F71'
                                : 'transparent',
                        },
                        styles.invisibleButton,
                    ]}>
                    <Text style={[styles.whiteText, { fontSize: 14 }]}>
                        I DON'T HAVE AN ACCOUNT
                    </Text>
                </Pressable>
                {/* </View> */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#383B3F',
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
        marginTop: 80,
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

export default LoginScreen
