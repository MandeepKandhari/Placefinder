import React, { Component } from 'react';
import './Searchbar.css';
import search from './images/search.png';
import cross from './images/cross.png';

let style={
	display:'inlineBlock'
}

class Searchbar extends Component{

render(){
	return(
		<div className='w-90 mt3 ba background flex flex-column items-center pv3'>
			<div className='w-90 flex flex-wrap mt2 mb0 pa2'>
				<input className='w-70-l w-50 pa2 ba b--black bw1 mt1 mb0 mr0' type='text' placeholder='Enter your queries here...' 
				onChange={this.props.onInputChange} 
				onBlur={this.props.onBlur}
				/>
				<span className='pa2 mt1 ml1 mb0 ba b--black bw1 bg-white grow pointer fw6 f6 dib link' 
				onClick={this.props.onButtonSubmit}><img src={search} alt='' /></span>
				
				<span className='pa2 mt1 ml1 mb0 ba b--black bw1 bg-white grow pointer fw6 f6 dib link' 
				onClick={this.props.onInitialStageClick}><img src={cross} alt='' /></span>
				
				<div className='w-100 dropdown'>
				{this.props.searchQuery.map((num,i)=>{
					return(
						<div className='w-70 bl br bb bw1 pv0'>
							<p className='mv0 pv2 pointer bg-white  ph2' 
								onClick={()=>this.props.onSuggestionClick(num.structured_formatting.main_text)}
							>
							{num.structured_formatting.main_text}
							</p>
						</div>
						)
				})}
			</div>
  			</div>
		</div>
	);
	}

}

export default Searchbar;

