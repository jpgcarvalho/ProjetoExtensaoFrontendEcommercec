import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
