import React from 'react'

export default function Catalog({ data, isLoading, loadMore }) {


	const dataTable = !isLoading && data.table.rows

	return (
		dataTable.map((item, index) => {
			if (index < loadMore) {
				return <div className="main__item" key={index} >
					<div>
						<span className='main__result-id'>
							{item.c[0].v}
						</span>
						<span className='main__result-singer'>
							{item.c[2].v}
						</span>
					</div>
					<span className='main__result-title'>
						{item.c[1].v}
					</span>
				</div>
			}
		})
	)

}
