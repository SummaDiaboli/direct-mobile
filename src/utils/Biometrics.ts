import * as LocalAuthentication from 'expo-local-authentication'

const getSupportedBiometricDevices = async () => {
    const res = await LocalAuthentication.hasHardwareAsync()
    // console.log(res)
    return res
}

const checkBiometricActive = async () => {
    const res = await LocalAuthentication.isEnrolledAsync()
    // console.log(res)
    return res
}

const checkAvailableBiometricTypes = async () => {
    const res = await LocalAuthentication.supportedAuthenticationTypesAsync()
    // console.log(res)
    return res
}

const authenticateWithBiometrics = async () => {
    if (
        (await getSupportedBiometricDevices()) &&
        (await checkBiometricActive()) &&
        (await checkAvailableBiometricTypes())
    ) {
        const res = await LocalAuthentication.authenticateAsync({
            // disableDeviceFallback: true,
            promptMessage: 'Confirm your identity',
            cancelLabel: 'Cancel',
            //   fallbackLabel: 'Use password',
        })
        if (res.success) {
            return true
        }
        return false
    }
}

export {
    authenticateWithBiometrics,
    getSupportedBiometricDevices,
    checkBiometricActive,
    checkAvailableBiometricTypes,
}
