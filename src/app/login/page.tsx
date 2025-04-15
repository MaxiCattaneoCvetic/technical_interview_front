'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { login } from '@/api/fetchs/user.fetch';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      if (response.data.access_token) {
        Swal.fire({ title: 'Bienvenido', icon: 'success' });
        localStorage.setItem('token', response.data.access_token);
      } else {
        throw new Error('Credenciales inválidas');
      }
      router.push('/admin');
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Usuario o contraseña incorrectos', icon: 'error' });
    }
  };



  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 style={{ textAlign: 'center' }}>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
