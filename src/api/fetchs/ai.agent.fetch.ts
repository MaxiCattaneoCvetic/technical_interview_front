const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


const processMessage = async (message: string, clientId: string) => {
    const response = await fetch(`${BACKEND_URL}/ai/process-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            clientId: clientId
        }),
    });
    const data = await response.json();
    return data;
}

export { processMessage };  
