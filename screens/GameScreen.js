import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Mushrooms from './components/Mushrooms';

const GameScreen = props => {
    return (
        
        <View style={styles.container}>                
            <Mushrooms />
        </View>
        
    );
};

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        marginLeft: 100,
    },
    
});

export default GameScreen;