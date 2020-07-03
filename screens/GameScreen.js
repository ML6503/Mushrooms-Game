import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Mushrooms from '../components/Mushrooms';
import Basket from '../components/Basket';

const GameScreen = () => {
    return (
        
        <View style={styles.container}>  
            <View style={styles.containerBasket}>  
                <Basket />
            </View>              
            <View style={styles.containerMushrooms}>   
                <Mushrooms />
            </View>
            
        </View>
        
    );
};

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        display: 'flex',       
        justifyContent: 'center',
        // padding: 24,
        marginLeft: 100,
        height: '100vh',
        width: '100vw',
    },
    containerMushrooms: {
        flexBasis: '80%',
    },
    containerBasket: {
        flexBasis: '20%',
    },
    
});

export default GameScreen;