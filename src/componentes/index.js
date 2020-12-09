import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Drink from "./Drink";
import Cart from "./Cart";
import Address from "./Address";
import Profile from "./Profile";

var { width } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Ionicons';

console.disableYellowBox = true;

export default class Index extends Component {

  constructor(props) {
     super(props);
     this.state = {
       module:1,
     };
  }

  render() {
    return (
      <View style={{flex:1}}>
        {
          this.state.module==1?
          <Drink/>
          :this.state.module==2?
          <Cart/>
          :this.state.module==3?
          <Address/>
          :<Profile/>
        }
        <View style={styles.bottonTab}>
          <TouchableOpacity onPress={()=>this.setState({module:1})}>
            <View style={styles.itemTab}>
              <Icon name="beer-outline" size={30} color={this.state.module==1?"#900":"gray"} />
              <Text>
                Tragos
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this.setState({module:2})}>
            <View style={styles.itemTab}>
              <Icon name="basket" size={30} color={this.state.module==2?"#900":"gray"} />
              <Text>
                Carrito
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this.setState({module:3})}>
            <View style={styles.itemTab}>
              <Icon name="map" size={30} color={this.state.module==3?"#900":"gray"} />
              <Text>
                Direccion
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this.setState({module:4})}>
            <View style={styles.itemTab}>
              <Icon name="person-circle" size={30} color={this.state.module==4?"#900":"gray"} />
              <Text>
                Usuario
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottonTab:{
    width:width,
    backgroundColor:"gray",
    height:60,
    flexDirection:"row",
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
  },
  itemTab:{
    width:width/4,
    backgroundColor:"white",
    alignItems:'center',
    justifyContent:'center',
    height:60,
  }
})