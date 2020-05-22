import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {borrarFavorito} from "../redux/ActionCreators";


const mapStateToProps = state => {
    return {
        favoritos: state.favoritos,
        excursiones: state.excursiones
    }
}

const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId))
})

class VistaFavoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        
        //let excursiones_favs = [];
        //this.props.favoritos.map((favorito, index) => {
        //    excursiones_favs.push(this.props.excursiones.excursiones[favorito]);
        //});

        const renderFavoritoItem = ({ item, index }) => {
            const { navigate } = this.props.navigation;

            const rightButton = [
                {
                    text: 'Borrar',
                    type: 'delete',
                    onPress: () => Alert.alert(
                                        'Borrar excursión favorita?',
                                        'Confirme que desea borrar la excursión: ' + item.nombre,
                                        [
                                            {text: 'Cancelar', onPress: () => console.log(item.nombre + ' Favorito no borrado')},
                                            {text: 'OK', onPress: () => this.props.borrarFavorito(item.id)},
                                        ],
                                        {cancelable: false},
                                    )
                }
            ];
            
            return(
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        title={item.nombre}
                        subtitle={item.descripcion}
                        hideChevron={true}
                        leftAvatar={{source: {uri: item.imagen} }}
                        onPress={() => navigate("DetalleExcursion", { excursionId: item.id })}
                        onLongPress={ () => Alert.alert(
                                                'Borrar excursión favorita?',
                                                'Confirme que desea borrar la excursión: ' + item.nombre,
                                                [
                                                    {text: 'Cancelar', onPress: () => console.log(item.nombre + ' Favorito no borrado')},
                                                    {text: 'OK', onPress: () => this.props.borrarFavorito(item.id)},
                                                ],
                                                {cancelable: false},
                                            )
                        }
                    />
                </Swipeout>
            )
        }

        return(
            <FlatList
                //data={excursiones_favs}
                data={this.props.excursiones.excursiones.filter(
                    excursion => this.props.favoritos.some(el => el === excursion.id)
                )}
                renderItem={renderFavoritoItem}
                keyExtractor={item => item.id.toString()}
            />
        )

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);
