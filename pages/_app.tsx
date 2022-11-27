import '../styles/global.scss';
import { AppProps } from 'next/app';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PayPalScriptProvider
                options={{
                    'client-id': 'AfWPvRg5-ElGsZA9Tmjo7-PBNdcdlz5sEarBQ77N4nGEe5Pl6GiKOtaHj6LEEl8yQDIhL0GhnELJVvf7',
                }}
            >
                <Component {...pageProps} />
            </PayPalScriptProvider>
        </Provider>
    );
}
