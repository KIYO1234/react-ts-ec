import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "../views/ProductList";
import { Header, OrderFinished } from "../views";
import userEvent from "@testing-library/user-event";
// import { useHistory } from "react-router";
import { createMemoryHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/items/itemSlice";
import userReducer from "../features/users/userSlice";
import firebase from 'firebase';
// import sum from '../views/ProductList';
import { toBindingIdentifierName } from "@babel/types";
// firebaseのモック作成用
// import * as firebase from '../index'


// //firebaseの初期化
// var firebaseConfig = {
//   apiKey: "AIzaSyAn5msqqGN9FAJ1D5Quy36NFt95wLqkAbk",
//   authDomain: "react-ts-ec.firebaseapp.com",
//   projectId: "react-ts-ec",
//   storageBucket: "react-ts-ec.appspot.com",
//   messagingSenderId: "985858467722",
//   appId: "1:985858467722:web:9c3a2a742efba9c75b4a73",
//   measurementId: "G-Q4QNWZKG1F",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // firebase.analytics();

// // // ログイン関数を作成：local.protocolエラーが出るので一旦パス
// // const login = async (): Promise<void> => {
// //   const google_auth_provider = new firebase.auth.GoogleAuthProvider();
// //   await firebase.auth().signInWithRedirect(google_auth_provider);
// //   alert("ログインしました");
// // };


// // sample にdataを追加する処理を作成
// const sample = {
//   name: 'サンプルカレー',
//   priceL: 1000,
//   priceM: 800,
//   text: '美味しいカレーです',
// }
// const addToSample = () => {
//   firebase.firestore().collection('sample').add(sample)
// }

// describe("Login", () => {
//   let store: any;
//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         user: userReducer,
//         item: itemReducer,
//       },
//     });
//   });

//   it("should change displayname when logged in", async () => {
//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );
//     // screen.debug(screen.getByText('注文履歴'));
//     // Loginはある▼
//     // screen.debug(screen.getByText('Login'));
//     // Logoutはない▼
//     // screen.debug(screen.getByText('Logout'));

//     // userEvent.click(screen.getByTestId('loginBtn'));
//     // userEvent.click(screen.getByTestId('logoutBtn'));

//     userEvent.click(screen.getByText('Login'));
//     // login();
//     // addToSample();

//     // userEvent.click(screen.getByTestId('loginBtn'));
//     expect(
//       await screen.findByText("Welcome!")
//     ).toBeInTheDocument();
//   });
// });


// const sum = require('../views/ProductList');
// describe('sum', () => {
//   it('2 * 3 = 6', () => {
//     expect(sum(2,3)).toBe(6);
//   });
// });

// // Firebase test
// const fs = require('fs');
// const firebase = require('@firebase/rules-unit-testing');
// const PROJECT_ID = 'react-ts-ec';
// // テスト開始時に1回だけ実行される
// beforeAll(async () => {
//   // ローカルにあるRulesファイルを読み込む
//   const rules = fs.readFileSync('firestore.rules', 'utf8')
//   await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules })
// })


// // Firebase の mock 作成
// jest.mock('initFirebase', () => ({
//   // 関数をimport してきたのがfirestoreに入ってる
//   firestore: jest.fn()
// }));

// // firebase.firestore()の振る舞いを定義する
// const firebaseMock = firebase.firestore.mockImplementation(() => {
//   return {
//     collection: jest.fn(() => ({
//       onSnapshot: jest.fn((func) => {
//         func(doc)
//       })
//     })
//   }
// })

const sum = (a: number, b: number) => {
  return a + b;
}
describe('sum func', () => {
  it("two plus five to eaqual seven", () => {
    expect(sum(2, 5)).toBe(7);
  });
});