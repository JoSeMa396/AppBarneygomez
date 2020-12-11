import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
var {height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

import Geolocation from '@react-native-community/geolocation';

export default class Address extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data:"",
       latitude:-16.539143,
       longitude:-68.077922
     };
  }
  
  render() {
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
        <Text>Latitud: {this.state.longitude}</Text>
        
        <MapView
          style={{width:width, height:height-60}}
            region={{
              latitude:  this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0042,
              longitudeDelta: 0.0121,
            }}
            onPress={(e) => this.onClickMap(e.nativeEvent)}
        >
          <MapView.Marker draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            onDragEnd={(e) => this.movementMarker(e.nativeEvent)}
            title="Here"
          />
        </MapView>  
        <TouchableOpacity style={{
          backgroundColor:"white",
          height:60,
          width:60,
          borderRadius:50,
          alignItems:"center",
          padding:5,
          position:"absolute",
          top:10,
          right:10
          }} onPress={()=>this.locateUser()}>
          <Icon name="locate" size={50} color={"dark"} />
        </TouchableOpacity>
      </View>
    );
  }

  locateUser()
  {
    Geolocation.getCurrentPosition((info) => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      })
    },(error)=>{
      console.log(JSON.stringify(error))
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  movementMarker(e){
    //obtiene las coordenadas del mapa
    // const latitude  = e.nativeEvent.coordinate.latitude
    // const longitude = e.nativeEvent.coordinate.longitude
    const {latitude,longitude} = e.coordinate
    //actualiza las coordenadas
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }
  onClickMap(e)
  {
    const {latitude,longitude} = e.coordinate
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
  }
}