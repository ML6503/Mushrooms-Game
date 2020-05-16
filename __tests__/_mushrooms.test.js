import { getMushrooms } from '../engine';
import { MUSHROOMS_IN_GAME } from '../constants/constants';

const mushroomsData = require('../assets/data/mushrooms.json');


test('We get mushroom field with random mushrooms == MUSHROOMS_IN_GAME', () => {
    const mushroomsNumber = getMushrooms();
    expect(Object.keys(mushroomsNumber).length).toEqual( MUSHROOMS_IN_GAME);
});