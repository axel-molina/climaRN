import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Clima = ({ resultado }) => {

    const { name, main } = resultado;

    if(!name) return null;

    const kelvin = 273.15;

    console.log(resultado);

    return (
        <View style={styles.clima}>
            <Text style={styles.text}>La temperatura actual en {name} es:</Text>
            <Text style={styles.temperatura}>{parseInt(main.temp - kelvin)}
                <Text style={styles.c}>°C</Text>
                <Image
                style={styles.image}
                source={{uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}>
                </Image>
            </Text>
            <View style={styles.temperaturas}>
                <View>
                <Text style={styles.text}>Max: {parseInt(main.temp_max - kelvin)}°C</Text>
                </View>
                <View>
                    <Text style={styles.text}>Min: {parseInt(main.temp_min - kelvin)}°C</Text>
                </View>
            </View>
        </View>
    )
}

export default Clima

const styles = StyleSheet.create({
    clima: {
        marginTop: 40,
    }, 
    text: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    temperatura:{
        fontSize: 80,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    c:{
        fontSize: 30,
        color: '#fff',
    },
    image:{
        width: 66,
        height: 58,
    },
    temperaturas:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})
