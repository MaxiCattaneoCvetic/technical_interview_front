'use client';

import React, { useState, FormEvent } from 'react';

import styles from './register.module.css';

const Register = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
   

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();

    };

    return (
        <div className={styles.registerContainer}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <h2 style={{ textAlign: 'center', fontWeight: '600' }}>Registro de usuario</h2>
                <label className={styles.label}>Nombre</label>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <label className={styles.label}>Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
