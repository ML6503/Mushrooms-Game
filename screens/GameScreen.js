import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';


const {height, width} = Dimensions.get('window');
import Mushrooms from '../components/Mushrooms';
import Basket from '../components/Basket';

const GameScreen = (props) => {
    // code for dragging mushromms with Animated and PanResponder
    // used from https://snack.expo.io/@arethel/9f9b64
    const dropZoneValues = useRef(null);
    const pan = useRef(new Animated.ValueXY());
    const [bgColor, setBgColor] = useState('#2c3e50');

    const isDropZone = useCallback((gesture) => {
        const dz = dropZoneValues.current;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }, []);

    const onMove = useCallback((_, gesture) => {
        if (isDropZone(gesture)) setBgColor('red');
        else setBgColor('#2c3e50');
    }, [isDropZone]);

    const setDropZoneValues = useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderMove: Animated.event([null, {
            dx  : pan.current.x,
            dy  : pan.current.y
        }], {
            listener: onMove
        }),
        onPanResponderRelease: (e, gesture) => {
            if (!isDropZone(gesture)) {
                Animated.spring(
                    pan.current,
                    {toValue:{x:0,y:0}}
                ).start();
            }
        }
    }), []);

    return (
        
        <View style={styles.container}>  
                       
            <View style={styles.containerMushrooms}>   
                <Mushrooms 
                    {...panResponder.panHandlers}
                    style={pan.current.getLayout()}/>
            </View>
            <View style={styles.containerBasket}>  
                <Basket
                    onStartGame={props.onStartGame}
                    onLayout={setDropZoneValues}
                    style={ {backgroundColor: bgColor}}/>              
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

GameScreen.propTypes = {
    onStartGame: PropTypes.func.isRequired, 
    
};

export default GameScreen;