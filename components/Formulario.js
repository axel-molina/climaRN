import React, {useState} from 'react'
import { Animated, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {

    const {pais, ciudad} = busqueda;

    const [animacionboton] = useState(new Animated.Value(1));

    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return;
        }
        guardarConsultar(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y un país para la busqueda',
            [
                {text: 'OK'}
            ]
        );
    }

    const animacionEntrada = () => {
        Animated.spring(animacionboton, {
            toValue: .9,
            useNativeDriver: true
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            toValue: 1,
            friction: 2,
            tension: 30,
            useNativeDriver: true
        }).start();
    }

    const estiloAnimacion = {
        transform: [{scale: animacionboton}]
    }

    return (
        <View>
            <View>
                <TextInput
                value={ciudad}
                style={styles.input}
                onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
                placeholder='¿Cuál es tu ciudad?'
                placeholderTextColor="#666"
                ></TextInput>
            </View>
            <View>
                <Picker 
                selectedValue={pais}
                dropdownIconColor='black' 
                style={{height: 50, backgroundColor: 'white', color: '#666'}}
                onValueChange={(pais) => guardarBusqueda({...busqueda, pais})}
                >
                    <Picker.Item label='Seleccione un país' value='' />
                    <Picker.Item label='Estados Unidos' value='US' />
                    <Picker.Item label='México' value='MX' />
                    <Picker.Item label='Argentina' value='AR' />
                    <Picker.Item label='Colombia' value='CO' />
                    <Picker.Item label='Costa Rica' value='CR' />
                    <Picker.Item label='España' value='ES' />
                    <Picker.Item label='Perú' value='PE' />
                </Picker>
            </View>
            <TouchableWithoutFeedback
                onPressIn={() => animacionEntrada()}
                onPressOut={() => animacionSalida()}
                onPress={() => consultarClima()}
            >
                <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                    <Text style={styles.txtBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Formulario

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: "#ee9b00",
        padding: 15,
        justifyContent: 'center'
    },
    txtBuscar: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 15
    }
})

