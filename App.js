import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Mushrooms from './components/Mushrooms';

export default function App() {
    return (
        <ImageBackground source={require('./assets/images/forest.png')} style={styles.backgroundImage} > 
            <View style={styles.container}>
                <Text style={styles.paragraph}>Go Mushrooming!</Text>
                <Mushrooms />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        resizeMode: 'stretch', // or 'cover'
        width: '100%',     
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        marginLeft: 100,
    },
    paragraph: {
        margin: 24,
        marginTop: 50,
        fontSize: 50,
        fontStyle:'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        textShadowRadius: 10,
        textShadowColor: 'black',
    }
});
