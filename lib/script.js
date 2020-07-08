export const useScript = (url) => {
	const [isAdded, setIsAdded] = React.useState(false);
	React.useEffect(() => {
		if (window === undefined) {
			return;
		}
		const script = document.createElement('script');

		script.src = url;
		script.async = true;

		document.body.appendChild(script);
		setIsAdded(true);

		return () => {
			document.body.removeChild(script);
		};
	}, [url]);
	return isAdded;
};
