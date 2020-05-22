import React, { Component } from 'react';
import Home from './HomeComponent';
import Calendario from './CalendarioComponent';
import VistaFavoritos from './VistaFavoritosComponent';
import QuienesSomos from './QuienesSomosComponent';
import Contacto from './ContactoComponent';
import PruebaEsfuerzo from './PruebaEsfuerzoComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';
import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "api-key",
    //authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://marta-bbdd.firebaseio.com/",
    projectId: "marta-bbdd",
    //storageBucket: "project-id.appspot.com",
    //messagingSenderId: "sender-id",
    //appId: "app-id",
    //measurementId: "G-measurement-id"
  };
  
firebase.initializeApp(firebaseConfig);

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

const mapDispatchToProps = dispatch => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios()),
    fetchCabeceras: () => dispatch(fetchCabeceras()),
    fetchActividades: () => dispatch(fetchActividades()),
})

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode="screen"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Campo Base',
                }}
            />
        </Stack.Navigator>
    );
}

function QuienesSomosNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="QuienesSomos"
            headerMode="screen"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
            }}
        >
            <Stack.Screen
                name="QuienesSomos"
                component={QuienesSomos}
                options={{
                    title: 'Quiénes somos',
                }}
            />
        </Stack.Navigator>
    );
}

function CalendarioNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="Calendario"
            headerMode="screen"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },

            }}
        >
            <Stack.Screen
                name="Calendario"
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa',
                    headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
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

function ContactoNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="Contacto"
            headerMode="screen"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
            }}
        >
            <Stack.Screen
                name="Contacto"
                component={Contacto}
                options={{
                    title: 'Contacto',
                }}
            />
        </Stack.Navigator>
    );
}

function PruebaEsfuerzoNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="Prueba de Esfuerzo"
            headerMode="screen"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
            }}
        >
            <Stack.Screen
                name="Prueba de Esfuerzo"
                component={PruebaEsfuerzo}
                options={{
                    title: 'Prueba de Esfuerzo',
                }}
            />
        </Stack.Navigator>
    );
}

function VistaFavoritosNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="VistaFavoritos"
            headerMode="screen"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (<Icon name="menu" size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
            }}
        >
            <Stack.Screen
                name="VistaFavoritos"
                component={VistaFavoritos}
                options={{
                    title: 'Excursiones Favoritas',
                }}
            />
        </Stack.Navigator>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

function DrawerNavegador() {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: colorGaztaroaClaro,
            }}
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Campo base" component={HomeNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Calendario" component={CalendarioNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Contacto" component={ContactoNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />

            <Drawer.Screen name="Prueba de Esfuerzo" component={PruebaEsfuerzoNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='heartbeat'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />

            <Drawer.Screen name="Excursiones Favoritas" component={VistaFavoritosNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='thumbs-up'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
}

class Campobase extends Component {

    componentDidMount() {
        this.props.fetchExcursiones();
        this.props.fetchComentarios();
        this.props.fetchCabeceras();
        this.props.fetchActividades();
    }

    render() {

        return (
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <DrawerNavegador />
                </View>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: colorGaztaroaOscuro,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);