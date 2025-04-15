const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const isWhatsappAvailable = async () => {
    const response = await fetch(`${BACKEND_URL}/whatsapp/bot-link`);
    const data = await response.json();
    return data;
}

export { isWhatsappAvailable };
