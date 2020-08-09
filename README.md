# React Eyowo

React integration for [Eyowo](https://www.eyowo.com/).

[![npm version](https://img.shields.io/npm/v/@stripe/react-stripe-js.svg?style=flat-square)](https://www.npmjs.com/package/react-eyowo)

## Getting started

-   [Register on Eyowo retail](https://www.eyowo.com/retail/)
-   [Get your API key in your settings page](https://www.eyowo.com/retail/)

## Documentation

-   [Generate bill id](https://github.com/dagenius007/react-eyowo#billID)
-   [Using Hooks](https://github.com/dagenius007/react-eyowo#using-hooks)
-   [Examples](examples)

### Example

First, install React Eyowo

```sh
npm install react-eyowo --save
```

or with `yarn`

```sh
yarn add react-eyowo
```

#### Usage

```jsx
import React from 'react';
import { useEyowoPayment, generateBill } from 'react-eyowo';

const App = () => {
	const [billLoading, setLoading] = React.useState(false);
	const [billId, setBillId] = React.useState('');

	React.useEffect(() => {
		(async function () {
			setLoading(true);
			try {
				// Returns a bill with an _id required for payment
				//better to add token to .env file
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
		email: 'test@gmail.com',
		eyowoToken: 'DTGFJ5N-QS84G18-NKWV9PJ-5AQ9Y9S',
		_callback: function () {
			console.log('completed');
		},
		onClose: function () {
			console.log('closed');
		},
	});

	return billLoading ? 'Generating bill.....' : <button onClick={() => makePayment()}>Pay</button>;
};

export default App;
```

## Variables

These are varaibles to pass to the hooks function

| Name            | Type       | Description                                                                                             |
| --------------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| `billId`        | `String`   | **Required.** This a mongo id used for the payment.                                                     |
| `email`         | `String`   | **Required.** The customer's email.                                                                     |
| `eyowoToken`    | `String`   | **Required.** This is your API token.It can be found in your [dashboard](https://www.eyowo.com/retail/) |
| `_callback`     | `Function` | This is trigged after a successful payment.                                                             |
| `onClose`       | `Function` | This is trigged when the pop up modal is closed.                                                        |
| `verifyPayment` | `Boolean`  | The default is true. It verifies payment in the callback function after successful transaction.         |

## Return Values

These are destructed values returned from the hooks function

| Name                 | Type       | Description                                                                                                                                   |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `makePayment`        | `Function` | It triggers the pop up modal.                                                                                                                 |
| `loading`            | `Boolean`  | Loading state while verifying payment.                                                                                                        |
| `verificationStatus` | `Object`   | This returns **paymentVerificationStatus('approved' or 'failed')** and **paymentVerificationErrorMessage(error message if status is failed)** |

### Minimum requirements

The minimum supported version of React is v16.8. If you use an older version, upgrade React to use this library.

### TypeScript support

No TypeScript support for now

### Contributing

If you would like to contribute to React Eyowo,

1. Fork the project
2. Create your feature branch
3. Push and Commit your changes to that feature branch
4. Submit a pull request
