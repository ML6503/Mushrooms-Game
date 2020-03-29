import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from 'react-native';

import Colors from '../constants/colors';


const StartGameScreen = props => {
    const [confirmed, setConfirmed] = useState(false);
    
    const confirmPlayHandler = () => {
        setConfirmed(true);
    };

    const backToStart = () => {
        setConfirmed(false);
    };

    const basketImg = require('../assets/images/basket.png');
    const confirmedOutput = !confirmed ? (
        <View style={styles.basket}>
            <Image
                style={styles.basketImg}
                source={basketImg}
            />
        </View>
    ):
        (
            <View style={styles.summaryContainer}>
                <Text style={styles.paragraph}>Go Mushrooming!</Text>
                <Button title="START GAME" onPress={() => props.onStartGame()} />
            </View>
        );
    
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new Game!</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="Go Back"
                            onPress={backToStart}
                            color={Colors.accent}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Play"
                            onPress={confirmPlayHandler}
                            color={Colors.primery}
                        />
                    </View>
                </View>
                {confirmedOutput}
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
        marginVertical: 10,
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
    onStartGame: PropTypes.func.isRequired, 
    
};

export default StartGameScreen;