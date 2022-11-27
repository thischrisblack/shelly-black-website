import React from 'react';
import styles from './ContactForm.module.scss';

export default function InternationalOrderForm({ orderInfo = '' }: { orderInfo?: string }) {
    return (
        <div className={styles.contactForm}>
            <h3>International Shipping Contact Form</h3>

            <form
                name="internationalorderinfo"
                method="POST"
                data-netlify="true"
                action="/shop/cart?message=sent"
                netlify-honeypot="bot-field"
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
                        <textarea
                            name="order"
                            id="order"
                            className={styles.pointerEventsNone}
                            value={orderInfo}
                        ></textarea>
                    </label>
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
            </form>
        </div>
    );
}
