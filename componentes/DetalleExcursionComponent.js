import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Alert, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';

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

    if (excursion != null) {
        return (
            <Card
                featuredTitle={excursion.nombre}
                image={{ uri: baseUrl + excursion.imagen }}>
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
        <Card title='Comentarios' >
            <FlatList
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}


class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false,
            rate: "3",
            autor: "",
            comentario: ""
        };
    }

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