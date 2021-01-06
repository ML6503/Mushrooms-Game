import React, { useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, Image, ImageBackground, Animated, PanResponder  } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import PropTypes from 'prop-types';
import { LogBox } from 'react-native';

import { images } from '../constants/imagesFungi';

const forest = require('../assets/images/forest.png');

const { status: statusConst } = require('../constants/constants');

const Mushroom = ( { mushroomId, isDropZone, onMove, setBgColor, updateMushrooms, index, handleMushroomSelected, status, }) => {
    // workaround to avoid irritating yellow warnings of useNativeDriver.
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);

    const onPress = () => handleMushroomSelected(index);
    
    const pan = useRef(new Animated.ValueXY(), { useNativeDriver: true },);

    const panResponder = useRef(
        PanResponder.create({
            useNativeDriver: true ,
            onStartShouldSetPanResponder: () => true,
          
            onPanResponderMove: Animated.event([null, {
                dx  : pan.current.x,
                dy  : pan.current.y
            }], {
                listener: onMove
            },
            {
                useNativeDriver: true
            },
            ),
            onPanResponderRelease: (e, gesture) => {
                
                if (!isDropZone(gesture)) {
                    Animated.spring(
                        pan.current,
                        {toValue:{x:0,y:0}},
                        {
                            useNativeDriver: true
                        },                        
                    ).start();
                }
                if(isDropZone(gesture)) {
                    // console.log("WE ARE on Release - event", e.nativeEvent.target);
                    updateMushrooms();
                    setBgColor();                   
                    pan.current.flattenOffset();                                   
                }            
            },         
                     
        }), { useNativeDriver: true },
    ).current; 

    return (
        status === statusConst.IN_BASKET
            ? (<View style={styles.mushroom}/>)         
    
            : (< TouchableWithoutFeedback onPress={ onPress } >        
                <View style={styles.mushroom}>          
                    { status === statusConst.PICKED ?  
                        ( <Animated.View {...panResponder.panHandlers} style={pan.current.getLayout()}>
                            <Image
                                mushroomId ={mushroomId}
                                style={styles.mushroomImg}
                                source={images[mushroomId]}
                            />
                        </Animated.View> )
                        : 
                        (<Svg height="20%" width="20%" viewBox="0 0 339 447" vertical-align="top">
                            <G id="fungi" stroke="none" strokeWidth="1" fill="black" fillRule="evenodd">
                                <Path d="M169.5,0.5 C122.828881,0.5 80.5750881,18.4667719 49.9897472,47.5183346 C19.4139572,76.5608255 0.5,116.681966 0.5,161 C0.5,187.737381 7.37133109,202.814358 19.631421,210.782052 C34.7910603,220.634131 58.0695269,219.656755 86.4022659,216.688438 C86.644367,216.663074 86.8860768,216.637644 87.1273926,216.612144 C87.0660242,216.846124 87.0009812,217.082053 86.9367022,217.317435 C81.2130778,238.276649 78.5,266.053284 78.5,302.5 C78.5,358.537881 84.9013154,394.071779 98.8146433,415.829426 C113.678786,439.073957 137.133619,446.5 170.403184,446.5 C203.928335,446.5 227.008485,440.986595 241.386475,419.238182 C254.624628,399.213905 260.5,365.515962 260.5,309.961579 C260.5,270.198901 257.481875,239.883291 250.91671,217.209469 C250.84819,216.972822 250.778898,216.735678 250.708834,216.498034 C250.952279,216.520352 251.200787,216.546803 251.4497,216.573194 C280.169337,219.618192 303.786274,220.757088 319.156323,210.919471 C331.549088,202.987469 338.5,187.891157 338.5,161 C338.5,116.681966 319.586043,76.5608255 289.010253,47.5183346 C258.424912,18.4667719 216.171119,0.5 169.5,0.5 Z" id="Combined-Shape" stroke="#979797" fill="black"></Path>
                            </G>
                        </Svg>)
                    } 
                </View>
            </TouchableWithoutFeedback>
            )
    )
};
const Mushrooms = ( props ) => {
    const { mushrooms, handleMushroomSelected } = props;
    
      
    return (
        <ImageBackground source={forest} style={styles.backgroundImage} >
            <View style={styles.field}> 
        
                { mushrooms.map((m, index) => (
                    <Mushroom
                        key={index}
                        index={index}
                        status={m.status}
                        handleMushroomSelected ={handleMushroomSelected}
                        mushroomId={m.id}
                        mushroom={m}
                        // style={  props.style } 
                        { ...props }                   
                    />
                ))}  
                                     
            </View>
        </ImageBackground>   
    
    )
};

const styles = StyleSheet.create({
    mushroomImg: {
        height: 100,
        resizeMode: "contain",
        width: 100,
        zIndex: 101,           
    },
    mushroom: {
        alignItems:'center',        
        borderWidth: 1,
        borderColor: "black",
        flexBasis: "33.33%",              
        height: "33.33%",
        justifyContent: 'center',
        width: "33.33%",
        zIndex: 100,
    },
    field: {
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 5,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        zIndex: 50,
        position: 'relative',
    },
    backgroundImage: {
        height: '100%',
        resizeMode: 'cover', // or 'stretch'
        width: '100%',     
    },
});

Mushroom.propTypes = {
    mushroomId: PropTypes.string.isRequired, 
    // style: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    handleMushroomSelected: PropTypes.func.isRequired,
    isDropZone: PropTypes.func.isRequired,
    onMove:PropTypes.func.isRequired,
    setBgColor: PropTypes.func.isRequired,
    updateMushrooms: PropTypes.func.isRequired,
};

Mushrooms.propTypes = {
    // style: PropTypes.object.isRequired,
    mushrooms: PropTypes.array.isRequired,
    handleMushroomSelected: PropTypes.func.isRequired,    
};

export default Mushrooms;
    