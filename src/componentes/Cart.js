import React, { Component } from 'react';
import { Text, View, TextInput, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

var {width} = Dimensions.get("window")
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage';

export default class Cart extends Component {

  constructor(props) {
     super(props);
     this.state = {
       dataCart:[],
     };
  }

  componentDidMount(){
    AsyncStorage.getItem("cart").then((cart)=>{
      if (cart !== null){
        const cartdrink = JSON.parse(cart)
        this.setState({dataCart:cartdrink})
      }
    })
  }

  render() {
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height:20}} />
         <Text style={{fontSize:28, color:'gray', fontWeight:"bold"}}>Carrito</Text>
         <View style={{height:10}} />

         <View style={{backgroundColor:'transparent', flex:1}}>

          <ScrollView>
          {
             this.state.dataCart.map((item,i)=>{
               return(
                <View style={{width:width-20, flexDirection:'row', borderBottomWidth:2, backgroundColor:'transparent', borderColor:"#cccccc", paddingBottom:10 }}>
                <Image style={{width:width/3, height:width/3}} source={{uri: item.drink.image}} />
                <View style={{backgroundColor:'transparent', flex:1 , justifyContent:'space-between'}}>
                  <View>
               <Text style={{fontSize:20, fontWeight:'bold'}}>{item.drink.name}</Text>
                  </View>         
    
                  <View style={{backgroundColor:'transparent', flexDirection:'row', justifyContent:'space-between'}}>
               <Text style={{fontWeight:'bold', color:"#33c37d", fontSize:20}}>Bs{item.price*item.quantity}</Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>

                    <TouchableOpacity onPress={()=>this.onChangeQuat(i,false)}>
                      <Icon name="ios-remove-circle" size={30} color={"#33c37d"} />
                    </TouchableOpacity>

               <Text style={{fontWeight:'bold', paddingHorizontal:8}}>{item.quantity}</Text>

                    <TouchableOpacity onPress={()=>this.onChangeQuat(i,true)}>
                      <Icon name="ios-add-circle" size={30} color={"#33c37d"} />
                    </TouchableOpacity>
                  </View>
                  
                  </View>
                </View>
               </View>
               )
             })
           }

            <View style={{height:20}} />
            <Text style={{fontSize:28, color:"#33c37d", textAlign:"center"}}>Bs{this.onLoadTotal()}</Text>
          </ScrollView>
          
         </View>
          
        <View style={{height:10}} />

         <TouchableOpacity style={{
              backgroundColor:"#33c37d",
              width:width-40,
              alignItems:'center',
              padding:10,
              borderRadius:5
            }}>
              <Text style={{
                fontSize:24,
                fontWeight: 'bold',
                color:"white"
              }}>
                CONFIRMAR
              </Text>
            </TouchableOpacity>
            <View style={{height:10}} />
      </View>
    );
  }

  onLoadTotal()
  {
    var total = 0
    const cart = this.state.dataCart

    for (var i = 0; i < cart.length; i++){
      total = total + (cart[i].price*cart[i].quantity)
    }
    return total
  }

  onChangeQuat(i,type)
  {
    const cart = this.state.dataCart
    let cant = cart[i].quantity;

    if (type){
      cant = cant + 1
      cart[i].quantity = cant
      this.setState({dataCart:cart})
    }else if(type==false&&cant>=2){
      cant = cant - 1
      cart[i].quantity = cant
      this.setState({dataCart:cart})
    }
    else if(type==false&&cant==1){
      cart.splice(i,1)
      this.setState({dataCart:cart})
    }
  }
}