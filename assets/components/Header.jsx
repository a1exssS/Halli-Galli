import React from 'react'
import Logo from '../images/Logo.png'
import LogoWebp from '../images/LogoWebp.webp'
import Form from './Form'

export default function Header() {
	return (
		<header className='header'>
			<div className='header__box'>
				<picture>
					<source loading="lazy" srcSet={LogoWebp} />
					<img src={Logo} alt="" className='header__image' />
				</picture>
				<h1 className='header__title'>Караоке</h1>
			</div>
			<Form />
		</header>
	)
}
