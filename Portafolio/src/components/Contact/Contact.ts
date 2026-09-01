import { ref } from 'vue';
import emailjs from '@emailjs/browser';

// Ventana mínima entre envíos desde el mismo navegador, para no agotar
// la cuota gratuita de EmailJS ni facilitar el spam del formulario.
const COOLDOWN_MS = 30_000;
const COOLDOWN_STORAGE_KEY = 'contact_last_sent_at';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Quita caracteres de control y espacios sobrantes; no depende de innerHTML
// en ningún momento del proyecto, pero igual conviene no reenviar basura
// binaria al template de EmailJS.
const sanitize = (value: string) =>
    value.replace(/[\u0000-\u001F\u007F]/g, '').trim();

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
            message: '',
            website: '' // honeypot: debe permanecer vacío, solo los bots lo rellenan
        });

        const getRemainingCooldown = () => {
            const lastSent = Number(localStorage.getItem(COOLDOWN_STORAGE_KEY) || 0);
            const elapsed = Date.now() - lastSent;
            return Math.max(0, COOLDOWN_MS - elapsed);
        };

        const handleSend = async () => {
            statusMsg.value = '';

            // Honeypot: si el campo trampa viene relleno, es casi seguro un bot.
            // Respondemos como si hubiera ido bien para no darle pistas al bot,
            // pero no llamamos a EmailJS ni gastamos cuota.
            if (form.value.website.trim() !== '') {
                statusMsg.value = 'Message sent successfully! I will get back to you as soon as possible.';
                statusType.value = 'success';
                form.value = { name: '', email: '', subject: '', message: '', website: '' };
                return;
            }

            const name = sanitize(form.value.name);
            const email = sanitize(form.value.email);
            const subject = sanitize(form.value.subject);
            const message = sanitize(form.value.message);

            if (!name || !email || !subject || !message) {
                statusMsg.value = 'Please fill in all fields before sending.';
                statusType.value = 'error';
                return;
            }

            if (!EMAIL_REGEX.test(email)) {
                statusMsg.value = 'Please enter a valid email address.';
                statusType.value = 'error';
                return;
            }

            const remaining = getRemainingCooldown();
            if (remaining > 0) {
                statusMsg.value = `Please wait ${Math.ceil(remaining / 1000)}s before sending another message.`;
                statusType.value = 'error';
                return;
            }

            loading.value = true;

            try {
                const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

                const templateParams = {
                    name,
                    email,
                    title: subject,
                    message,
                    time: new Date().toLocaleString()
                };

                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    templateParams,
                    PUBLIC_KEY
                );

                localStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));

                statusMsg.value = 'Message sent successfully! I will get back to you as soon as possible.';
                statusType.value = 'success';
                form.value = { name: '', email: '', subject: '', message: '', website: '' };

            } catch (error) {
                statusMsg.value = 'Error sending message. Please try again later.';
                statusType.value = 'error';
                console.error('EmailJS Error:', error);
            } finally {
                loading.value = false;
            }
        };

        return { form, loading, statusMsg, statusType, handleSend };
    }
};
