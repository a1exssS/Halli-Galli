import React, { createContext, useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const SHEET_ID = '14zKqxk2vKf3VSv3NzkeFcPKOTRylvEDJVvE5Nxmsb_M'
const SHEET_TITLE = 'DataBase'
const SHEET_RAGE = 'A2:C100000'

const FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RAGE)

export const AppContext = createContext()

export default function App() {

	const [widthOfThePage, setWidthOfThePage] = useState(0)

	useEffect(() => {
		setWidthOfThePage(window.innerWidth)
	}, [])


	window.addEventListener('resize', (event) => {
		setWidthOfThePage(window.innerWidth)
	}, true);

	const client = new QueryClient()

	return (
		<QueryClientProvider client={client}>
			<AppContext.Provider value={{ FULL_URL, widthOfThePage }}>
				<Header />
				<Main />
			</AppContext.Provider>
		</QueryClientProvider>
	)
}
