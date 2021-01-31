import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, Image  } from 'react-native';
import Constants from "expo-constants";
import Animated, { Easing } from "react-native-reanimated";
import { loop, bInterpolate } from "react-native-redash";

import Colors from '../constants/colors';

const loaderImg = require('../assets/images/fungiLogo.png');

const { Value,  useCode, set } = Animated;

// loader loop using https://snack.expo.io/@git/github.com/wcandillon/can-it-be-done-in-react-native:bonuses/looping
const Preloader = () => {
    
    const [play, setPlay] = useState(true);
    useEffect(
        () => {
            const stopAnimation = setTimeout(() => setPlay(false), 3000);
            return () => clearTimeout(stopAnimation);
        }, [setPlay]
    );
    const animation = new Value(play ? 1 : 0);  

    useCode(       
        () => set(
            animation,
            loop({
                duration: 3000,
                easing: Easing.inOut(Easing.ease),
                boomerang: true,                
            })),
        [animation]
    );

    const scale = bInterpolate(animation, 0.6, 2);
    const rotate = bInterpolate(animation, 0, 1 * Math.PI * 2);

    return (
        
        <View style={styles.container}>  
            <Animated.View 
                style={{ transform: [{ scale }, { rotate }] }}>
                <View >
                    <Image
                        style={styles.loaderImg}
                        source={loaderImg}
                    /> 
                </View>
            </Animated.View>
        </View>
        
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,        
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.backGround        
    },
    loaderImg: {
        height: 150,
        width: 160,
        resizeMode: 'stretch'
    }
});

export default Preloader;
