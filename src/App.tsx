import { useEffect, useState } from 'react';
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

	useEffect(() => {
		getRandomNumberFromApi().then((numb) => setNumber(numb));
	}, []);

	return (
		<div className='App'>
			<h2>Random Number: {number}</h2>
		</div>
	);
};

//https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new
