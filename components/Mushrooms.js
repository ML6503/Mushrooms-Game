import React from 'react';
import { StyleSheet, View, Image, } from 'react-native';
import PropTypes from 'prop-types';

const mushrooms = require('../assets/data/mushrooms.json');

const getMushrooms = () => {
    let mushroomField =[];
    const m = Object.keys(mushrooms).sort(() => Math.random() - 0.5);
    m.forEach((key) => mushroomField[key] = mushrooms[key]);
    return mushroomField;
}
const images = {
    mukhomor: require('../assets/images/mukhomor.png'),
    poganka: require('../assets/images/blednayaPoganka.png'),
    zelenushka: require('../assets/images/zelenushka.png'),
    ryzhik: require('../assets/images/ryzhik.png'),
};

const Mushroom = ({ mushroomId, style }) => {
    // console.log('id of each mushroom and pic',mushroomId, images[mushroomId]);
    return (
        <View style={styles.mushroom}>
            <Image
                mushroomId ={mushroomId}
                style={style}
                source={images[mushroomId]}
            />
        </View>
    )
};
const Mushrooms = () => {
    console.log(getMushrooms());
    
    return (
        <View style={styles.field}>            
            {Object.keys(getMushrooms()).map((key) =>(
                <Mushroom
                    key={key}
                    index={key}
                    mushroomId={getMushrooms()[key].id}
                    mushroom={getMushrooms()[key]}
                    style={styles.mushroomImg}                    
                />     
            ))}                   
        </View>
    )
};

const styles = StyleSheet.create({
    mushroomImg: {
        height: 150,
        width: 150,
        resizeMode: "contain",
    },
    mushroom: {
        flex:1,    
        justifyContent: 'space-between',
        padding: 20,
        alignItems:'center',    
    },
    field: {
        // flex: 1,
        flexDirection: 'row',
    },
});

Mushroom.propTypes = {
    mushroomId: PropTypes.string.isRequired, 
    style: PropTypes.object.isRequired,
};

export default Mushrooms;
    