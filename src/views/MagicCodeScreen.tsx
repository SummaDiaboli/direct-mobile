import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/routes'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from 'react-native-config'

type Props = NativeStackScreenProps<RootStackParamList, 'Magic Code'>

const MagicCodeScreen: React.FC<Props> = ({ navigation, route }: Props) => {
    const [isInvalid, setIsInvalid] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const logo = require('../assets/images/Icon_Logo.png')
    const code: (number | string)[] = ['', '', '', '', '', '']
    const validate: boolean[] = [false, false, false, false, false, false]

    const id = route.params.id

    const input1 = useRef()
    const input2 = useRef()
    const input3 = useRef()
    const input4 = useRef()
    const input5 = useRef()
    const input6 = useRef()
    const refs = [input1, input2, input3, input4, input5, input6]

    const generateInputFields = () => {
        const elements = []

        for (let index = 0; index < 6; index++) {
            elements.push(
                <TextInput
                    /* @ts-ignore */
                    ref={refs[index]} // ignored because is working as expected and Legacy not implemented in React Native
                    // onSubmitEditing={e => handleInput( index)}
                    maxLength={1}
                    onChange={e => handleInput(e, index)}
                    key={`element${index}`}
                    style={[styles.codeInput, { marginHorizontal: 4 }]}
                    returnKeyType="next"
                />,
            )
        }
        return elements
    }

    const handleInput = (
        e: NativeSyntheticEvent<TextInputChangeEventData>,
        index: number,
    ) => {
        if (index < 5) {
            const ref: any = refs[index + 1].current
            ref?.focus()
        }
        code[index] = e.nativeEvent.text
        console.log(code)
        validateCode()
    }

    const validateCode = () => {
        /* Makes sure there is no empty string in the code */
        code.map((value, index) => {
            if (value === '') {
                validate[index] = false
            } else {
                validate[index] = true
            }
        })
        if (!validate.includes(false)) {
            // console.log("valid");
            // console.log(code);
            sendVerification(code.join(''))
        } else {
            console.log('invalid')
        }
        console.log('here')
    }

    const sendVerification = (code: string) => {
        // console.log(code);
        // console.log(id);
        // console.log('here')
        axios
            .post(`${Config.API}confirm-token`, {
                user_id: id,
                token: code,
            })
            .then(async res => {
                // console.log(res.data)
                if (res.status !== 200) {
                    // console.log('Invalid token')
                    setIsInvalid(true)
                    setErrorText('Invalid code. Please verify and try again')
                } else {
                    // navigator(Routes.PROFILE);
                    // navigation.navigate('Home', { data: res.data })
                    await AsyncStorage.setItem(
                        'userData',
                        JSON.stringify(res.data),
                    ).then(() => {
                        // TODO: Use another means of verification for login
                        // navigation.navigate("Magic Code", {id})
                        // setIsLoading(false)
                        // setIsError(false)
                        setIsInvalid(false)
                        navigation.navigate('Home', { data: res.data })
                        // navigation.navigate("Home Tabs", )
                    })
                }
            })
            .catch(err => {
                console.log(err)
                setIsInvalid(true)
                setErrorText(
                    'Something went wrong verifying this code. Please try again',
                )
                // TODO: Reset all the input fields
            })
    }

    const resendCode = () => {
        setIsLoading(true)
        axios
            .get(`${Config.API}resend-token/${id}`)
            .then(res => {
                if (res.status !== 201) {
                    setIsError(true)
                    
                }
                setIsLoading(false)
            })
    }

    return (
        <ScrollView style={{ backgroundColor: '#383B3F' }}>
            <SafeAreaView style={styles.container}>
                <Image source={logo} style={{ height: 90, width: 100 }} />
                <Text style={styles.headerText}>Magic Code</Text>

                <View
                    style={{
                        marginTop: 70,
                        justifyContent: 'center',
                        // alignContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <Text
                        style={[
                            styles.whiteText,
                            {
                                marginHorizontal: 13.7,
                                marginBottom: 25,
                                fontSize: 16,
                            },
                        ]}>
                        A MAGIC TOKEN HAS BEEN SENT TO YOUR EMAIL. INPUT IT
                        BELOW:
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        {generateInputFields()}
                    </View>
                </View>

                {/* TODO: Implement Resend email button */}

                <Text
                    style={{
                        color: isInvalid ? '#ff6c61' : 'transparent',
                        marginTop: 10,
                        flexDirection: 'row',
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                    }}>
                    *Invalid code. Please verify and try again
                </Text>

                <View>
                    <Pressable
                        onPress={resendCode}
                        disabled={isLoading}
                        style={({ pressed }) => [
                            {
                                backgroundColor: isLoading ? 'gray' : '#6384C5',
                            },
                            {
                                backgroundColor: isError
                                    ? '#d13d32'
                                    : '#6384C5',
                            },
                            {
                                backgroundColor: pressed
                                    ? '#4C6597'
                                    : '#6384C5',
                            },
                            styles.loginButton,
                        ]}>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={'white'} />
                        ) : (
                            <Text style={[styles.whiteText, { fontSize: 20 }]}>
                                R<Text style={{ fontSize: 18 }}>ESEND</Text> M
                                <Text style={{ fontSize: 18 }}>AGIC</Text> C
                                <Text style={{ fontSize: 18 }}>ODE</Text>
                            </Text>
                        )}
                    </Pressable>
                </View>
            </SafeAreaView>
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

    codeInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 50,
        height: 55,
        fontSize: 18,
        paddingHorizontal: 17,
    },

    loginButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderRadius: 10,
        marginTop: 20,
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

export default MagicCodeScreen
