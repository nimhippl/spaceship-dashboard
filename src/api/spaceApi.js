import axios from 'axios';

export const locateShip = async (x, y) => {
    try {
        const response = await axios.get(`https://caranferen.ru/api/space/locate?x=${x}&y=${y}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
            console.error('No response from server:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return { status: 'failure', message: 'Error connecting to base' };
    }
};
