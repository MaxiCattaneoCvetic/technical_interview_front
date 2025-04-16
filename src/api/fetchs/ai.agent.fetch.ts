import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


const processMessage = async (message: string, clientId: string) => {
    const response = await axios.post(`${BACKEND_URL}/ai/process-message`, {
        message: message,
        clientId: clientId
    });

    return response;
}


export { processMessage };  