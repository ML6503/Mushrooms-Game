import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Animated, Text } from 'react-native';
import PropTypes from 'prop-types';

import Mushrooms from '../components/Mushrooms';
import Basket from '../components/Basket';
import Preloader from '../components/Preloader';
import { getMushrooms } from '../engine';

const {height, width} = Dimensions.get('window');

const { status: statusConst } = require('../constants/constants');


const GameScreen = ({ navigation }) => {
    // state and call on focus for Preloader on GameScreen before all pics are loaded
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const showPreloader = navigation.addListener('focus', () => {
    //         // The screen is focused and we call setTimeout to change loader state to false
    //         const noLoader = setTimeout(() => setLoading(false), 2500);
           
    //         return () => clearTimeout(noLoader);
            
            
    //     });
    
    //     // Return the function to unsubscribe from the event so it gets removed on unmount
    //     return showPreloader;
    // }, [navigation, setLoading]);

    useEffect(
        () => {
            const noLoader = setTimeout(() => setLoading(false), 3000);
            return () => clearTimeout(noLoader); 
        }, [setLoading]
    );

    // code for dragging mushrooms with Animated and PanResponder
    // used from https://snack.expo.io/@arethel/9f9b64
    
    const [mushrooms, setMushrooms] = useState(null);
    const [picked, setPicked] = useState('');

    const pickedRef = useRef();
    useEffect(() => {
        pickedRef.current = picked;
    }, [picked]);

    useEffect(() => {
        const items = getMushrooms();
        setMushrooms(items);
    }, [] );

    const mushroomsRef = useRef();
    useEffect(() => {
        mushroomsRef.current = mushrooms;
    }, [mushrooms]);

    
    const getSelectedMushroom = (mArray) => {
        const selectedMushroom = mArray.filter((m) => m.status === statusConst.PICKED);
                
        return selectedMushroom[0];
    };
    
    const handleMushroomSelected = (i) => {
       
        const newMushrooms = mushrooms.map((m, index) => {
            if(m.status !==statusConst.IN_BASKET) {
                if(i === index ) {
                    return {...m, status: statusConst.PICKED} ;
                } else {
                    return {...m, status: statusConst.IN_FIELD}
                }
            } else {
                return {...m};
            }           
        });     
        
        setMushrooms(newMushrooms);
        
        // we get selected mushroom and set selected state
        const sMushroom = getSelectedMushroom(newMushrooms);
        setPicked(sMushroom.id);            
    };

    // console.log('PICKED MUSHROOM XY', pickedRef.current);

    const dropZoneValues = useRef(null);
    // const pan = useRef(new Animated.ValueXY(), { useNativeDriver: true },);
    const [bgColor, setBgColor] = useState();
     
    const isDropZone = useCallback((gesture) => {
        const dz = dropZoneValues.current;      
        return (gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height) && (gesture.moveX > (width - dz.width) && gesture.moveX < width);
    }, []);

    const updateMushrooms = () => {          
        const updatedMushrooms = mushroomsRef.current.map((m) => (m.id === pickedRef.current) ? { ...m, status: statusConst.IN_BASKET } : m);      

        setMushrooms(updatedMushrooms);        
        setPicked('');           
    };    

    const onMove = useCallback((_, gesture) => {        
        if (isDropZone(gesture)) {
            setBgColor('red');            
        } else {
            setBgColor('#2c3e50');                       
        }
    }, [isDropZone]);

    const setDropZoneValues = useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });       
    
    // return loading ? <Preloader loading={loading} /> : (
    return loading ? <Preloader loading={loading} /> : (  
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' />  
            { mushrooms !== null ?                 
                <>
                    <View style={styles.containerMushrooms}>           
                        <Mushrooms          
                            isDropZone={isDropZone}
                            onMove={onMove}
                            setBgColor={setBgColor}
                            updateMushrooms={updateMushrooms}
                            mushrooms={mushrooms}
                            handleMushroomSelected={handleMushroomSelected}
                            setLoading={setLoading}/>                    
                    </View> 
               
                    <View style={styles.containerBasket}>  
                        <Basket
                            navigation={navigation}
                            onLayout={setDropZoneValues}
                            style={ {backgroundColor: bgColor} }
                            transformScale={bgColor !== undefined}
                            mushrooms={mushrooms}                            
                        />              
                    </View> 
                </>
                : null}            
        </View>       
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',       
        flexDirection: 'row',
        justifyContent: 'center',
        height: height,
        width: width,        
    },
    containerMushrooms: {
        flexBasis: '85%',
        height: height,
        // borderColor: 'red',
        // borderWidth: 2,
        zIndex: 2,
    },
    containerBasket: {
        flexBasis: '15%',
        // borderColor: 'red',
        // borderWidth: 2,
        zIndex: 1,
    },
    
});

GameScreen.propTypes = {
    navigation: PropTypes.object.isRequired,     
};

export default GameScreen;