import React, { useEffect, useState, useRef }  from 'react';
import { View, StyleSheet, Image,   Animated, Easing  } from 'react-native';
import Constants from "expo-constants";
// import Animated, { Easing } from "react-native-reanimated";
import Colors from '../constants/colors';

const loaderImg = require('../assets/images/fungiLogo.png');

const Preloader = () => {    
    let rotateValueHolder = new Animated.Value(0);
    const [viewState, setViewState] = useState(true);
    let scale = useRef(new Animated.Value(0.5)).current;
     
     const startImageScale = () => {
        if (viewState) {
            Animated.timing(scale, {
              toValue: 1,
              duration: 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false,
            }).start(() => setViewState(false));
          } else {
            Animated.timing(scale, {
              toValue: 0.2,
              duration: 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false,
            }).start(() => setViewState(true));
          }
     };
    
      const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder,  {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => startImageRotateFunction());
      };
    
      const RotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });
    
    
      useEffect(() => {
        startImageRotateFunction();
        startImageScale();
      });


    return (        
        <View style={styles.container}>  
            <Animated.View 
                style={{ transform: [{ scale }, { rotate:  RotateData }] }}>
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
        height: 800,
        width: 800,
        resizeMode: 'stretch'
    }
});

export default Preloader;
