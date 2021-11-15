import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Header = () => {
    return (
        <View>
            <Text style={styles.titulo}>Clima</Text>
            <Text style={[styles.titulo, styles.subtitulo]}>Axel Iván Molina</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    icon: {
        width: 100,
    },
    titulo: {
        color: '#ee9b00',
        fontSize: 60,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold'
    }, 
    subtitulo: {
        fontSize: 16,
        fontWeight: '200',
    }
})
