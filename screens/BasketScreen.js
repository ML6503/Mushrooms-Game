import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getBasketMushrooms } from '../engine';
import { images } from '../constants/imagesFungi';

const basketImg = require('../assets/images/basket.png');
const {height, width} = Dimensions.get('window');

const mushroomImg = ( mushrooms) => mushrooms.map((m, index) => ( <Image key={index} style={styles.mushroomImg} source={images[m.id]} />));

const BasketScreen = ({ navigation }) => {
    
    const  mushroomsBasket = navigation.state.params.mushroomsBasket;
    console.log('We are in BASKETSCREEN and got mushrooms', mushroomsBasket);
    return(
        <View style={styles.container}>
            <View style={styles.containerMushrooms}>
                {/* { mushroomsBasket.map((m, index) => ( <Image key={index} style={styles.mushroomImg} source={images[m.id]} />))}   */}
                {mushroomImg(mushroomsBasket)}
            </View>
            <View style={styles.containerBasket}>
                <Image
                    style={styles.basketImg}
                    source={basketImg}
                /></View>
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
    basketImg: {
        height: 50,
        width: 50,
        resizeMode: "contain",
    },
    mushroomImg: {
        height: 100,
        resizeMode: "contain",
        width: 100,
        zIndex: 101,           
    },    
});

BasketScreen.propTypes = {
    navigation: PropTypes.object.isRequired,   
};

export default BasketScreen;
