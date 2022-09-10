import { Audio } from 'expo-av';

import { status as statusConst, BASKET_SIZE } from '../constants/constants';

// const mushrooms = require('../assets/data/mushrooms.json');
import  griby from '../assets/data/griby.json';



export const getMushrooms = () => {
    let mushroomField = griby.mushrooms.sort( () => Math.random() - 0.5).slice(0, 9);
    mushroomField.forEach((m, index) => mushroomField[index] = {...m});
 
    return mushroomField;
};


// we need to find mushroom with status IN_BASKET
//and put it into basket

export const getBasketMushrooms = (mushrooms) => {
    const basketMushrooms =  mushrooms.filter((m) => m.status === statusConst.IN_BASKET);
    while (basketMushrooms.length < BASKET_SIZE) { 
        basketMushrooms.push("") 
    }
    return basketMushrooms;
};

export const playSound = async (setSound, soundType) => {
       

    const { sound } = await Audio.Sound.createAsync(
        soundType
    );

    setSound(sound);
  
    await sound.playAsync();
};
