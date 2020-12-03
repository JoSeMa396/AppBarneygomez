import React, { Component } from 'react';
import { Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, View, ScrollView, TextInput} from 'react-native';

var {height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper'

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      dataBanner:[],
      dataCategories:[],
      selectCatg:0
    }
  }
  
  componentDidMount()
  {
    const url = "http://tutofox.com/foodapp/api.json";
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        isLoading: false,
        dataBanner: responseJson.banner,
        dataCategories: responseJson.categories
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
              <Image resizeMode="contain" style={{height:60, width:width/2, margin:10 }} source={{url:'https://tutofox.com/foodapp/foodapp.png'}} />
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
              <Text style={styles.titleCatg}>Categorías {this.state.selectCatg}</Text>
          <FlatList
            horizontal={true}
            data={this.state.dataCategories}
            renderItem={({item})=>this._renderItem(item)}
            keyExtractor = {(item, index)=>index.toString()}
          />
          </View>
         
          <Text>App Barney Gomez</Text>
              <Text>{JSON.stringify(this.state.dataCategories)}</Text>  
        </View>
      </ScrollView>
    );
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
  }
});