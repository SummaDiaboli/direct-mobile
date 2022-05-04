import { FlatList, LogBox, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UserDataContext } from '../../contexts/UserDataContext'
import ActiveToken from '../../components/ActiveToken'
import ExpiredToken from '../../components/ExpiredToken'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import HistoryItem from '../../components/HistoryItem'

type AuthToken = {
    id: string
    token: string
    user_id: string
    referer: string
    created: string
    expires: string
}

const HomeTab = () => {
    const userData = useContext(UserDataContext)
    const navigation = useNavigation<any>()
    const navigateToEdit = () => {
        navigation.navigate('Edit Profile', { data: userData })
    }

    const [magicToken, setMagicToken] = useState('')
    const [isTokenLoading, setIsTokenLoading] = useState(false)
    // const [returnText, setreturnText] = useState('')
    const [history, setHistory] = useState<AuthToken[]>([])
    const [isError, setIsError] = useState(false)
    const [isHistoryLoading, setisHistoryLoading] = useState(false)

    const fetchMagicToken = () => {
        setIsTokenLoading(true)
        axios
            .get(`http://10.3.128.231:8080/api/latest-token/${userData.id}`)
            .then(res => {
                // const token = res.data.token
                if (res.data.token) {
                    setMagicToken(res.data.token)
                } else {
                    setMagicToken('')
                }
                // setreturnText(`${JSON.stringify(res.data)}`)
                setIsTokenLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsTokenLoading(false)
            })
    }

    const fetchHistory = () => {
        setisHistoryLoading(true)
        axios
            .get(
                `http://10.3.128.231:8080/api/authed-websites/${userData.id}`,
            )
            .then(res => {
                if (res.status !== 200) {
                    setIsError(true)
                } else {
                    console.log(res.data)
                    const responseData = res.data
                    setHistory(responseData.websites)
                }
                setisHistoryLoading(false)
                console.log(history)
            })
    }

    // useEffect(() => {
    // }, [])

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    useEffect(() => {
        fetchHistory()
        fetchMagicToken()
    }, [userData])

    return (
        <View style={styles.container}>
            <Header
                username={userData.username}
                email={userData.email}
                id={userData.id}
            />

            <ScrollView
                // overScrollMode=
                style={{
                    minHeight: '80%',
                    paddingVertical: '2%',
                    marginBottom: '18%',
                }}>
                <View>
                    <View style={styles.content}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                height: 120,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: 'black',
                                        paddingVertical: 10,
                                    }}>
                                    Current Magic Token
                                </Text>

                                <FontAwesome
                                    name="rotate-right"
                                    size={20}
                                    onPress={fetchMagicToken}
                                />
                            </View>
                            <View>
                                {isTokenLoading ? (
                                    <ActivityIndicator
                                        size={'large'}
                                        color="gray"
                                    />
                                ) : magicToken.length > 0 ? (
                                    magicToken.length <= 6 ? (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                            }}>
                                            <Text
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    letterSpacing: 20,
                                                    fontSize: 40,
                                                    fontWeight: 'bold',
                                                }}>
                                                {magicToken}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                            }}>
                                            <Text
                                                style={{
                                                    marginVertical: 10,
                                                }}>
                                                QR Code found, please scan using
                                                this device
                                            </Text>
                                        </View>
                                    )
                                ) : (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            // alignItems: 'center',
                                            // marginVertical: ,
                                        }}>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: 40,
                                            }}>
                                            N/A
                                        </Text>
                                        {/* <View>
                                        <Text>{returnText}</Text>
                                    </View> */}
                                    </View>
                                )}
                            </View>
                            {/* <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: 'black',
                                        paddingVertical: 10,
                                    }}>
                                    Profile
                                </Text>

                                <FontAwesome
                                    onPress={navigateToEdit}
                                    name="pencil"
                                    size={20}
                                />
                            </View>
                            <Text style={{ color: 'black', marginBottom: 10 }}>
                                ID:{' '}
                                <Text style={{ color: 'gray' }}>
                                    {userData.id}
                                </Text>
                            </Text>
                            <Text style={{ color: 'black' }}>
                                Email:{' '}
                                <Text style={{ color: 'gray' }}>
                                    {userData.email}
                                </Text>
                            </Text> */}
                        </View>
                    </View>
                </View>

                <View>
                    <View
                        style={[
                            styles.content,
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            },
                        ]}>
                        <Text
                            style={{
                                color: 'black',
                                textTransform: 'uppercase',
                                fontSize: 18,
                                fontWeight: '500',
                            }}>
                            Recent Web Tokens
                        </Text>

                        <FontAwesome
                            name="rotate-right"
                            size={20}
                            onPress={fetchHistory}
                        />

                        {/* <FontAwesome
                            name="angle-right"
                            size={18}
                            style={{ marginLeft: 5 }}
                            color={'black'}
                        /> */}
                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        {isHistoryLoading ? (
                            <ActivityIndicator
                                color="gray"
                                size={'large'}
                                style={{ marginVertical: 10 }}
                            />
                        ) : (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                // refreshing={isHistoryLoading}
                                data={history.slice(-3).reverse()}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <HistoryItem {...item} />
                                )}
                            />
                        )}
                    </View>
                </View>

                {/* <View>
                    <View
                        style={[
                            styles.content,
                            { flexDirection: 'row', alignItems: 'center' },
                        ]}>
                        <Text
                            style={{
                                color: 'black',
                                textTransform: 'uppercase',
                                fontSize: 18,
                                fontWeight: '500',
                            }}>
                            Recent Expired Tokens
                        </Text>
                        <FontAwesome
                            name="angle-right"
                            size={18}
                            style={{ marginLeft: 5 }}
                            color={'black'}
                        />
                    </View>

                    <View style={styles.content}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={expiredTokens}
                            keyExtractor={item => item.id}
                            horizontal
                            renderItem={({ item }) => (
                                <ExpiredToken {...item} />
                            )}
                        />
                    </View>
                </View> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        // minHeight: '50%',
        minHeight: '100%',
    },

    content: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
})

export default HomeTab
