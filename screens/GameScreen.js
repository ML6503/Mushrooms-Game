import React, { useState, useRef, useCallback,  } from 'react';
import { View, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

import Mushrooms from '../components/Mushrooms';
import Basket from '../components/Basket';
import { getMushrooms } from '../engine';

const {height, width} = Dimensions.get('window');

const { status: statusConst } = require('../constants/constants');


const GameScreen = ({ navigation }) => {
    // code for dragging mushromms with Animated and PanResponder
    // used from https://snack.expo.io/@arethel/9f9b64
    
    const [mushrooms, setMushrooms] = useState(null);
    const [picked, setPicked] = useState('');

    const pickedRef = React.useRef();
    React.useEffect(() => {
        pickedRef.current = picked;
    }, [picked]);

    React.useEffect(() => {
        const items = getMushrooms();
        setMushrooms(items);
    }, [] );

    const mushroomsRef = React.useRef();
    React.useEffect(() => {
        mushroomsRef.current = mushrooms;
    }, [mushrooms]);

    
    const getSelectedMushroom = (mArray) => {
        const selectedMushroom = mArray.filter((m) => m.status === statusConst.PICKED);
                
        return selectedMushroom[0];
    }
    
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

 
    const dropZoneValues = useRef(null);
    // const pan = useRef(new Animated.ValueXY(), { useNativeDriver: true },);
    const [bgColor, setBgColor] = useState();
     
    const isDropZone = useCallback((gesture) => {
        const dz = dropZoneValues.current;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }, []);

    const updateMushrooms = () => {  
        // console.log("pickedRef from updateMushrooms", pickedRef.current);     
        const updatedMushrooms = mushroomsRef.current.map((m) => (m.id === pickedRef.current) ? { ...m, status: statusConst.IN_BASKET } : m);      

        setMushrooms(updatedMushrooms);
        // console.log("OUR MUSHROOMS after basket", updatedMushrooms);
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

    
   
     
    return (
        
        <View style={styles.container}>  
            { mushrooms !== null ? 
                <>
                    <View style={styles.containerMushrooms}>           
                        <Mushrooms          
                            isDropZone={isDropZone}
                            onMove={onMove}
                            setBgColor={setBgColor}
                            updateMushrooms={updateMushrooms}
                            mushrooms={mushrooms}
                            handleMushroomSelected={handleMushroomSelected}/>                    
                    </View> 
               
                    <View style={styles.containerBasket}>  
                        <Basket
                            navigation={navigation}
                            onLayout={setDropZoneValues}
                            style={ {backgroundColor: bgColor} }
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
    navigation: PropTypes.object.isRequired,     
};

export default GameScreen;