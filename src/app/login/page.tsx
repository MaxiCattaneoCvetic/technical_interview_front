'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Usamos Next.js router para redirigir
import styles from './login.module.css'; // Asegúrate de tener el archivo de estilos

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter(); // Usamos el router para redirigir

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();


    if (username === '1' && password === '1') {
      router.push('/admin'); 
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 style={{textAlign: 'center'}}>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
