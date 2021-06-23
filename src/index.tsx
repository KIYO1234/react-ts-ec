import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
// todoチュートリアルで作成した方のstoreを使用
import { store } from './app/store'
import { Provider } from 'react-redux'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAn5msqqGN9FAJ1D5Quy36NFt95wLqkAbk",
  authDomain: "react-ts-ec.firebaseapp.com",
  projectId: "react-ts-ec",
  storageBucket: "react-ts-ec.appspot.com",
  messagingSenderId: "985858467722",
  appId: "1:985858467722:web:9c3a2a742efba9c75b4a73",
  measurementId: "G-Q4QNWZKG1F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


