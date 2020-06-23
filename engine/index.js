const mushrooms = require('../assets/data/mushrooms.json');
const griby = require('../assets/data/griby.json');



// function getRandomUpTo(n, caseName) {
//     // console.log('We are in real getrandom!');
//     return Math.floor(Math.random() * Math.floor(n));
// }

// export const getMushrooms = () => {
//     let mushroomField =[];
//     const m = (Object.keys(mushrooms).sort(() => Math.random() - 0.5));
//     m.forEach((key) => mushroomField[key] = mushrooms[key]);
//     console.log("We are in mushroom fields", Object.keys(mushroomField));
//     return mushroomField;
// }

// export const getMushrooms = () => griby.mushrooms;
export const getMushrooms = () => {
    let mushroomField =[];
    const m = (Object.keys(griby.mushrooms).sort(() => Math.random() - 0.5));
    m.forEach((key) => mushroomField[key] = griby.mushrooms[key]);
    console.log("We are in mushroom fields", mushroomField);
    return mushroomField;
};
