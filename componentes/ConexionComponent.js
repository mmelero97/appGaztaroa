import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView, Text } from 'react-native';

const ConexionComponent = () => {
    const [isInternetReachable, setIsInternetReachable] = useState(false);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsInternetReachable(state.isInternetReachable);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    if (isInternetReachable) {       
        return null;
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'red', flex: 0 }}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 17,
                    fontWeight: '500',
                    paddingTop: 350,
                    paddingBottom: 350,
                    textAlign: 'center'
                }}>
                Ha perdido su conexión a Internet
        </Text>
        </SafeAreaView>
    );
}
export default ConexionComponent;