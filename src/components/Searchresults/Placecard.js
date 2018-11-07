import React, { Component } from 'react';
import Reviews from './Reviews';
import Location from './Location/Location';
import PlaceDescription from './PlaceDescription';


class Placecard extends Component{
	render(){
		return(
			<article className='w-90 ba b--gray mt3 flex flex-column items-center'>
					<PlaceDescription 
					name={this.props.name}
					rating={this.props.rating}
					reviews={this.props.reviews.length}
					photos={this.props.photos}
					/>

					<h3 className='w-90 tl'>Comments</h3>
					
					<Location 
					address={this.props.address}
					compound_code={this.props.compound_code}
					website={this.props.website}
					phone_number={this.props.phone_number}
					open_now={this.props.opening_hours}
					/>
					
					<aside className='w-90 mt3 flex flex-column'>
						<h3 className='mv0 tl'>Review Summary</h3>
						<div className='mt3 h-50 overflow-y-scroll'>
						{
							this.props.reviews.map((num,i)=>{
								return(
									<Reviews
									photo={num.profile_photo_url}
									author_name={num.author_name}
									rating={num.rating}
									opening_hours={num.relative_time_description}
									text={num.text}
									/>
								);
							})
						}
						</div>
					</aside>		
			</article>
		);
	}

}

export default Placecard;


	//photos={this.state.data.photos}
							