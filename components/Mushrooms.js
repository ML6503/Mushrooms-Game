import React from 'react';
import { StyleSheet, View, Image, } from 'react-native';

const mushrooms = require('../assets/data/mushrooms.json');

function getMushrooms() {
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

const Mushrooms = () => {
    console.log(getMushrooms());
    //const grib = 'mukhomor';
    // const mukhomorImg =((Object.values(getMushrooms()).find(m => m.id === grib)).img).valueOf();
    const mukhomorImg = require('../assets/images/mukhomor.png');
    
    //  const mukhomor = valueOf((getMushrooms().find(m => m.id === grib)).img);
    //  console.log(mukhomor);
    return (

        <View style={styles.field}>
            <View style={styles.mushroom}>
                <Image
                    style={styles.mushroomImg}
                    source={mukhomorImg}
                />
            </View>
        </View>

    // <View style={styles.field}>
    //     <View style={styles.mushroom}>
    //         <Image
    //             style={styles.mushroomImg}
    //             source={require('../assets/images/mukhomor.png')}
    //         />
    //     </View>
    //     <View style={styles.mushroom}>
    //         <Image
    //             style={styles.mushroomImg}
    //             source={require('../assets/images/blednayaPoganka.png')}
    //         />
    //     </View>
    //     <View style={styles.mushroom}>
    //         <Image
    //             style={styles.mushroomImg}
    //             source={require('../assets/images/ryzhik.png')}
    //         />
    //     </View>
    //     <View style={styles.mushroom}>
    //         <Image
    //             style={styles.mushroomImg}
    //             source={require('../assets/images/zelenushka.png')}
    //         />
    //     </View>
    // </View>
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
    