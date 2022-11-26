import { useRouter } from 'next/router';
import React from 'react';
import styles from './ContactForm.module.scss';

export default function ContactForm({
    showAddress = false,
    showSocial = true,
    title = 'Contact Shelly Black',
    prefilledMessage = '',
}: {
    showAddress?: boolean;
    showSocial?: boolean;
    title?: string;
    prefilledMessage?: string;
}) {
    const {
        query: { message },
    } = useRouter();

    return (
        <div className={styles.contactForm}>
            <h3>{title}</h3>
            {showSocial && (
                <>
                    <a href="https://twitter.com/shellyyblack">
                        <i className="fab fa-twitter fa-lg"></i>
                    </a>{' '}
                    <a href="https://www.linkedin.com/in/shellyyblack/">
                        <i className="fab fa-linkedin fa-lg"></i>
                    </a>
                </>
            )}

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
                        {showAddress && (
                            <p>
                                <label>
                                    Shipping Address:
                                    <br />
                                    <textarea name="address" id="address"></textarea>
                                </label>
                            </p>
                        )}
                        <p>
                            <label>
                                Message:
                                <br />
                                <textarea name="message" id="message">
                                    {prefilledMessage}
                                </textarea>
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
