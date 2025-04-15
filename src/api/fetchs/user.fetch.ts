import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

const register = async (email: string, password: string) => {
    try {
        const registerObject = {
            email,
            password
        }
        const response = await axios.post(`${BACKEND_URL}/register`, registerObject);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || "Error en el registro",
                status: error.response?.status
            };
        }
        throw new Error("Error desconocido");
    }
};

const login = async (email: string, password: string) => {
    try {
        const loginObject = {
            email,
            password
        }
        const response = await axios.post(`${BACKEND_URL}/auth/login`, loginObject);

        if (response.data.access_token) {
            localStorage.setItem("token", response.data.access_token);
        }

        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || "Error en el login",
                status: error.response?.status
            };
        }
        throw new Error("Error desconocido");
    }
};

export { register, login };