import React, { Component } from 'react';
import Logo from './image/Logo.png';
import './Navbar.css';

class Navbar extends Component{
	render(){
		return(
			<div className='center flex items-center justify-center pa2 navbackground'>
				<div className='w-30 pt2 rotate-vert-center center'>
					<img src={Logo} alt='Google Map Logo' width={100} height={100}/>
				</div>
				<div className='w-70 pt2'>
					<h1 className='f2 light-yellow'>Place Finder</h1>
				</div> 
			</div>
		);
	}

}

export default Navbar;