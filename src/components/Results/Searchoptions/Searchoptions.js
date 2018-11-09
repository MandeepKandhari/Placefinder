import React, { Component } from 'react';
import dish from './images/dish.png';
import bed from './images/bed.png';
import bank from './images/bank.png';
import coffee from './images/coffee.png';
import cart from './images/cart.png';
import gasstation from './images/gasstation.png';
import png from './images/png';
import './Searchoptions.css';

class Searchoptions extends Component{
	
	nearByPlaces=(searchType)=>{
		fetch('https://hybrid-bastion-218103.appspot.com/placesNearby',{
			method:'put',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
			searchType:searchType,
			location:[this.props.initialCoords.latitude, this.props.initialCoords.longitude]
    	})
	})
		.then(response=>response.json())
		.then(places=>{
			console.log(places)
			this.props.nearPlaces(places)
		})

		}

render(){
		return(
			<div className='center w-90 tl ba b--gray mt3 ph2'>
				<h3>Search this area</h3>
				<p className='red f6'>Note: Google api returns results only for restaurants and coffee places </p>
				<div className='mt3 pa3 flex flex-wrap justify-center'>
					<p className='link pointer' onClick={()=>this.nearByPlaces('restaurant')}><img className='ph3 image' src={dish}/></p>
					<p className='link pointer o-30' onClick={()=>this.nearByPlaces('lodging')}><img className='ph3 image' src={bed}/></p>
					<p className='link pointer o-30' onClick={()=>this.nearByPlaces('bank')}><img className='ph3 image' src={bank}/></p>
					<p className='link pointer' onClick={()=>this.nearByPlaces('cafe')}><img className='ph3 image' src={coffee}/></p>
					<p className='link pointer o-30' onClick={()=>this.nearByPlaces('supermarket')}><img className='ph3 image' src={cart}/></p>
					<p className='link pointer o-30' onClick={()=>this.nearByPlaces('gas_station')}><img className='ph3 image' src={gasstation}/></p>
					<p className='link pointer o-30' onClick={()=>this.nearByPlaces('hospital')}><img className='ph3 image' src={png}/></p>
				</div>
			</div>
		);
	}

}

export default Searchoptions;