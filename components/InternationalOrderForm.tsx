import React from 'react';
import styles from './ContactForm.module.scss';

const encode = (data) => {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
};

export default function InternationalOrderForm({ orderInfo = '' }: { orderInfo?: string }) {
    const handleSubmit = (e) => {
        const botField = (document.getElementById('bot-field') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const address = (document.getElementById('address') as HTMLTextAreaElement).value;
        const message = (document.getElementById('message') as HTMLTextAreaElement).value;
        const order = orderInfo;
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': 'contact', botField, name, email, address, message, order }),
        }).catch((error) => console.error(error));

        e.preventDefault();
    };

    return (
        <div className={styles.contactForm}>
            <h3>International Shipping Contact Form</h3>

            <form
                name="internationalorderinfo"
                method="POST"
                data-netlify="true"
                action="/shop/cart?message=sent"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="form-name" value="internationalorderinfo" />
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
                        Shipping Address:
                        <br />
                        <textarea name="address" id="address"></textarea>
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
                    <label>
                        Your Order:
                        <br />
                        <textarea name="order" id="order" value={orderInfo} disabled></textarea>
                    </label>
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
            </form>
        </div>
    );
}
