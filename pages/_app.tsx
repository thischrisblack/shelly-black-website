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
            <PayPalScriptProvider options={{ 'client-id': 'ASLj7PXWA7t7H3kNBMzEx-UkLTVzfrTksByBN2evzBR39A2k6p--Jwm2zGd2HbVN3r6U8_BYIFmCprRQ' }}>
                <Component {...pageProps} />
            </PayPalScriptProvider>
        </Provider>
    );
}
