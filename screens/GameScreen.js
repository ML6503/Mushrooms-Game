import React, { useState, useRef, useMemo, useCallback,  } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, Image, findNodeHandle  } from 'react-native';
import PropTypes from 'prop-types';

import Mushrooms from '../components/Mushrooms';
import Basket from '../components/Basket';
import { getMushrooms } from '../engine';

const {height, width} = Dimensions.get('window');

const { status: statusConst } = require('../constants/constants');


const GameScreen = (props) => {
    // code for dragging mushromms with Animated and PanResponder
    // used from https://snack.expo.io/@arethel/9f9b64
    const items = getMushrooms();
    const [mushrooms, setMushrooms] = useState(items);
    const [picked, setPicked] = useState('');

    const pickedRef = React.useRef();
    React.useEffect(() => {
        pickedRef.current = picked;
    }, [picked]);
    
    console.log('STATE PICKED ', picked);
    
    const getSelectedMushroom = (mArray) => {
        const selectedMushroom = mArray.filter((m) => m.status === statusConst.PICKED);
                
        return selectedMushroom[0];
    }
    
    const handleMushroomSelected = (i) => {

        const newMushrooms = mushrooms.map((m, index) => (i === index)
            ? {...m, status: statusConst.PICKED}  : {...m, status: statusConst.IN_FIELD});     
                     
        setMushrooms(newMushrooms);

        // we get selected mushroom and set selected state
        const sMushroom = getSelectedMushroom(newMushrooms);
        setPicked(sMushroom.id);            
    };

 
    const dropZoneValues = useRef(null);
    const pan = useRef(new Animated.ValueXY());
    const [bgColor, setBgColor] = useState();
     
    const isDropZone = useCallback((gesture) => {
        const dz = dropZoneValues.current;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }, []);

    const updateMushrooms = () => {  
        console.log("pickedRef from updateMushrooms", pickedRef.current);     
        console.log("STATE picked from updateMushrooms", picked);
        const updatedMushrooms = mushrooms.map((m) => m.id === pickedRef.current ? { ...m, status: statusConst.IN_BASKET } : m);      

        console.log("we are in updatedMushrooms and they are ", updatedMushrooms);  
        setMushrooms(updatedMushrooms);
        setPicked('');           
    }


    const onMove = useCallback((_, gesture) => {
        if (isDropZone(gesture)) setBgColor('red');
        else {
            setBgColor('#2c3e50');            
        }
    }, [isDropZone]);

    const setDropZoneValues = useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });

    
    const panResponder = useRef(
        PanResponder.create({
      
            onStartShouldSetPanResponder: () => true,
            // onPanResponderMove: (event, gesture) => {
            //     console.log("from PAN RESPONDER", gesture);
            // },
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
                if(isDropZone(gesture)) {
                    // console.log("WE ARE on Release - event", e.nativeEvent.target);
                    updateMushrooms();
                    setBgColor();                 
                }            
            },
                     
        })
    ).current;

     
    return (
        
        <View style={styles.container}>  

            <View style={styles.containerMushrooms}>               
                <Mushrooms          
                    {...panResponder.panHandlers}
                    style={pan.current.getLayout() }
                    mushrooms={mushrooms}
                    handleMushroomSelected={handleMushroomSelected}/>                    
            </View>
            <View style={styles.containerBasket}>  
                <Basket
                    onStartGame={props.onStartGame}
                    onLayout={setDropZoneValues}
                    style={ {backgroundColor: bgColor} }/>              
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
        zIndex: 2,
    },
    containerBasket: {
        flexBasis: '15%',
        borderColor: 'red',
        borderWidth: 2,
        zIndex: 1,
    },
    
});

GameScreen.propTypes = {
    onStartGame: PropTypes.func.isRequired, 
    
};

export default GameScreen;