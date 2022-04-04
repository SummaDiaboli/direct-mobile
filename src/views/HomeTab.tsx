import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Header from '../components/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UserDataContext } from '../contexts/UserDataContext'
import ActiveToken from '../components/ActiveToken'
import ExpiredToken from '../components/ExpiredToken'
import { useNavigation } from '@react-navigation/native'

const HomeTab = () => {
    const userData = useContext(UserDataContext)
    const navigation = useNavigation<any>()
    const navigateToEdit = () => {
        navigation.navigate('Edit Profile', { data: userData })
    }

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

            <ScrollView
                style={{
                    minHeight: '100%',
                    paddingVertical: '2%',
                    marginBottom: '18%',
                }}>
                <View style={{ marginBottom: 10 }}>
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
                            </Text>
                        </View>
                    </View>
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
                                fontWeight: '500',
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
                            showsHorizontalScrollIndicator={false}
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
