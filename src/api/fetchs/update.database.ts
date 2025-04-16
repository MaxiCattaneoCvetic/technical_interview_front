const NEXT_PUBLIC_BACKEND_URL_DATABASE = process.env.NEXT_PUBLIC_BACKEND_URL_DATABASE;

import axios from 'axios';

export const updateDatabase = async (file: File) => {
    const formData = new FormData();
    const blob = new Blob([file], { type: file.type });
    formData.append('file', blob, file.name);

    try {
        console.log('Enviando archivo:', {
            name: file.name,
            size: file.size,
            type: file.type,
            formData: formData.get('file')
        });

        const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL_DATABASE}/database/new`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            withCredentials: true,
            timeout: 30000,
            transformRequest: [(data) => data],
        });

        console.log('Respuesta del servidor:', response.data);
        return response;
    } catch (error: any) {
        console.error('Error uploading file:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
            config: error.config
        });
        throw error;
    }
}; 