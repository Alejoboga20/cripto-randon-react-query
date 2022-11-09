import { useEffect, useReducer, useState } from 'react';
import './App.css';

const getRandomNumberFromApi = async (): Promise<number> => {
	const response = await fetch(
		'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
	);
	const numberString = await response.text();

	return +numberString;
};

export const App = () => {
	const [number, setNumber] = useState<number>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [key, forceRefetch] = useReducer((x: number) => x + 1, 0);

	useEffect(() => {
		setIsLoading(true);
		getRandomNumberFromApi()
			.then(setNumber)
			.catch((error) => setError(error.message));
	}, [key]);

	useEffect(() => {
		if (number) setIsLoading(false);
	}, [number]);

	useEffect(() => {
		if (error) setIsLoading(false);
	}, [error]);

	return (
		<div className='App'>
			{isLoading ? <h2>Loading...</h2> : <h2>Random Number: {number}</h2>}
			{!isLoading && error && <h3>{error}</h3>}

			<button onClick={forceRefetch} disabled={isLoading}>
				{isLoading ? '...' : 'new number'}
			</button>
		</div>
	);
};
