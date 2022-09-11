import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserDataContext } from '../../contexts/UserDataContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../utils/routes'
import axios from 'axios'
import moment from 'moment'
import Config from 'react-native-config'
// import { TextInput } from 'react-native-paper'

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

const EditProfileScreen: React.FC<Props> = ({ navigation, route }: Props) => {
    const userData = route.params.data
    const id = userData.id
    const [username, setUsername] = useState(userData.username)
    const [email, setEmail] = useState(userData.email)
    const [tokenDuration, setTokenDuration] = useState<unknown>()
    const [accountCreated, setAccountCreated] = useState('May 20, 2022')
    const [response, setResponse] = useState('')

    const fetchUserDetails = () => {
        axios.get(`${Config.API}users/${id}`).then(res => {
            // setResponse(`${JSON.stringify(res.data)}`)
            if (res.data) {
                setUsername(res.data.username)
                setEmail(res.data.email)
                setAccountCreated(
                    moment(res.data.created).format('DD MMMM YYYY'),
                )
                setTokenDuration(res.data.tokenDuration)
            } else {
                setAccountCreated('')
                setTokenDuration(7)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const updateUserDetails = () => {
        axios
            .patch(`${Config.API}users/${id}`, {
                email,
                token_duration: tokenDuration,
            })
            .then(res => {
                setResponse(`${JSON.stringify(res.data)}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {/* <Text>{response}</Text> */}
                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>ID</Text>
                    <TextInput
                        style={[styles.inputField]}
                        editable={false}
                        defaultValue={id}
                    />
                </View>

                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>Username</Text>
                    <TextInput
                        style={[styles.inputField]}
                        defaultValue={username}
                        editable={false}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        style={[styles.inputField]}
                        keyboardType="email-address"
                        defaultValue={email}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>
                        Default Token Duration (In Days)
                    </Text>
                    <TextInput
                        defaultValue="5"
                        style={[styles.inputField]}
                        keyboardType="number-pad"
                        value={`${tokenDuration}`}
                        onChangeText={e => setTokenDuration(+e)}
                    />
                </View>

                <View style={{ marginBottom: '5%' }}>
                    <Text style={styles.title}>Account Created</Text>
                    <TextInput
                        style={[styles.inputField]}
                        editable={false}
                        defaultValue={accountCreated}
                    />
                </View>

                <Pressable
                    onPress={updateUserDetails}
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#27282C' : '#383B3F',
                            elevation: 2,
                        },
                    ]}>
                    <Text style={{ color: 'white' }}>Save Changes</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '7%',
        paddingTop: '5%',
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: 'black',
        marginBottom: '5%',
    },
    inputField: {
        color: 'black',
        height: 50,
        width: '100%',
        backgroundColor: '#C4C4C4',
        borderRadius: 5,
        // borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 15,
    },
    button: {
        height: 50,
        backgroundColor: '#383B3F',
        justifyContent: 'center',
        alignItems: 'center',
        // width: 300,
        borderRadius: 10,
        marginTop: '5%',
    },
})

export default EditProfileScreen
