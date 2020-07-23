import { getMushrooms, basketMushrooms } from '../engine';
import { MUSHROOMS_IN_GAME, BASKET_SIZE } from '../constants/constants';

const griby = require('../assets/data/griby.json');


test('We get mushroom field with random mushrooms == MUSHROOMS_IN_GAME', () => {
    
    const initalMushrooms = griby.mushrooms;
    const mushrooms = getMushrooms();
    // we check that q-ty of mushrooms == MUSHROOMS_IN_GAME
    expect(Object.keys(mushrooms).length).toEqual( MUSHROOMS_IN_GAME);

    // console.log("Griby before random", (initalMushrooms).map(a => a.id));
    // console.log("Griby after random", mushrooms.map(a => a.id));
    // we check that all mushrooms are present after random sort
    expect(initalMushrooms).toEqual(mushrooms);
});

test('We get basket with place == BASKET_SIZE  for mushrooms to pick up', () => {
        
    // we check that q-ty of places in basket == BASKET_SIZE 
    expect(Object.keys(basketMushrooms).length).toBe(BASKET_SIZE);

});