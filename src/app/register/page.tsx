'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import styles from './register.module.css';
import { register } from '@/api/fetchs/user.fetch';


const Register = () => {
    const [email, setemail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = await register(email, password);

        if (response.email) {

            Swal.fire({
                title: 'Registro exitoso',
                text: 'Ahora puedes iniciar sesión',
                icon: 'success',
                confirmButtonText: 'Iniciar sesión'
            })
            router.push('/login');
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Error en el proceso de registro',
                icon: 'error',
                confirmButtonText: 'Volver a intentar'
            })
            setemail('');
            setPassword('');

        }

    };

    return (
        <div className={styles.registerContainer}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <h2 style={{ textAlign: 'center', fontWeight: '600' }}>Registro de usuario</h2>
                <label className={styles.label}>Email</label>
                <input
                    type="text"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
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
