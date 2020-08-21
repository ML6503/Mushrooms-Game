import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

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
        // Basket: BasketScreen,
    },
    {
        initialRouteName: 'StartGame',
    },
);
  
export default createAppContainer(AppNavigator);
