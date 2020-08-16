import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

const AppNavigator = createStackNavigator(
    {
        StartGame: StartGameScreen,
        Game: GameScreen,
        // Basket: BasketScreen,
    },
    {
        initialRouteName: 'StartGame',
    },
);
  
export default createAppContainer(AppNavigator);
