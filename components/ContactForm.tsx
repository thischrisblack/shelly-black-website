import { useRouter } from 'next/router';
import React from 'react';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
    const {
        query: { message },
    } = useRouter();

    return (
        <div className={styles.contactForm}>
            <h3>Contact Shelly Black</h3>
            {message !== 'sent' && (
                <>
                    <form
                        name="contact"
                        method="POST"
                        data-netlify="true"
                        action="/about?message=sent"
                        netlify-honeypot="bot-field"
                    >
                        <input type="hidden" name="form-name" value="contact" />
                        <div hidden aria-hidden="true">
                            <label>
                                Don’t fill this out if you're human:
                                <input name="bot-field" />
                            </label>
                        </div>
                        <p>
                            <label>
                                Your Name:
                                <br />
                                <input type="text" name="name" id="name" required />
                            </label>
                        </p>
                        <p>
                            <label>
                                Your Email:
                                <br />
                                <input type="email" name="email" id="email" required />
                            </label>
                        </p>
                        <p>
                            <label>
                                Message:
                                <br />
                                <textarea name="message" id="message" required></textarea>
                            </label>
                        </p>
                        <p>
                            <button type="submit">Send</button>
                        </p>
                    </form>
                </>
            )}
            {message === 'sent' && (
                <>
                    <p>Thank you! Your message has been sent and I'll get back to you soon.</p>
                </>
            )}
        </div>
    );
}
