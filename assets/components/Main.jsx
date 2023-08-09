import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import { useQuery } from '@tanstack/react-query'
import Axios from 'axios'
import Catalog from './Catalog'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Main() {
	const { FULL_URL } = useContext(AppContext)

	const { data, isLoading } = useQuery(['catalog'], () => {
		return Axios.get(FULL_URL).then((res) => JSON.parse(res.data.substr(47).slice(0, -2))
		)
	})
	const [loadMore, setLoadMore] = useState(100)

	return (
		<main className='main'>
			<h2 className="main__title">Ручной поиск</h2>
			<div className="main__box">
				<div className="main__buttons">
					<button className="main__sort">
						По исполнителю
					</button>
					<button className="main__sort">
						По названию
					</button>
				</div>
				<div className="main__items">
					{isLoading ?
						<div style={{ textAlign: 'center', marginTop: '40px' }}>
							<div className="spinner-border text-warning" style={{ width: "6rem", height: "6rem" }} role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
						:
						<Catalog isLoading={isLoading} loadMore={loadMore} data={data} />
					}
					{!isLoading &&

						<button onClick={() => setLoadMore((c) => c + 100)} className='main__button'>
							Загрузить еще 100 песен
						</button>
					}
				</div>
			</div>
		</main >
	)
}
