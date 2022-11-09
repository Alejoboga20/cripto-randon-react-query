import { useQuery } from '@tanstack/react-query';
import './App.css';

const getRandomNumberFromApi = async (): Promise<number> => {
	const response = await fetch(
		'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
	);
	const numberString = await response.text();

	return +numberString;
};

export const App = () => {
	const query = useQuery(['randomNumber'], getRandomNumberFromApi);

	return (
		<div className='App'>
			{query.isFetching ? <h2>Loading...</h2> : <h2>Random Number: {query.data}</h2>}
			{!query.isFetching && query.isError && <h3>{`${query.error}`}</h3>}

			<button onClick={() => query.refetch()} disabled={query.isFetching}>
				{query.isFetching ? '...' : 'new number'}
			</button>
		</div>
	);
};
