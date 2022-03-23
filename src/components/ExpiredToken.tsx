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

const ExpiredToken: React.FC<Props> = ({
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
                height: 120,
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
                            fontSize: 18,
                            marginBottom: 10,
                            paddingRight: 20,
                        }}>
                        {platform}
                    </Text>

                    <Text style={{ fontSize: 10 }}>{url}</Text>
                </View>

                {/* <FontAwesome name="ellipsis-v" size={20} /> */}
            </View>

            <Text style={{ fontSize: 11, marginBottom: 5 }}>
                Token: {token}
            </Text>

            <Text style={{ fontSize: 11, marginBottom: 5 }}>
                Last Accessed: {accessDate}
            </Text>

            <Text style={{ fontSize: 11 }}>Expired: {expires}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default ExpiredToken
