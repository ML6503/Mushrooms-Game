import React from 'react';
import { StyleSheet, View, Image, } from 'react-native';

const Mushrooms = () => (
<View style={styles.field}>
        <View style={styles.mushroom}>
          <Image
            style={styles.mushroomImg}
            source={require('../assets/images/mukhomor.png')}
            />
       </View>
       <View style={styles.mushroom}>
          <Image
          style={styles.mushroomImg}
          source={require('../assets/images/blednayaPoganka.png')}
          />
         </View>
         <View style={styles.mushroom}>
           <Image
          style={styles.mushroomImg}
          source={require('../assets/images/ryzhik.png')}
          />
        </View>
        <View style={styles.mushroom}>
          <Image
          style={styles.mushroomImg}
          source={require('../assets/images/zelenushka.png')}
          />
        </View>
      </View>
);

const styles = StyleSheet.create({
    mushroomImg: {
      height: 150,
      width: 150,
      resizeMode: "contain",
    },
    mushroom: {
      flex:1,    
      justifyContent: 'space-between',
      padding: 10,
      alignItems:'center',    
    },
    field: {
      // flex: 1,
      // flexDirection: 'row',
    },
  });

export default Mushrooms;
    