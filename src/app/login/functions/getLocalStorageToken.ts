const getLocalStorageToken = () => {
    const token = localStorage.getItem('token');
    return token;
}

export { getLocalStorageToken };

