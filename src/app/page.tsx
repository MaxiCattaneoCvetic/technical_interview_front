'use client';
import './global.css';
import ChatInterface from '../components/ChatInterface';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <main style={{ padding: '0rem', margin: '0rem' }}>
      <div className={styles.container}>
        <button
          onClick={() => router.push('/login')}
          className={styles.loginButton}
        >
          Login
        </button>
        <h1 className={styles.title}>Asistente de Ventas B2B</h1>
        <ChatInterface />
      </div>
    </main>
  );
}
