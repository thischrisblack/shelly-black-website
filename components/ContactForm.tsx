import React from 'react';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
    return (
        <form
            className={styles.contactForm}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
        >
            <input type="hidden" name="form-name" value="contact" />
            <h3>Contact Shelly Black</h3>
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
                    <input type="text" name="name" id="name" />
                </label>
            </p>
            <p>
                <label>
                    Your Email:
                    <br />
                    <input type="email" name="email" id="email" />
                </label>
            </p>
            <p>
                <label>
                    Message:
                    <br />
                    <textarea name="message" id="message"></textarea>
                </label>
            </p>
            <p>
                <button type="submit">Send</button>
            </p>
        </form>
    );
}
