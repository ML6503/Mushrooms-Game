import React from 'react';
import { StyleSheet, View, Image, } from 'react-native';

const basketImg = require('../assets/images/basket.png');

const Basket = () => {
    return (        
   
        <View style={styles.basket}>
            <Image
                style={styles.basketImg}
                source={basketImg}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    basketImg: {
        height: 50,
        width: 50,
        resizeMode: "contain",
    },
    basket: {
        flex:1,    
        justifyContent: 'space-between',
        padding: 10,
        alignItems:'center',    
    },
});

export default Basket;
