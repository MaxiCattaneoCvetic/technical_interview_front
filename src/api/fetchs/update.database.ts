const NEXT_PUBLIC_BACKEND_URL_DATABASE = process.env.NEXT_PUBLIC_BACKEND_URL_DATABASE;

import axios from 'axios';

export const updateDatabase = async (file: File) => {
    try {
        // Convertir el archivo a base64
        const base64String = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });

        console.log('Enviando archivo:', {
            name: file.name,
            size: file.size,
            type: file.type
        });

        const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL_DATABASE}/database/new`, {
            fileName: file.name,
            fileContent: base64String
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            withCredentials: true,
            timeout: 30000,
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