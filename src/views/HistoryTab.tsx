import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { UserDataContext } from '../contexts/UserDataContext'
import Header from '../components/Header'

const HistoryTab = () => {
    const userData = useContext(UserDataContext)

    return (
        <View style={styles.container}>
            <Header
                username={userData.username}
                email={userData.email}
                id={userData.id}
            />
            <ScrollView style={{ minHeight: '100%' }}>
                <View style={styles.content}>
                    <Text>History Screen</Text>
                </View>
            </ScrollView>
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
        paddingHorizontal: 20,
    },
})
export default HistoryTab
