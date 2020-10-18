import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import BasketScreen from './screens/BasketScreen';

const AppNavigator = createStackNavigator(
    {
        StartGame: {
            screen: StartGameScreen,
            
            navigationOptions: () => ({
                headerShown: false, 
                
            }),
        },
        Game: {
            screen: GameScreen,
            // headerMode: 'none',
            navigationOptions: () => ({
                headerShown: false,                
            }),
        },
        Basket: {
            screen: BasketScreen,            
            navigationOptions: () => ({
                headerShown: false,                
            }),
        },
    },
    {
        initialRouteName: 'StartGame',
    },
);
  
export default createAppContainer(AppNavigator);
