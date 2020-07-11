import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert,  Dimensions } from 'react-native';


const {height, width} = Dimensions.get('window');
import Mushrooms from '../components/Mushrooms';
import Basket from '../components/Basket';

const GameScreen = () => {
    return (
        
        <View style={styles.container}>  
                       
            <View style={styles.containerMushrooms}>   
                <Mushrooms />
            </View>
            <View style={styles.containerBasket}>  
                <Basket />              
            </View>  
            
        </View>
        
    );
};

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        display: 'flex',       
        flexDirection: 'row',
        justifyContent: 'center',
       
        // marginLeft: 100,
        height: height,
        width: width,        
    },
    containerMushrooms: {
        flexBasis: '85%',
        height: height,
        borderColor: 'red',
        borderWidth: 2,
    },
    containerBasket: {
        flexBasis: '15%',
        borderColor: 'red',
        borderWidth: 2,
    },
    
});

export default GameScreen;