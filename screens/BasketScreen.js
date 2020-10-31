import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../constants/imagesFungi';
import Colors from '../constants/colors';

const basketImg = require('../assets/images/basket.png');
const {height, width} = Dimensions.get('window');
const { edibility: edibilityConst } = require('../constants/constants');

// const mushroomImg = ( mushrooms) => mushrooms.map((m, index) => ( <Image key={index} style={styles.mushroomImg} source={images[m.id]} />));
const mushroomImg = ( mushrooms, edibility) => mushrooms.map((m, index) => {
    if (m.edibility === edibility) {
        return ( <Image key={index}  style={styles.mushroomImg} source={images[m.id]} />)
        // style={styles.mushroomImg}
    }
});

const BasketScreen = ({ navigation }) => {    
    const  mushroomsBasket = navigation.state.params.mushroomsBasket;
    const zeroEdible = mushroomsBasket.findIndex((m) => m.edibility === edibilityConst.EDIBLE ) === -1 ? true : false;
    const  zeroPoisonous = mushroomsBasket.findIndex((m) => m.edibility === edibilityConst.POISONOUS ) === -1 ? true : false;   
    
    return (
        <View style={styles.container}>
            <View style={styles.containerMushrooms}> 
                <View style={styles.edibleMushrooms}>                     
                    <Text style={styles.mushroomsHeader}>Edible</Text>                     
                    {zeroEdible ? (
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>No Edible Mushrooms. Try Again!</Text>
                        </View>)
                        : (<View style={styles.mushroom}>
                            {mushroomImg(mushroomsBasket, edibilityConst.EDIBLE)}
                        </View>
                        )}            
                </View>              
                <View style={styles.poisonousMushrooms}>                    
                    <Text style={styles.mushroomsHeader}>Poisonous</Text>
                    {zeroPoisonous ? (
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>No Poisonous Mushrooms! Well done!</Text>
                        </View>)                                     
                        : (<View style={styles.mushroom}>
                            {mushroomImg(mushroomsBasket, edibilityConst.POISONOUS)}
                        </View>
                        )}
                </View>
            </View>
            <View style={styles.containerBasket}>
                <Image
                    style={styles.basketImg}
                    source={basketImg}
                />
            </View>
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
        flexDirection: 'row',
        justifyContent: 'center',     
        height: height,
        borderColor: 'red',
        borderWidth: 2,        
    },
    edibleMushrooms: {
        flexBasis: '50%',
        justifyContent: 'flex-start',
        backgroundColor: Colors.backGround,
    },
    poisonousMushrooms: {
        flexBasis: '50%',
        justifyContent: 'flex-start',
        backgroundColor: Colors.poisonousRed,
    },    
    mushroom: {
        alignItems:'center',
        // flexBasis: "33.33%",              
        // height: "33.33%",
        justifyContent: 'center',
        // width: "33.33%",
        zIndex: 100,
    },
    mushroomsHeader: {
        textAlign: "center",
        paddingTop: "2%",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Colors.white,
    },
    text: {
        textAlign: "center",
        // paddingTop: "2%",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Colors.black,
        padding:'10%',    
    },
    textWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    containerBasket: {
        flexBasis: '15%',
        alignSelf: 'flex-start',
        alignItems: 'center',
        paddingTop: '5%',
    },
    basketImg: {
        height: 70,
        width: 70,
        resizeMode: "contain",
    },
    mushroomImg: {
        height: 70,
        resizeMode: "contain",
        width: 70,
        zIndex: 101,           
    },    
});

BasketScreen.propTypes = {
    navigation: PropTypes.object.isRequired,   
};

export default BasketScreen;
