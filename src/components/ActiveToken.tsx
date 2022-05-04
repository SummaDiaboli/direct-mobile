import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React from 'react'

type Props = {
    id: string
    token: string
    accessDate: string
    expires: string
    platform?: string
    url?: string
}

const ActiveToken: React.FC<Props> = ({
    id,
    token,
    accessDate,
    expires,
    platform,
    url,
}: Props) => {
    return (
        <View
            key={id}
            style={{
                backgroundColor: 'white',
                height: 250,
                width: 280,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginRight: 10,
                borderRadius: 10,
                // width: '5%',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    paddingRight: 5,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'baseline',
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 22,
                            marginBottom: 10,
                            paddingRight: 20,
                            fontWeight: 'bold'
                        }}>
                        {platform}
                    </Text>

                    <Text style={{ fontSize: 12 }}>{url}</Text>
                </View>

                <FontAwesome name="rotate-right" size={16} />
            </View>

            <Text
                style={{
                    fontSize: 13,
                    marginBottom: 5,
                    color: 'black',
                    textDecorationLine: 'underline',
                    fontStyle: 'italic',
                }}>
                {token}
            </Text>

            <Text style={{ fontSize: 13, marginBottom: 5 }}>
                <Text style={{ color: 'black' }}>Last Accessed:</Text>{' '}
                {accessDate}
            </Text>

            <Text style={{ fontSize: 13 }}>
                <Text style={{ color: 'black' }}>Expires:</Text> {expires}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default ActiveToken
