import React, { Component } from 'react';
import { Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, View, ScrollView, TextInput} from 'react-native';



var {height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper'

import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      dataBanner:[],
      dataCategories:[],
      dataDrink:[],
      selectCatg:0
    }
  }

  
  componentDidMount()
  {
    // const url = "http://tutofox.com/foodapp/api.json";
    const url = "https://cristiansandyflores.github.io/paginaExamen/data.json";
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        isLoading: false,
        dataBanner: responseJson.banner,
        dataCategories: responseJson.categories,
        dataDrink: responseJson.drinks
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor:"#f2f2f2" }}>
          <View style={{width: width, alignItems:'center'}} >
              <Image resizeMode="contain" style={{height:60, width:width/2, margin:10 }} source={{uri:'https://detarijalomejor.com/avisos/wp-content/uploads/2020/08/logo.jpg'}} />
              <Swiper style={{height:width/2}}  showsButtons={false} autoplay={true} autoplayTimeout={3}>
                {
                  this.state.dataBanner.map((itemmap)=>{
                    return(
                      <Image style={styles.imageBanner} resizeMode="contain" source={{uri:itemmap}}/>
                    )
                  })
                }
              </Swiper>
          </View>
          <View style={{width:width, borderRadius:20, paddingVertical:20, backgroundColor: 'white'}}>
              <View style={{height:10}} />
          <FlatList
            horizontal={true}
            data={this.state.dataCategories}
            renderItem={({item})=>this._renderItem(item)}
            keyExtractor = {(item, index)=>index.toString()}
          />
          <FlatList
            data={this.state.dataDrink}
            numColumns={2}
            renderItem={({item})=>this._renderItemDrink(item)}
            keyExtractor = {(item, index)=>index.toString()}
          />
          </View> 
        </View>
      </ScrollView>
    );
  }

  _renderItemDrink(item){
    let catg = this.state.selectCatg
    if (catg==0||catg==item.categorie) {
      return(
        <TouchableOpacity style={styles.divDrink}>
          <Image style={styles.imageDrink}
          resizeMode="contain" source={{uri:item.image}}/>
          <View style={{height:((width/2)-20)-90, width:((width/2)-20)-10, backgroundColor:'transparent'}}/>
          <Text style={{fontWeight: 'bold', fontSize:22, textAlign:'center'}}>{item.name}</Text>
          <Text style={{fontSize:20, color:'green'}}>Bs{item.price}</Text>
          <TouchableOpacity 
            style={{width:(width/2)-40,
            backgroundColor: "#33c37d",
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:5,
            padding:5,
            flexDirection:'row'
          }}
          onPress={()=>this.onClickAddCart(item)}
          >
            <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Añadir Carrito</Text>
            <View style={{width:10}} />
            <Icon name="ios-add-circle" size={30} color={"white"} />
          </TouchableOpacity>
        </TouchableOpacity>
      )
    }
  }

  _renderItem(item){
    return(
      <TouchableOpacity 
      onPress={()=>this.setState({selectCatg:item.id})}
      style={[styles.divCategories,{backgroundColor:item.color}]}>
        <Image
          style={{width:100, height:80}}
          resizeMode="contain"
          source={{uri:item.image}} />
          <Text style={{fontWeight:'bold', fontSize:22}}>
            {item.name}
          </Text>
          </TouchableOpacity>
    )
  }

  onClickAddCart(data){
    const itemcart = {
      drink:data,
      quantity:1,
      price: data.price
    }
    AsyncStorage.getItem("cart").then((datacart)=>{

      if(datacart!==null){
        const cart = JSON.parse(datacart)
        cart.push(itemcart)
        AsyncStorage.setItem("cart", JSON.stringify(cart))
      }
      else{
        const cart = []
        cart.push(itemcart)
        AsyncStorage.setItem("cart", JSON.stringify(cart))
      }
      alert("Añadido Exitosamente")
    })
    .catch((error)=>{
      alert("errooor")
    })
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height:width/2,
    width:width-40,
    borderRadius:10,
    marginHorizontal:20
  },
  titleCatg:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },
  divCategories:{
    backgroundColor:'red',
    margin:5, 
    alignItems:'center',
    borderRadius:10,
    padding:10
  },
  imageDrink:{
    width:((width/2)-20)-10,
    height:((width/2)-20)-30,
    backgroundColor:'transparent',
    position:'absolute',
    top:-45
  },
  divDrink:{
    width:(width/2)-20,
    padding:10,
    borderRadius:10,
    marginTop:55,
    marginBottom:5,
    marginLeft:10,
    alignItems:'center',
    elevation:8,
    shadowOpacity:0.3,
    shadowRadius:50,
    backgroundColor:'white',
  }
});