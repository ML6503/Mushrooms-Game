import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';
import { getBasketMushrooms } from '../engine';
import { images } from '../constants/imagesFungi';

const basketImg = require('../assets/images/basket.png');
const {height, width} = Dimensions.get('window');

const MushroomBasket = ({ key, index, edibility, mushroomId, mushroom, name }) => {

    return(
        <View style={styles.mushroom}>
            <Image
                mushroomId ={mushroomId}
                style={styles.mushroomImg}
                source={images[mushroomId]}
            />
        </View>
    );
};

const BasketScreen = ({ navigation }) => {
    console.log('We are in BASKETSCREEN and got mushrooms', navigation.state.params.mushroomsBasket);
    const { mushroomsBasket } = navigation.state.params.mushroomsBasket;
    return(
        <View style={styles.container}>
            <View style={styles.containerMushrooms}>
                { mushroomsBasket.map((m, index) => (
                    <MushroomBasket
                        key={index}
                        index={index}
                        edibility={m.edibility}
                        mushroomId={m.id}
                        mushroom={m}
                        name={m.name}                                          
                    />
                ))}  
            </View>
            <View style={styles.containerBasket}>{basketImg}</View>
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
});

BasketScreen.propTypes = {
    navigation: PropTypes.object.isRequired,     
    route: PropTypes.object.isRequired,     
};

export default BasketScreen;
