import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/routes'

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

const SettingsScreen: React.FC<Props> = ({ navigation, route }: Props) => {
    const data = route.params.data.username

    return (
        <View>
            <Text>{data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default SettingsScreen
