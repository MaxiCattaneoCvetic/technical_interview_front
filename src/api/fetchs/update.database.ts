const NEXT_PUBLIC_BACKEND_URL_DATABASE = process.env.NEXT_PUBLIC_BACKEND_URL_DATABASE;


import axios from 'axios';

export const initDatabase = async () => {
    const token = localStorage.getItem('token');
    try {

        const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL_DATABASE}/init/database`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 30000,
        });

        console.log('Respuesta del servidor:', response.data);
        return response;
    } catch (error: any) {
        throw error;
    }
}; 