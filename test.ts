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






import { useEffect } from 'react';
import axios from 'axios';

const useKeepAlive = (intervalMinutes) => {
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('https://your-api-endpoint.com/health', { withCredentials: true })
                .then(response => {
                    console.log('Keep-alive successful:', response.data);
                })
                .catch(error => {
                    console.error('Keep-alive failed:', error);
                });
        }, intervalMinutes * 60 * 1000); // Convert minutes to milliseconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [intervalMinutes]);
};

export default useKeepAlive;





import React from 'react';
import useKeepAlive from './useKeepAlive';

const App = () => {
    useKeepAlive(15);
    return (
        <div>
            {/* Your application code */}
        </div>
    );
};

export default App;

