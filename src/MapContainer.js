import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
const style = {
  width: '100%',
  height: '100%',
}

const containerStyle={
  width:'70%',
  height:'100%'
}


class MapContainer extends Component {




  render() {
    return (
      <Map containerStyle={containerStyle} google={this.props.google} zoom={11} style={style} 
      initialCenter={{
            lat: this.props.initialCoords.latitude,
            lng: this.props.initialCoords.longitude
          }} 
      center={{
            lat: this.props.initialCoords.latitude,         //shouldComponentUpdate
            lng: this.props.initialCoords.longitude
          }}
         >
          <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat:this.props.initialCoords.latitude, lng: this.props.initialCoords.longitude}}
          />
          {
            this.props.placesArray.length === 0 
            ?<Marker
              title={'The marker`s title will appear as a tooltip.'}
              name={'SOMA'}
              position={{lat:this.props.searchCoords.latitude, lng: this.props.searchCoords.longitude}}
            /> 
            : this.props.placesArray.map(num=>{
              return(<Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat:num.lat, lng: num.lng}} 
              />)    
              })   
          }
      <InfoWindow onClose={this.onInfoWindowClose}>
            
      </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDk_6FzGzfxK3Bzc0InMjQDNKtPUdhXtuY'
})(MapContainer)


/*


*/