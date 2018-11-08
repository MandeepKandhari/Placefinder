import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Placecards extends Component{
	constructor(){
		super();
		this.state={
			imageUrl:''
		}
		}

	
componentDidMount(){
	this.placePhotos()
}

placePhotos=()=>{
	fetch('https://hybrid-bastion-218103.appspot.com/photo',{
	  method:'put',
	  headers:{'Content-Type':'application/json'},
	  body:JSON.stringify({
	    photoreference:this.props.photos
	    })
	})
	.then(response=>response.json())
	.then(url=>{
		this.setState({imageUrl:''}); 
		this.setState({imageUrl: url})
	})
}

	render(){
		return(
			<article className='w-90 ba b--black bw1 grow mv2 flex justify-around pointer' onClick={()=>this.props.onContainerClick(this.props.id)}>
				<section className='w-60 tl ma2 ph1 flex flex-column items-start'>
					<h4 className='mv0'>{this.props.name}</h4>
					<div className='f6 ' >
						<div className='flex items-center'>
							<p className='mv0'>{this.props.rating}</p>
							<span style={{fontSize: 18}}>
								<StarRatingComponent className='pl1' 
					         	name="rating" 
					         	starCount={5}
					         	editing={false}
					         	value={this.props.rating}
					        	/>
					     	</span>
					    </div>
						<p className='mv0'>{this.props.address}</p>
						<p className='mv0'>{this.props.opening_hours}</p>
					</div>
				</section>	
				<div className='w-30 ma2'>
					<img src={this.state.imageUrl} alt='place image' width={100} height={100}/>
				</div>
			</article>
		)
	}
}

export default Placecards;