import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updateDatabase } from '../api/fetchs/update.database';
import styles from '../app/admin/admin.module.css';
import Swal from 'sweetalert2';

const UpdateDatabase: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (file: File) => {
        setLoading(true);
        try {
            // Verificar que el archivo existe y tiene contenido
            if (!file || file.size === 0) {
                throw new Error('El archivo está vacío');
            }

            // Verificar el tipo de archivo
            if (!file.name.match(/\.(xlsx|xls)$/)) {
                throw new Error('Solo se permiten archivos Excel (.xlsx, .xls)');
            }

            const response = await updateDatabase(file);
            if (response.data) {
                await Swal.fire({
                    title: 'Base de datos actualizada exitosamente',
                    text: `Se han importado ${response.data.totalProcessed} productos`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                });
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            await Swal.fire({
                title: 'Error',
                text: error.message || 'Error al actualizar la base de datos. Por favor, intente nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#d33',
            });
        } finally {
            setLoading(false);
        }
        return false;
    };

    return (
        <div className={styles.uploadContainer}>
            <Upload
                beforeUpload={handleUpload}
                accept=".xlsx,.xls"
                showUploadList={false}
                maxCount={1}
            >
                <Button
                    className={styles.button}
                    icon={<UploadOutlined />}
                    loading={loading}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Cargar base de datos'}
                </Button>
            </Upload>
            <p className={styles.uploadInfo}>
                Solo archivos Excel (.xlsx, .xls) son permitidos
            </p>
        </div>
    );
};

export default UpdateDatabase;
