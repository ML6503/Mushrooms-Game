import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './components/Mushrooms';

export default function App() {
    const [startGame, setStartGame] = useState(false);

    const startGameHandler = () => {
        setStartGame(true);
    };
    const content = startGame ? <GameScreen /> : <StartGameScreen  onStartGame={startGameHandler} />; 
    const forest = startGame ? require('./assets/images/forest.png') : null;
       
    
    return (
        <ImageBackground source={forest} style={styles.backgroundImage} > 
            {content}
        </ImageBackground>
    );
}
  
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        resizeMode: 'stretch', // or 'cover'
        width: '100%',     
    },
});


