import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../contexts/UserDataContext'
import Header from '../../components/Header'
import ActiveToken from '../../components/ActiveToken'
import ExpiredToken from '../../components/ExpiredToken'
import HistoryItem from '../../components/HistoryItem'
import axios from 'axios'

type AuthToken = {
    id: string
    token: string
    user_id: string
    referer: string
    created: string
    expires: string
}

const HistoryTab = () => {
    const userData = useContext(UserDataContext)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [history, setHistory] = useState<AuthToken[]>([])
    const [isError, setIsError] = useState(false)

    const userHistory = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb28ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Google',
            url: 'www.google.com',
            isExpired: false,
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb28b',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Reddit',
            url: 'www.reddit.com',
            isExpired: false,
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb28a',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Youtube',
            url: 'www.youtube.com',
            isExpired: false,
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb2ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'LinkedIn',
            url: 'www.linkedin.com',
            isExpired: false,
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5abb8ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Instagram',
            url: 'www.instagram.com',
            isExpired: true,
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad5ab28ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Tiktok',
            url: 'www.tiktok.com',
            isExpired: true,
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3adabb28ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Zoom',
            url: 'www.zoom.com',
            isExpired: true,
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3a5abb28ba',
            token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            accessDate: '1/3/2022 3:06 PM GMT+1',
            expires: '3/3/2022 3:06 PM GMT+1',
            platform: 'Spotify',
            url: 'www.spotify.com',
            isExpired: true,
        },
    ]

    const refreshHistory = () => {
        // console.log('refreshing')
        fetchHistory()
    }

    const fetchHistory = () => {
        axios
            .get(`http://10.3.128.231:8080/api/authed-websites/${userData.id}`)
            .then(res => {
                if (res.status !== 200) {
                    setIsError(true)
                } else {
                    console.log(res.data)
                    const responseData = res.data
                    setHistory(responseData.websites)
                }
                console.log(history)
            })
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    return (
        <View style={styles.container}>
            <Header
                username={userData.username}
                email={userData.email}
                id={userData.id}
            />
            {/* <ScrollView
                style={{
                    minHeight: '100%',
                    paddingVertical: '2%',
                    marginBottom: '18%',
                }}> */}
            <View
                style={[
                    styles.content,
                    {
                        minHeight: '100%',
                        paddingVertical: '2%',
                        // marginBottom: '18%',
                    },
                ]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshing={isRefreshing}
                    onRefresh={refreshHistory}
                    style={{ marginBottom: '32%', marginTop: '3%' }}
                    data={history}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <HistoryItem {...item} />}
                    extraData={history}
                    ListEmptyComponent={<Text>Could not find history</Text>}
                />
            </View>
            {/* </ScrollView> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        // minHeight: '50%',
    },

    content: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
})
export default HistoryTab
