import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';


class PlaceDescription extends Component{
	constructor(){
		super();

	}

	render(){
		return(
			<article className='w-90 center mt3'>
				<div>
					<img src={this.props.photos} alt='place image'  height={200} width={400}/>
				</div>
				<button className='w-30 pa2 mt1 ml1 mb0 ba b--black bw1 bg-white grow pointer fw6 f6 dib link'>directions</button>
				<section className='w-90 pa1 mv2 flex flex-column items-start tl'>
					<h4 className='mv0 fw5 grow'>{this.props.name}</h4>
					<div className='w-90 f6 grow flex items-center justify-between mv0 '>
						<p className='f5 flex items-center mr0'>{this.props.rating}
							<span style={{fontSize: 22}}>
							<StarRatingComponent className='pl1' 
					          name="rating" 
					          starCount={5}
					          editing={false}
					          value={this.props.rating}
					        />
					      </span>  
					      </p>
						<p className='f5  grow pl3'>({this.props.reviews}) reviews</p>
					</div>		
				</section>
			</article>
		)
	}
}
export default PlaceDescription;