const { status: statusConst, BASKET_SIZE } = require('../constants/constants');

// const mushrooms = require('../assets/data/mushrooms.json');
const griby = require('../assets/data/griby.json');



export const getMushrooms = () => {
    let mushroomField = griby.mushrooms.sort( () => Math.random() - 0.5);
    mushroomField.forEach((m, index) => mushroomField[index] = {...m});
 
    return mushroomField;
};

// const basketMushrooms = new Array(BASKET_SIZE).fill().map(() => { return {}; });    
const basket = new Array(BASKET_SIZE).fill("");

// we need to find mushroom with status IN_BASKET
//and put it into basket
// export const getBasketMushrooms = (mushrooms) => [...mushrooms].filter(m => m.status === statusConst.IN_BASKET).concat(basket).slice(0, BASKET_SIZE);  

export const getBasketMushrooms = (mushrooms) => {
    const basketMushrooms =  mushrooms.filter((m) => m.status === statusConst.IN_BASKET);
    while (basketMushrooms.length < BASKET_SIZE) { 
        basketMushrooms.push("") 
    }
    return basketMushrooms;
}; 