import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { LoginResponse } from '../utils/routes'
import { useNavigation } from '@react-navigation/native'

type Props = LoginResponse

const Header: React.FC<Props> = ({ username, email, id }: Props) => {
    const navigation = useNavigation<any>()

    const navigateToSettings = () => {
        navigation.navigate('Settings', { data: { username, email, id } })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{username}</Text>
            <Ionicon
                name="settings-outline"
                size={20}
                color={'white'}
                onPress={navigateToSettings}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#383B3F',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    text: {
        fontSize: 16,
        color: 'white',
    },
})

export default Header
