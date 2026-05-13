import { ref } from 'vue';
import emailjs from '@emailjs/browser';

export default {
    name: 'Contact',
    setup() {
        const loading = ref(false);
        const statusMsg = ref('');
        const statusType = ref('');

        const form = ref({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        const handleSend = async () => {
            loading.value = true;
            statusMsg.value = '';
            
            try {
                const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

                const templateParams = {
                    name: form.value.name,       
                    email: form.value.email,     
                    title: form.value.subject,   
                    message: form.value.message, 
                    time: new Date().toLocaleString() 
                };

                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    templateParams,
                    PUBLIC_KEY
                );

                statusMsg.value = '¡Mensaje enviado con éxito! Te responderé lo antes posible.';
                statusType.value = 'success';
                form.value = { name: '', email: '', subject: '', message: '' };

            } catch (error) {
                statusMsg.value = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.';
                statusType.value = 'error';
                console.error('EmailJS Error:', error);
            } finally {
                loading.value = false;
            }
        };

        return { form, loading, statusMsg, statusType, handleSend };
    }
};