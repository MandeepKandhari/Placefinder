import React, { Component } from 'react';
import Placecard from '../Placecard/Placecard';
import Placecards from '../Placecard/Placecards';
import Searchbar from '../Searchbar/Searchbar';
import Searchoptions from '../Searchoptions/Searchoptions';



const dataInitialState={
	address:'',
    icon:'',
    phone_number:'',
    name:'',
    types:[],
    photoUrl:'',
    opening_hours:{
      open_now:'',
      weekday_text:[],  
    },
    plus_code:{
    	compound_code:''
    },
    photos:[{
    html_attributions:[]
    }],
    rating:'',
    vicinity:'',
    website:'',
    reviews:[{
      author_name:'',
      text:''
    }],
    geometry:{
      location:{
        lat:0,
        lng:0
    	}
	}
}

const initialState={
	input:'',
	searchQuery:[],
	places:[],
	nearPlaces:[],
	suggestion:'',
	data:dataInitialState
}

class Searchresults extends Component{
	constructor(){
		super();
		this.state = initialState 
	}

onBlur=()=>{
	this.onSuggestionClick()
	this.setState({searchQuery:[]})
}



onInputChange=(event)=>{
  this.setState({input:event.target.value})
  
  fetch('https://hybrid-bastion-218103.appspot.com/search',{
  method:'put',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    searchQuery:this.state.input,
    location:[this.props.initialCoords.latitude, this.props.initialCoords.longitude]
    })
})
.then(response=>response.json())
.then(queryResults=>this.setState({searchQuery:queryResults}))
.catch(err=>console.log('searchQuery', err))
}



onButtonSubmit=()=>{
  fetch('https://hybrid-bastion-218103.appspot.com/textsearch',{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    query:this.state.input,
    location:[this.props.initialCoords.latitude, this.props.initialCoords.longitude]
    })
})
.then(response=>response.json())
.then(data=>{
  if(Array.isArray(data)){
    this.setState({data:dataInitialState})
    this.setState({places:data})
    this.locationMarkers()
    this.props.mapCenter(this.props.initialCoords.latitude, this.props.initialCoords.longitude)
}
  else{
    this.setState({places:[ ]})
    this.setState({data:data})
   	this.placePhoto(this.state.data.photos[0].photo_reference)
    const placeLocation = [];
    placeLocation[0] = data.geometry.location
    this.props.destinationMarkers(placeLocation)
    this.props.mapCenter(placeLocation[0].lat, placeLocation[0].lng)
 	}

})
}

onContainerClick=(placeName)=>{

	fetch('https://hybrid-bastion-218103.appspot.com/placesSearch',{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    placeid:placeName,
    })
})
.then(response=>response.json())
.then(data=>{
	this.setState({places:[ ]})
    this.setState({data:data})
   	this.placePhoto(this.state.data.photos[0].photo_reference)
    const placeLocation = [];
    placeLocation[0] = data.geometry.location
    this.props.destinationMarkers(placeLocation)
    this.props.mapCenter(placeLocation[0].lat, placeLocation[0].lng)
})

}										

placePhoto=(photo_reference)=>{
	fetch('https://hybrid-bastion-218103.appspot.com/photo',{
	  method:'put',
	  headers:{'Content-Type':'application/json'},
	  body:JSON.stringify({
	    photoreference:photo_reference
	    })
	})
	.then(response=>response.json())
	.then(url=>this.setState({photoUrl:url}))

}

onSuggestionClick=(suggestion)=>{
	this.setState({input:suggestion})
	this.onButtonSubmit()

}

locationMarkers=()=>{
	const placesLocation = [];
    this.state.places.map((num,i)=>{
    	placesLocation[i] = num.geometry.location
    })
    this.props.destinationMarkers(placesLocation)
}

nearPlaces=(nearPlaces)=>{
	this.setState({places:nearPlaces})
	this.locationMarkers()
}
onInitialStageClick=()=>{
	this.props.coordsInitialize()
	this.setState(initialState)
}

	render(){
		return(
			<div className='w-30-l w-80 pa0 flex flex-column items-center'>
				<Searchbar 
				onInputChange = {this.onInputChange}
				onButtonSubmit = {this.onButtonSubmit} 
				onInitialStageClick = {this.onInitialStageClick}
				onSuggestionClick = {this.onSuggestionClick}
				initialCoords = {this.props.initialCoords}
				searchQuery	= {this.state.searchQuery}
				onBlur = {this.onBlur}
				/>
				{
					this.state.data !== dataInitialState 
					?<Placecard 
						address={this.state.data.formatted_address}
						phone_number={this.state.data.formatted_phone_number}
						name={this.state.data.name} 
						website={this.state.data.website}
						rating={this.state.data.rating}
						opening_hours={this.state.data.opening_hours}
						compound_code={this.state.data.plus_code.compound_code}
						type={this.state.data.types[0]}
						reviews={this.state.data.reviews}
						photos={this.state.photoUrl}
					/>
					:(this.state.places.length > 0
						?<div className='w-100 mt3 flex flex-column items-center'>
							<div className='w-90 flex flex-column items-center h-100 overflow-y-scroll ba'>
							{
								this.state.places.map((num,i)=>{
									return(
										num.formatted_address && num.photos 
										?<Placecards 
										id={num.place_id}
										address={num.formatted_address}
										name={num.name}
										opening_hours={num.opening_hours.open_now}
										photos={num.photos[0].photo_reference}
										rating={num.rating}
										onContainerClick={this.onContainerClick}
										/>
										:(num.photos
											?<Placecards
										id={num.place_id}
										address={num.vicinity}
										name={num.name}
										opening_hours={num.opening_hours.open_now}
										photos={num.photos[0].photo_reference}
										rating={num.rating}
										onContainerClick={this.onContainerClick}
										/>
										:null)
										)
									})
								}
								</div>
							</div>	
							:<Searchoptions 
							initialCoords={this.props.initialCoords}
							nearPlaces={this.nearPlaces}
							/>
						)	
					}
				</div>
			);
		}
	}

export default Searchresults;


/*
	<p><span>photos:</span>{this.props.data.photos[0].html_attributions[0]}</p>
		      	<p><span>review author:</span>{this.props.data.reviews[0].author_name}</p>
		      	<p><span>user review:</span>{this.props.data.reviews[0].text}</p>


	placePhoto=(photo_reference)=>{
	fetch('http://localhost:3002/photo',{
	  method:'put',
	  headers:{'Content-Type':'application/json'},
	  body:JSON.stringify({
	    photoreference:photo_reference
	    })
	})
	.then(response=>response.json())
	.then(photo=>console.log(photo))
}

      		
*/