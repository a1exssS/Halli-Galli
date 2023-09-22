import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'
import Search from '../images/sprite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Form() {

	const [value, setValue] = useState('')
	const [error, setError] = useState('')
	const [foundData, setFoundData] = useState([])
	const [isReady, setIsReady] = useState(false)
	const [singer, setSinger] = useState('')

	const { FULL_URL, widthOfThePage } = useContext(AppContext)

	const { data, isLoading } = useQuery(['catalog'], () => {
		return Axios.get(FULL_URL).then((res) => JSON.parse(res.data.substr(47).slice(0, -2))
		)
	})

	const submitHendler = (e, array, value) => {
		if (value.length < 2) {
			setError('Должно быть введено минимут 2 символа')
			e.preventDefault()
		}
		else {
			setError('')
			e.preventDefault()
			function findObjectsByName(array, targetName) {
				const similarObjects = [];

				for (const obj of array) {
					if (obj.c[2].v.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").includes(targetName.toLowerCase())) {
						setSinger(obj.c[2].v.toLowerCase())
						similarObjects.push(obj);
					}
					if (obj.c[1].v.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").includes(targetName.toLowerCase())) {
						setSinger(obj.c[2].v.toLowerCase())
						similarObjects.push(obj);
					}
				}

				return similarObjects;
			}

			const targetName = value.toLowerCase();

			const similarObjects = findObjectsByName(array, targetName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));
			setFoundData(similarObjects);
			setIsReady(true)
			setValue('')
		}

	}

	return (
		<>
			<form action="" className="header__form" style={!isReady ? { marginBottom: '40px' } : { marginBottom: '0px' }} onSubmit={(e) => submitHendler(e, data.table.rows, value)}>
				<input value={value} onChange={(e) => setValue(e.target.value)} type="text" className="header__input" placeholder='Пример: Рюмка водки' />
				<button className={`header__button ${value == '' && 'disabled'}`}>
					{widthOfThePage < 769 ? <svg className="header__image-icon">
						<use href={`${Search}#search`} />
					</svg> :
						<>
							Найти
							<svg className="header__image-icon">
								<use href={`${Search}#search`} />
							</svg>
						</>
					}
				</button>
			</form>
			<span className='header__error'>{error && error}</span>
			{isReady &&
				<div className="header__search-results">
					<span className='header__text'>
						Результаты поиска
					</span>
					{foundData.length !== 0 ? foundData.map((item, index) => {
						return <div className="header__result" key={index}>
							<div>
								<span className='header__result-id'>
									{item.c[0].v}
								</span>
								<span className='header__result-singer'>
									{item.c[2].v}
								</span>

							</div>
							<span className='header__result-title'>
								{item.c[1].v}
							</span>
						</div>
					}) : <span className='header__text-not-found'>извините но мы не нашли вашу музыку</span>}
				</div>
			}
		</>
	)
}
