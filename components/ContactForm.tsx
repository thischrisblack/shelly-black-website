import React from 'react';
import styles from './ContactForm.module.scss';

function encode(data) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
}

export default function ContactForm() {
    const [state, setState] = React.useState({
        name: '',
        email: '',
        message: '',
        sent: false,
        buttonText: 'Submit',
        err: '',
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setState({
            name: '',
            email: '',
            message: '',
            sent: false,
            buttonText: 'Submit',
            err: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setState({
            ...state,
            buttonText: 'Sending...',
        });
        const form = e.target;
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...state,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    setState({
                        ...state,
                        buttonText: 'Failed to send',
                        sent: false,
                        err: 'fail',
                    });
                    setTimeout(() => {
                        resetForm();
                    }, 6000);
                } else {
                    setState({
                        ...state,
                        sent: true,
                        buttonText: 'Sent',
                        err: 'success',
                    });
                    setTimeout(() => {
                        resetForm();
                    }, 4000);
                }
            })
            .catch((error) => alert(error));
    };

    return (
        <form
            className={styles.contactForm}
            name="contact"
            method="POST"
            action="/thanks/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
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
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Your Email:
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </label>
            </p>
            <p>
                <label>
                    Message:
                    <br />
                    <textarea
                        name="message"
                        value={state.message}
                        onChange={handleChange}
                    ></textarea>
                </label>
            </p>
            <p>
                <button onClick={handleSubmit}>{state.buttonText}</button>
            </p>
        </form>
    );
}
