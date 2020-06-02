import React, { Component } from 'react';
import { Text, View, ScrollView, Animated, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import * as MailComposer from 'expo-mail-composer';


class Contacto extends Component {
    constructor() {
        super();
        this.animated = new Animated.Value(0);
    }

    sendMail() {
        MailComposer.composeAsync({
            subject: 'Contacto a través App Gaztaroa',
            body: 'Contenido del mensaje:',
            recipients: ['gaztaroa@gaztaroa.com']
        });
    }

    animate() {
        Animated.timing(this.animated, {
            toValue: 1,
            duration: 2000,
        }).start();

    }

    render() {
        const opacity = this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
        const translateX = this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [-500, 1]
        });
        const transform = [{ translateX }];

        return (
            <ScrollView>
                <Card
                    title="Informacion de contacto">
                    <Animated.Text style={[{ fontSize: 20, color: colorGaztaroaOscuro }, { transform, opacity }]}>
                        Kaixo Mendizale!
                </Animated.Text>
                    <Text style={{ margin: 10 }}>
                        Si quieres participar en las salidas de montaña que organizamos o quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a través de diferentes medios. Puedes llamarnos por teléfono los jueves de las semanas que hay salida (de 20:00 a 21:00). También puedes ponerte en contacto con nosotros escribiendo un correo electrónico, o utilizando la aplicación de esta página web. Y además puedes seguirnos en Facebook.{"\n"}{"\n"}
                    Para lo que quieras, estamos a tu disposición! {"\n"}{"\n"}
                    Tel: +34 948 277151 {"\n"}{"\n"}
                    Email: gaztaroa@gaztaroa.com {"\n"}
                    </Text>
                    <Button title="Haz click para animarme :)" color="#015afc" onPress={() => this.animate()} />
                </Card>

                <Card title="Enviar correo electrónico a Gaztaroa">
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            raised
                            reverse
                            name='envelope'
                            type='font-awesome'
                            color='#015afc'
                            onPress={this.sendMail}
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    };
}

export default Contacto;