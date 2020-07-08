import React from 'react';
import { useScript } from './script';
import axios from 'axios';

export default ({ billId, email, _callback, onClose, env, eyowoToken, verifyPayment = true }) => {
	const isScriptAdded = useScript('https://js.eyowo.com/inline.js');

	const [loading, setLoading] = React.useState(false);

	const [paymentVerification, setPaymentVerification] = React.useState(false);
	const [verificationStatus, setVerificationStatus] = React.useState({
		paymentVerificationError: false,
		paymentVerificationErrorMessage: '',
		paymentVerificationSuccess: false,
	});

	React.useEffect(() => {
		if (paymentVerification) {
			verifyEyowoPayment(billId);
		}
	}, [paymentVerification]);

	const verifyEyowoPayment = async (billId) => {
		setLoading(true);
		try {
			await axios.get(`https://api.checkout.merchant.staging.eyowo.com/v1/bills/${billId}/verify`, {
				headers: {
					Authorization: `Bearer ${eyowoToken}`,
				},
			});
			setVerificationStatus((status) => ({
				...status,
				paymentVerificationSuccess: true,
			}));
		} catch (err) {
			let errMessage = '';
			if (!err.response) {
				errMessage = 'No internet connection';
			} else {
				errMessage = err?.response?.data?.error || '';
			}
			setVerificationStatus((status) => ({
				...status,
				paymentVerificationError: true,
				paymentVerificationErrorMessage: errMessage,
			}));
		}
		setLoading(false);
	};

	const makePayment = () => {
		if (!isScriptAdded) {
			console.log('Error adding script ');
			return null;
		}
		if (window && window.Eyowo) {
			window.Eyowo.initialize({
				id: billId,
				email,
				env: env || 'staging',
				onClose:
					onClose ||
					function () {
						console.log('closed');
						return;
					},
				_callback: function () {
					_callback();
					verifyPayment && setPaymentVerification(true);
				},
			});
		}
	};

	return [loading, makePayment, verificationStatus];
};
