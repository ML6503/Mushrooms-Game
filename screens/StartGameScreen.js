import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Dimensions,
    Animated,
    PanResponder,
} from 'react-native';


const basketImg = require('../assets/images/basket.png');

const Swiper = ({ navigation }) => {

    // adding animated values
    const translateX = new Animated.Value(0); 

    console.log(translateX);
    // PanResponder code
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
            Animated.event([null, { dx: translateX }], {useNativeDriver: false})(e, gesture);
     
        },
        onPanResponderRelease: () => { 
            navigation.navigate('Game');         
                  
            Animated.timing(translateX, {
                toValue: 0,               
                useNativeDriver: true
            }
            ).start();
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

               
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}>Go Mushrooming!</Text>    
                
                <Swiper navigation={navigation}/>           
                            
            </View>
        </TouchableWithoutFeedback>
    );  
    
};


const styles = StyleSheet.create({
    button: {
        width: 90,
    },      
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        // justifyContent: 'center',
        paddingHorizontal: 15,
    },
    summaryContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    paragraph: {
        margin: 24,
        marginTop: 50,
        fontSize: 50,
        fontStyle:'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        textShadowRadius: 10,
        textShadowColor: 'black',
    },
    basketImg: {
        height: 150,
        width: 150,
        resizeMode: "contain",
    },
    basket: {
        flex:1,    
        justifyContent: 'space-between',
        padding: 20,
        alignItems:'center',    
    },
});

StartGameScreen.propTypes = {
    navigation: PropTypes.object.isRequired,     
};

Swiper.propTypes = {
    navigation: PropTypes.object.isRequired,     
};
// BasketImage.propTypes = {
//     navigation: PropTypes.object.isRequired,     
//     styleBasket: PropTypes.object.isRequired, 
//     styleBasketImg: PropTypes.object.isRequired, 
// };

export default StartGameScreen;
