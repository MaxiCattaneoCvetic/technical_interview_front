const getBotQr = async (token: string) => {
    const response = await fetch('http://localhost:3001/whatsapp/qrcode', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return await response.json();
}

export { getBotQr };

