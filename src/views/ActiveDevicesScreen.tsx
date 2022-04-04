import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as RNLocalize from 'react-native-localize'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {
    getDevice,
    getDeviceName,
    getManufacturer,
} from 'react-native-device-info'

const ActiveDevicesScreen = () => {
    const [device, setDevice] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [location, setLocation] = useState(RNLocalize.getCountry())

    // console.log(RNLocalize.getCountry())
    getDevice().then(device => setDevice(device))
    getDeviceName().then(name => setDeviceName(name))
    // getManufacturer().then(name => console.log(name))
    // console.log(getManufacturer().then)

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={{ marginBottom: '8%' }}>
                    <Text style={styles.title}>Current Device</Text>
                    <View
                        style={{
                            backgroundColor: '#C4C4C4',
                            paddingHorizontal: 10,
                            paddingVertical: 15,
                            borderRadius: 5,
                            flexDirection: 'row',
                            elevation: 1,
                        }}>
                        <Ionicon name="phone-portrait" size={60} />

                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap',
                            }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    fontSize: 16,
                                }}>
                                {deviceName}
                            </Text>
                            {/* <Text>{device}</Text> */}
                            <Text
                                style={{
                                    textTransform: 'uppercase',
                                    fontWeight: '500',
                                }}>
                                {location}
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={styles.title}>OTHER DEVICES</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '7%',
        paddingVertical: '5%',
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 18,
        color: 'black',
        marginBottom: '5%',
    },
})

export default ActiveDevicesScreen
