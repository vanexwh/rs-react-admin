import React, { useEffect, useState } from 'react';
import { useStoreUser } from '@store/index';

const App: React.FC = () => {
	const [greeting, setText] = useState<string>('');

	// const [name, setName] = useState<string>('');

	const user = useStoreUser();

	const updateName = () => {
		user.setName('13332');
	};

	useEffect(() => {
		setText('Hello World!');
	}, []);

	return (
		<div>
			<h1>Do you like React?{user.name}</h1>
			<p>{greeting}</p>

			<button onClick={updateName}></button>
		</div>
	);
};

export default App;
