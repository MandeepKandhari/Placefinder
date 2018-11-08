import React, { Component } from 'react';
import './Location.css';
import clock from './images/clock.png';
import compound_code from './images/compound_code.png';
import globe from './images/globe.png';
import location from './images/location.png';
import phone from './images/phone.png';
import caret from './images/caret.png'


const show={
	display:'block'
}

const noShow={
	display:'none'
}

class Location extends Component{
	constructor(){
		super();
		this.state={
			style:noShow
		}
	}

displayTimings=()=>{
	if(this.state.style === noShow){
		console.log(this.state.style)
		this.setState({style:show})
	}
	else if(this.state.style === show){
		console.log(this.state.style)
		this.setState({style:noShow})
	}
}
	render(){
		return(
			<section className='w-90 flex flex-column items-start'>
				<div className='w-90 f6 pv1 flex justify-around items-center tc ba'>
					<img className='w-10' src={location} alt='' width={30} height={30}/>
					<p className='w-80 tl'>{this.props.address}</p>
				</div>
				<div className='w-90 f6 pv1 flex justify-around items-center tc ba'>
					<img className='w-10' src={compound_code} alt='' width={30} height={30}/>
					<p className='w-80 tl'>{this.props.compound_code}</p>
				</div>
				<div className='w-90 f6 pv1 flex justify-around items-center tc ba'>
					<img className='w-10' src={globe} alt='' width={30} height={30}/>
					<p className='w-80 tl'>{this.props.website}</p>
				</div>
				<div className='w-90 f6 pv1 flex justify-around items-center tc ba'>
					<img className='w-10' src={phone} alt='' width={30} height={30}/>
					<p className='w-80 tl'>{this.props.phone_number}</p>
				</div>
				<div className='w-90 f6 pv1 flex justify-around items-center tc ba'>
					<img className='w-10' src={clock} alt='' width={30} height={30}/>
					<p className='w-80 tl'>
						{this.props.open_now
							?<p className='flex items-center'>open now:<img className='pl2 pointer' src={caret} alt='' onClick={this.displayTimings}/>
								<span className='dropdown'>
									<span className='dropdownContent ba pa0'  style={this.state.style}>{this.props.open_now.weekday_text.map((num,i)=>{
										return(<p className='f6 ba ph1 mv0'>{num}</p>)
									})}
									</span>
								</span>
							</p>
							:<span className='red fw5'>Closed</span>
						}
					</p>
				</div>
			</section>
		)
	}
}
export default Location;