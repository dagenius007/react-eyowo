import React from 'react';
import { useEyowoPayment, generateBill } from 'react-eyowo';

const App = () => {
	const [billLoading, setLoading] = React.useState('');
	const [billId, setBillId] = React.useState('');
	React.useEffect(() => {
		(async function () {
			setLoading(true);
			try {
				// Returns a bill with an _id required for payment
				const bill = await generateBill('DTGFJ5N-QS84G18-NKWV9PJ-65T9Y9S', 1000);
				setBillId(bill?._id);
			} catch (e) {
				console.log(e);
			}
			setLoading(false);
		})();
	}, []);
	const [loading, makePayment, verificationStatus] = useEyowoPayment({
		billId: billId,
		email: 'joshuaoluikpe@gmail.com',
		eyowoToken: 'DTGFJ5N-QS84G18-NKWV9PJ-65T9Y9S',
		_callback: function () {
			console.log('hi');
		},
		onClose: function () {
			console.log('ooooooooo');
		},
	});

	return billLoading ? 'Generating bill.....' : <button onClick={() => makePayment()}>Pay</button>;
};

export default App;
