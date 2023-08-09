import React from 'react'
import Logo from '../images/Untitled.png'
import Form from './Form'

export default function Header() {
	return (
		<header className='header'>
			<img src={Logo} alt="" className='header__image' />
			<h1 className='header__title'>Караоке</h1>
			<Form />
		</header>
	)
}
