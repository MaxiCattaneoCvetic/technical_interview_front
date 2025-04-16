import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ChatInterface.module.css';
import { isWhatsappAvailable } from '@/api/fetchs/whatsapp.fetch';
import { processMessage } from '@/api/fetchs/ai.agent.fetch';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [whatsappLink, setWhatsappLink] = useState('');

  const [clientId, setClientId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const id = localStorage.getItem('clientId') || uuidv4();
    if (!localStorage.getItem('clientId')) {
      localStorage.setItem('clientId', id);
    }
    setClientId(id);
    checkWhatsAppAvailability();
  }, []);

  const checkWhatsAppAvailability = async () => {
    try {
      const response = await isWhatsappAvailable();
      if (response.success && response.link) {
        setWhatsappLink(response.link);
        setWhatsappStatus('available');
      } else {
        setWhatsappStatus('unavailable');
      }
    } catch (error) {
      setWhatsappStatus('unavailable');
    }
  };

  const handleWhatsAppClick = () => {
    if (whatsappStatus === 'available' && whatsappLink) {
      window.open(whatsappLink, '_blank');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response: any = await processMessage(inputMessage, clientId);

      if (response.status != 201 || !response.data) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = response.data

      const aiMessage: Message = {
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getWhatsAppButtonText = () => {
    switch (whatsappStatus) {
      case 'checking':
        return 'Verificando disponibilidad del asistente...';
      case 'available':
        return 'Contactar asistente por WhatsApp';
      case 'unavailable':
        return 'Asistente no disponible temporalmente';
      default:
        return 'Contactar asistente por WhatsApp';
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div
        className={`${styles.warningBanner} ${whatsappStatus === 'available' ? styles.available : ''}`}
        onClick={handleWhatsAppClick}
      >
        {getWhatsAppButtonText()}
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${message.isUser ? styles.userMessage : styles.aiMessage}`}
          >
            <div className={styles.messageContent}>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={styles.message}>
            <div className={styles.messageContent}>
              <div className={styles.messageText}>...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          className={styles.input}
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className={styles.sendButton}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;