import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React from 'react'
// import DateTime from 'luxon'
import moment from 'moment-timezone'

type Props = {
    id: string
    token: string
    created: string
    expires: string
    // platform?: string
    // url?: string
    // isExpired: boolean
    referer: string
}

const HistoryItem: React.FC<Props> = ({
    id,
    token,
    created,
    expires,
    referer,
}: // platform,
// url,
// isExpired,
Props) => {
    const isExpired = new Date(expires) < new Date(Date.now())
    // console.log({isExpired})

    return (
        <View
            key={id}
            style={{
                backgroundColor: 'white',
                // minHeight: 130,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginHorizontal: 6,
                marginBottom: 10,
                elevation: 3,
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
                            fontWeight: 'bold',
                        }}>
                        {referer}
                    </Text>

                    {/* <Text style={{ fontSize: 12 }}>{url}</Text> */}
                </View>

                {!isExpired ? (
                    <FontAwesome name="rotate-right" size={16} />
                ) : null}
            </View>

            <Text
                style={{
                    fontSize: 10,
                    marginBottom: 5,
                    color: 'black',
                    textDecorationLine: 'underline',
                    fontStyle: 'italic',
                }}>
                {token}
            </Text>

            <Text style={{ fontSize: 13, marginBottom: 5 }}>
                <Text style={{ color: 'black' }}>Last Accessed:</Text>{' '}
                {moment(created).format('DD MMMM YYYY')}
            </Text>

            <Text style={{ fontSize: 13 }}>
                <Text style={{ color: 'black' }}>
                    Expire{isExpired ? 'd' : 's'}:
                </Text>{' '}
                {moment(expires).format('DD MMMM YYYY')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default HistoryItem
