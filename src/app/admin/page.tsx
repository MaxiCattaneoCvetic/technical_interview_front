'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

import styles from './admin.module.css';
import "../../../src/app/global.css"
import withAuth from '@/components/withAuth';
import { initDatabase } from '@/api/fetchs/update.database';
import Swal from 'sweetalert2';


const Admin = () => {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleVerAsistente = () => {
    router.push('/');
  };

  const handleInitDatabase = async () => {
    await initDatabase()
    Swal.fire({
      title: 'Base de datos actualizada exitosamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
    });
  };

  const handleVincularWhatsapp = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      const URL_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

      const response = await fetch(`${URL_BACKEND}/whatsapp/qrcode`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al obtener el QR');
      }

      const data = await response.json();

      if (!data.qrCode) {
        throw new Error('El código QR no fue generado correctamente');
      }

      setQRCode(data.qrCode);
      setShowModal(true);

    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Ocurrió un error al vincular WhatsApp');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setQRCode(null);
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={`${styles.contentContainer} ${loading ? styles.blurBackground : ''}`}>
        <h1 className={styles.title}>Bienvenido Admin</h1>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleVerAsistente}
            className={styles.button}
            disabled={loading}
          >
            Ver asistente
          </button>

          <button
            onClick={handleVincularWhatsapp}
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Generando QR...' : 'Vincular WhatsApp'}
          </button>
          <button
            onClick={handleInitDatabase}
            className={styles.button}
            disabled={loading}
          >
            Iniciar base de datos
          </button>
        </div>
      </div>

      {loading && (
        <div className={styles.loaderContainer}>
          <ClipLoader color="#4bff7d" loading={loading} size={50} />

        </div>
      )}

      {showModal && qrCode && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.qrCodeTitle}>
              Escanea el código QR para vincular WhatsApp
            </h3>
            <img
              src={qrCode}
              alt="QR Code"
              className={styles.qrCodeImage}
              onError={() => setError('Error al cargar el código QR')}
            />
            <button
              className={styles.closeBtn}
              onClick={closeModal}
              disabled={loading}
            >
              Cerrar
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default withAuth(Admin);