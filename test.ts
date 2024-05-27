import { useEffect } from 'react';

const useKeepAlive = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('https://your-api-endpoint.com/keep-alive', { withCredentials: true });
        }, 15 * 60 * 1000); // Every 15 minutes

        return () => clearInterval(interval);
    }, []);
};

export default useKeepAlive;



import React from 'react';
import useKeepAlive from './useKeepAlive';

const App = () => {
    useKeepAlive();
    return (
        <div>
            {/* Your application code */}
        </div>
    );
};

export default App;



