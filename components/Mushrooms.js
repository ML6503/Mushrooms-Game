import React from 'react';
import { StyleSheet, View, Image, } from 'react-native';

const mushrooms = require('../assets/data/mushrooms.json');

function getMushrooms() {
    let mushroomField =[];
    const m = Object.keys(mushrooms).sort(() => Math.random() - 0.5);
    m.forEach((key) => mushroomField[key] = mushrooms[key]);
    return mushroomField;
}

const Mushrooms = () => {
    console.log(getMushrooms());

    return (
        <View style={styles.field}>
            <View style={styles.mushroom}>
                <Image
                    style={styles.mushroomImg}
                    source={require('../assets/images/mukhomor.png')}
                />
            </View>
            <View style={styles.mushroom}>
                <Image
                    style={styles.mushroomImg}
                    source={require('../assets/images/blednayaPoganka.png')}
                />
            </View>
            <View style={styles.mushroom}>
                <Image
                    style={styles.mushroomImg}
                    source={require('../assets/images/ryzhik.png')}
                />
            </View>
            <View style={styles.mushroom}>
                <Image
                    style={styles.mushroomImg}
                    source={require('../assets/images/zelenushka.png')}
                />
            </View>
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
        padding: 10,
        alignItems:'center',    
    },
    field: {
        // flex: 1,
        // flexDirection: 'row',
    },
});

export default Mushrooms;
    