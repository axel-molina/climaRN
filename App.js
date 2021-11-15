import React, {useState, useEffect} from 'react';
import { StyleSheet, View, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Clima from './components/Clima';
import Formulario from './components/Formulario';
import Header from './components/Header';

const App = () => {

  const [busqueda, guardaBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultado, intenta con otra ciudad',
        [
            {text: 'OK'}
        ]
    );
}

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [bgColor, guardarBgColor] = useState('#0a9396');

  const {ciudad, pais} = busqueda;

  useEffect(() => {
      const consultarClima = async () => {
        if (consultar) {
          const appId = 'd5651a8922769c01417dc1ba0b0ed329';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad.trim()},${pais}&appid=${appId}`;
          try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            guardarResultado(resultado);
            guardarConsultar(false);

            //modifica los colores de fondo basado en la temperatura
            const kelvin = 273.15;
            const {main} = resultado;
            const actual = main.temp - kelvin;

            if (actual < 10) {
              guardarBgColor('#005f73');
            } else if (actual >= 10 && actual < 15) {
              guardarBgColor('#94d2bd');
            } else if (actual >= 15 && actual < 21) {
              guardarBgColor('#e9d8a6');
            } else if (actual >= 21 && actual < 30) {
              guardarBgColor('#bb3e03');
            }else {
              guardarBgColor('#9b2226');
            }

              } catch (error) {
            mostrarAlerta();
              }
            } 
        }
        consultarClima();
      }, [consultar]);

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View style={[styles.container, bgColorApp]}>
        <StatusBar hidden= {true}/>
        <Header/>
        <View style={styles.contenido}>
          <Formulario
            busqueda={busqueda}
            guardarBusqueda={guardaBusqueda}
            guardarConsultar={guardarConsultar}
          />
          <Clima
            resultado={resultado}
          ></Clima>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenido: {
    marginHorizontal: '2.5%',
    marginTop: 100,
  }
})

