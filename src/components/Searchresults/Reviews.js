import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';


class Reviews extends Component{
	render(){
		return(
			<div className='w-100 ba b--black bw1 mv1 flex flex-column items-center justify-center'>
				<div className='w-90 mt2 mb0 flex justify-between items-center'>
					<img className='w-20 pa1' src={this.props.photo} alt='user picture' width={45} height={45} />
					<p className='w-80 pl2 f5 tl'>{this.props.author_name}</p>
				</div>
				<div className='w-80 mt1 mb0 flex justify-between tl'>
					<span className='f5'>{this.props.rating}
					<span style={{fontSize: 18}}>
						<StarRatingComponent className='pl1' 
					       	name="rating" 
					       	starCount={5}
					       	editing={false}
					      	value={this.props.rating}
					    />
						</span>
					</span>    
					<span className='f6'>{this.props.opening_hours}</span>
				</div>
				<div className='w-80'>
						<p className='f6 tj'>{this.props.text}</p>
				</div>
			</div>
		)
	}
}
export default Reviews;