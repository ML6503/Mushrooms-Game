import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
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
    resizeMode: 'stretch', // or 'cover'
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 50,
    fontSize: 34,
    fontStyle:'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowColor: 'green',
  },
  mushroomImg: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  mushroom: {
    flex:1,    
    justifyContent: 'space-between',
    padding: 10,
    alignItems:'center',    
  },
  field: {
    // flex: 1,
    // flexDirection: 'row',
  },
});
