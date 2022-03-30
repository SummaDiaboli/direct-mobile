import { Button, StyleSheet, Text, View } from 'react-native'
import React, { createRef, useContext, useRef, useState } from 'react'
import Header from '../components/Header'
import { UserDataContext } from '../contexts/UserDataContext'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import axios from 'axios'

const QRTab = () => {
    const userData = useContext(UserDataContext)
    const [scanText, setScanText] = useState('')
    const [scanned, setScanned] = useState(false)

    const onSuccess = (e: any) => {
        // console.log(e)
        setScanText("Code Identified. Scanning...")
        setScanned(true)
        axios
            .post('http://10.3.128.220:8080/api/confirm-qr', {
                user_id: userData.id,
                token: e.data,
            })
            .then(res => {
                setScanText('Successfully authenticated')
                console.log(res.data)
            })
            .catch(err => {
                setScanText("Could not authenticate")
                console.log(err)
            })
            .finally(() => {
                setScanned(false)
                // setScanText("")
            })
    }

    // const rescan = () => {
    //     setScanned(false)
    //     setScanSuccess(false)
    // }

    const ShowStatus = () => {
        return (
            <View>
                <Text>{scanText}</Text>
            </View>
        )
    }

    return (
        <QRCodeScanner
            // reactivate
            // reactivateTimeout={100}
            // camer
            topContent={<ShowStatus />}
            cameraTimeout={scanned ? 1 : 20000}
            onRead={onSuccess}
            cameraContainerStyle={{height: 300}}
            showMarker
            flashMode={RNCamera.Constants.FlashMode.auto}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        // minHeight: '50%',
        minHeight: '100%',
    },
})

export default QRTab
