import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UserDataContext } from '../contexts/UserDataContext'
import ActiveToken from '../components/ActiveToken'
import ExpiredToken from '../components/ExpiredToken'

const HomeTab = () => {
    const userData = useContext(UserDataContext)

    const activeTokens = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28a',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb8ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb28ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
    ]

    const expiredTokens = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28a',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb8ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb28ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
        },
    ]

    return (
        <View style={styles.container}>
            <Header
                username={userData.username}
                email={userData.email}
                id={userData.id}
            />

            <ScrollView style={{ paddingVertical: '2%', marginBottom: '18%' }}>
                <View style={{ marginBottom: 10 }}>
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
                            }}>
                            Profile
                        </Text>
                        <FontAwesome
                            name="angle-right"
                            size={18}
                            style={{ marginLeft: 5 }}
                            color={'black'}
                        />
                    </View>

                    <View
                        style={{
                            backgroundColor: 'white',
                            height: 200,
                            marginHorizontal: 20,
                            borderRadius: 10,
                        }}></View>
                </View>

                <View style={{ marginBottom: 10 }}>
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
                            }}>
                            Recent Active Tokens
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
                            data={activeTokens}
                            keyExtractor={item => item.id}
                            horizontal
                            renderItem={({ item }) => <ActiveToken {...item} />}
                        />
                    </View>
                </View>

                <View>
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
                            data={expiredTokens}
                            keyExtractor={item => item.id}
                            horizontal
                            renderItem={({ item }) => (
                                <ExpiredToken {...item} />
                            )}
                        />
                    </View>
                </View>
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