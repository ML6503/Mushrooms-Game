import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
    const [startGame, setStartGame] = useState(false);

    const startGameHandler = (back) => {
        if(back) {
            setStartGame(false);
        } else {
            setStartGame(true);
        }
    };

    const content = startGame ? <GameScreen onStartGame={startGameHandler} /> : <StartGameScreen  onStartGame={startGameHandler} />; 
    const forest = startGame ? require('./assets/start.png') : null;    
    
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
        resizeMode: 'cover', // or 'stretch'
        width: '100%',     
    },
});


