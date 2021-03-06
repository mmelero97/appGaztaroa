import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Alert, StyleSheet, PanResponder } from 'react-native';
import { Card, Icon, Button, Rating, Image, Input } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
import { useRef } from "react";
import * as ImagePicker from 'expo-image-picker';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    //postComentario: (excursionId, rate, autor, comentario) => dispatch(postComentario(excursionId, rate, autor, comentario))
    postComentario: (comentario) => dispatch(postComentario(comentario))
})


function RenderExcursion(props) {

    const excursion = props.excursion;
    const cardAnimada = useRef(null);

    const reconocerDragDerechaIzquierda = ({ moveX, moveY, dx, dy }) => {
        if (dx < -50)
            return true;
        else
            return false;
    }

    const reconocerDragIzquierdaDerecha = ({ moveX, moveY, dx, dy }) => {
        if (dx > 0)
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            cardAnimada.current.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'terminado' : 'cancelado'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("PanResponder finalizado", gestureState);
            if (reconocerDragDerechaIzquierda(gestureState))
                Alert.alert(
                    'Añadir favorito',
                    'Confirmar que desea añadir' + excursion.nombre + ' a favoritos:',
                    [
                        { text: 'Cancelar', onPress: () => console.log('Excursión no añadida a favoritos'), style: 'cancel' },
                        { text: 'OK', onPress: () => { props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress_fav() } },
                    ],
                    { cancelable: false }
                );


            if (reconocerDragIzquierdaDerecha(gestureState))
                props.onPress_modal();

            return true;
        }
    })

    if (excursion != null) {
        return (
            <Animatable.View
                animation="fadeInDown"
                duration={2000}
                delay={500}
                ref={cardAnimada}
                {...panResponder.panHandlers}>

                <Card
                    featuredTitle={excursion.nombre}
                    image={{ uri: excursion.imagen }}>
                    <Text style={{ margin: 10 }}>
                        {excursion.descripcion}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress_fav()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.onPress_modal()}
                    />
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComentario(props) {

    const comentarios = props.comentarios;

    const renderCommentarioItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
                <Text style={{ fontSize: 12 }}>{item.valoracion} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + item.dia} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="bounceInDown" duration={2000} delay={500}>
            <Card title='Comentarios' >
                <FlatList
                    data={comentarios}
                    renderItem={renderCommentarioItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}


class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            rate: "3",
            autor: "",
            comentario: "",
            image: null
        };
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.Android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Debe permitir el acceso a los recursos de su dispositivo móvil.');
            }
        }

    };

    pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        } catch (E) {
        }
    };


    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }

    lanzarModal() {
        this.setState({ display: true })
        console.log("Lanzando Modal");
    }

    closeModal() {
        this.setState({
            display: false,
            rate: "3",
            autor: "",
            comentario: ""
        });
    }

    enviarDatos(excursionId) {
        const fecha = new Date(Date.now()).toISOString();
        const comentario = {
            id: null,
            excursionId: excursionId,
            valoracion: this.state.rate,
            autor: this.state.autor,
            comentario: this.state.comentario,
            dia: fecha
        }

        //console.log(comentario);
        this.props.postComentario(comentario);

        this.setState({
            display: false,
            rate: "3",
            autor: "",
            comentario: ""
        });
    }

    render() {
        //console.log(this.state.rate);
        const { excursionId } = this.props.route.params;
        let { image } = this.state;
        let iconos = <View></View>;
        return (
            <ScrollView>
                <RenderExcursion
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.some(el => el === excursionId)}
                    onPress_fav={() => this.marcarFavorito(excursionId)}
                    onPress_modal={() => this.lanzarModal()}
                />
                <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.display}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            defaultRating={3}
                            fractions={0}
                            ratingCount={5}
                            onFinishRating={rating => this.setState({ rate: rating })} />

                        <Input
                            style={styles.entradas}
                            placeholder="Autor"
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => this.setState({ autor: value })}
                        />

                        <Input
                            style={styles.entradas}
                            placeholder="Comentario"
                            leftIcon={{ type: 'font-awesome', name: 'pencil' }}
                            onChangeText={value => this.setState({ comentario: value })}
                        />

                        <Text onPress={() => this.enviarDatos(excursionId)} style={styles.text}>
                            ENVIAR
                        </Text>
                        <Text onPress={() => this.closeModal()} style={styles.text}>
                            CANCELAR
                        </Text>
                    </View>

                    <Card title="Mis imágenes">
                        <Button title="Selecciona una foto" onPress={this.pickImage} />
                        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
                    </Card>

                </Modal>

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        textAlign: 'center',
        color: "blue",
        marginBottom: 3
    },

    entradas: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',

    },
    modal: {
        flex: 1,
        margin: 30
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);