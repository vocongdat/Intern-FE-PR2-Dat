const { useEffect, useState } = require('react');

const useFetch = (productId) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await vegetableApi.getById(productId);
                setResponse(data.body);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    return { response, error };
};
