import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function CalendarioNavegador() {
    return (
        <Stack.Navigator
            initialRouteName="Calendario"
            headerMode="screen"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#015afc' },
                headerTitleStyle: { color: '#fff' },
            }}
        >
            <Stack.Screen
                name="Calendario"
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa',
                }}
            />
            <Stack.Screen
                name="DetalleExcursion"
                component={DetalleExcursion}
                options={{
                    title: 'Detalle Excursión',
                }}
            />
        </Stack.Navigator>
    );
}

class Campobase extends Component {

    render() {

        return (
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <CalendarioNavegador />
                </View>
            </NavigationContainer>
        );
    }
}

export default Campobase;