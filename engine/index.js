const mushrooms = require('../assets/data/mushrooms.json');



// function getRandomUpTo(n, caseName) {
//     // console.log('We are in real getrandom!');
//     return Math.floor(Math.random() * Math.floor(n));
// }

export const getMushrooms = () => {
    let mushroomField =[];
    const m = (Object.keys(mushrooms).sort(() => Math.random() - 0.5));
    m.forEach((key) => mushroomField[key] = mushrooms[key]);
    console.log("We are in mushroom fields", Object.keys(mushroomField));
    return mushroomField;
}
