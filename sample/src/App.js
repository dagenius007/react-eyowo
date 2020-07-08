import React from 'react';
import { useEyowoPayment } from 'react-eyowo';

const App = () => {
	const [loading, makePayment, verificationStatus] = useEyowoPayment({
		billId: '5f061df6d86bab39ec17ecfd',
		email: 'joshuaoluikpe@gmail.com',
		eyowoToken: 'DTGFJ5N-QS84G18-NKWV9PJ-65T9Y9S',
		_callback: function () {
			console.log('hi');
		},
		onClose: function () {
			console.log('ooooooooo');
		},
	});

	console.log(loading, verificationStatus);

	return <button onClick={() => makePayment()}>Pay</button>;
};

export default App;
