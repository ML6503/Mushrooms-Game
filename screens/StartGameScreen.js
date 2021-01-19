import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';

import {    
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,    
    Animated,
    PanResponder,
    StatusBar,
} from 'react-native';

import Colors from '../constants/colors';

const basketImg = require('../assets/images/basket.png');

const Swiper = ({ navigation, setArrowOpacity }) => {

    // adding animated values
    const translateX = new Animated.Value(0); 

    // PanResponder code
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
            setArrowOpacity(0);            
            Animated.event([null, { dx: translateX }], {useNativeDriver: false})(e, gesture);            
        },
        onPanResponderRelease: () => { 
            navigation.navigate('Game');         
           
            Animated.timing(translateX, {
                toValue: 0,               
                useNativeDriver: true,
                
            }            
            ).start(() => setArrowOpacity(1));
        }
    });

    return (
        <Animated.View 
            style={{transform: [{ translateX }]}}
            {...panResponder.panHandlers}            
        >
            <View style={styles.basket}>
                <Image
                    style={styles.basketImg}
                    source={basketImg}
                /> 
            </View>
        </Animated.View>
    );
};

const StartGameScreen = ({ navigation }) => {
    const [arrowOpacity, setArrowOpacity] = useState(1);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <StatusBar translucent backgroundColor='transparent' />
                <Text style={styles.title}>Go Mushrooming!</Text> 
                <View style={styles.basketContainer}>   
                    <Svg width="24" height="24" viewBox="0 0 24 24" id="arrow-left"> 
                        <G id="arrowLeft" stroke="none" strokeWidth="1" fill={Colors.black} fillRule="evenodd"> 
                            <Path d="M 14.060805,4.2826855 H 8.0458057 l -7.96100004,7.9999995 7.96100004,8 h 6.0149993 l -7.9609993,-8 z m 10.024,15.9999995 h -6.015 l -7.960999,-8 7.960999,-7.9999995 h 6.015 l -7.961,7.9999995 z" id="path2"
                            />
                        </G> 
                    </Svg>    
                    <Swiper navigation={navigation} setArrowOpacity={setArrowOpacity}/> 
                    {/* xmlns="http://www.w3.org/2000/svg"*/}          
                    <Svg width="24" height="24" viewBox="0 0 24 24" >
                        <G id="arrowRight" stroke="none" strokeWidth="1" fill={Colors.black} fillRule="evenodd" fillOpacity={arrowOpacity}>
                            <Path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/>
                        </G>
                    </Svg> 
                </View>               
            </View>
        </TouchableWithoutFeedback>
    )};  
    



const styles = StyleSheet.create({
    button: {
        width: 90,
    },      
    screen: {
        flex: 1,        
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.backGround,
    },
    title: {
        fontSize: 20,
        marginVertical: 40,
        fontWeight: 'bold',
    },
    basketContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        justifyContent: 'space-around',      
        alignItems: 'center',        
    },
    basketImg: {
        height: 150,
        width: 160,
        resizeMode: 'stretch',
        zIndex: 100,
    },
    basket: {
        flex:1,    
        justifyContent: 'space-between',
        padding: 20,
        alignItems:'center', 
        zIndex: 100,   
    },
    arrowRight: {
        zIndex: 1, 
    },
});

StartGameScreen.propTypes = {
    navigation: PropTypes.object.isRequired,     
};

Swiper.propTypes = {
    navigation: PropTypes.object.isRequired,
    setArrowOpacity: PropTypes.func.isRequired,      
};

export default StartGameScreen;
