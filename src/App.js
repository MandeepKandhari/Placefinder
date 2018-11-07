import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Searchresults from './components/Searchresults/Searchresults';
import MapContainer from './MapContainer';
import './App.css';
import 'tachyons';


const initialCoords = {
  latitude:'',
  longitude:''
}

class App extends Component {
  constructor(){
    super();
    this.state={
      initialCoords:{
        latitude:0,
        longitude:0
      },
      searchCoords:initialCoords,
      centerCoords:initialCoords,
      placesArray:[]
    }
  }

coordsInitialize=()=>{
  console.log(this.state.initialCoords)
  this.setState(Object.assign(this.state.searchCoords, {latitude:'', longitude:''}));
  this.setState(Object.assign(this.state.centerCoords, {latitude:this.state.initialCoords.latitude, longitude:this.state.initialCoords.longitude}));
  this.setState({placesArray:[]})
}



componentDidMount() {
   navigator.geolocation.getCurrentPosition(success => {
   this.setState(Object.assign(this.state.initialCoords, {latitude:success.coords.latitude, longitude:success.coords.longitude}));
   this.setState(Object.assign(this.state.centerCoords, {latitude:success.coords.latitude, longitude:success.coords.longitude}));
   },failure => {
    if (failure.message.startsWith("Only secure origins are allowed")) {
    console.log('Sorry! your browser does not support geolocation api of W3C')
    }
    });
}

destinationMarkers=(data)=>{
  if(data.length>1){
    this.setState({placesArray:data})
    this.setState(Object.assign(this.state.searchCoords, {latitude:'', longitude:''}))
  }
  else{
    this.setState(Object.assign(this.state.searchCoords, {latitude:data[0].lat, longitude:data[0].lng}))
    this.setState({placesArray:[]})
  }
}

mapCenter=(latitude, longitude)=>{
  this.setState(Object.assign(this.state.centerCoords, {latitude:latitude, longitude:longitude}))
}

render() { 
  
  return (
    <div className="App">
      <Navbar />
        <div className='flex'>
        <Searchresults 
        initialCoords={this.state.initialCoords}
        coordsInitialize = {this.coordsInitialize} 
        destinationMarkers={this.destinationMarkers} 
        mapCenter={this.mapCenter}
        />
        <div className='w-70'>  
         <MapContainer initialCoords={this.state.initialCoords}
          searchCoords={this.state.searchCoords}
          centerCoords={this.state.centerCoords}
          placesArray={this.state.placesArray}
          />
      </div>
      </div>
    </div>  
    
  );
  }
}

export default App;
