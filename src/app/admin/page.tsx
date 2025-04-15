'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

import styles from './admin.module.css';
import "../../../src/app/global.css"
import withAuth from '@/components/withAuth';

const Admin = () => {
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleVerAsistente = () => {
    router.push('/ver-asistente');
  };

  const handleCargarBaseDatos = () => {
    router.push('/cargar-base-datos');
  };

  const handleVincularWhatsapp = async () => {
    setLoading(true);
    setError(null);

    try {
      // const token = getLocalStorageToken();
      // if (!token) {
      //   throw new Error('No se encontró el token de autenticación');
      // }

      // 1. Hacer la petición directamente con fetch
      const response = await fetch('http://localhost:3001/whatsapp/qrcode', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      });

      // 2. Verificar si la respuesta es válida
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al obtener el QR');
      }

      // 3. Parsear la respuesta como JSON
      const data = await response.json();

      if (!data.qrCode) {
        throw new Error('El código QR no fue generado correctamente');
      }

      // 4. Mostrar el QR
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
            onClick={handleCargarBaseDatos}
            className={styles.button}
            disabled={loading}
          >
            Cargar base de datos
          </button>
          <button
            onClick={handleVincularWhatsapp}
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Generando QR...' : 'Vincular WhatsApp'}
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