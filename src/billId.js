import axios from 'axios';

export const generateBill = async (eyowoToken, amount) => {
	try {
		const {
			data: {
				data: { bill },
			},
		} = await axios.post(
			`https://api.checkout.merchant.staging.eyowo.com/v1/bills`,
			{ amount },
			{
				headers: {
					Authorization: `Bearer ${eyowoToken}`,
				},
			},
		);
		return bill;
	} catch (err) {
		return { err };
	}
};
