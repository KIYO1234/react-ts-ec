import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// テスト用のredux storeのための材料（普通にstore作るのと一緒）▼
import { Provider } from 'react-redux'
import Redux from '../views/Redux'
import { configureStore } from '@reduxjs/toolkit'
import customCounterReducer from '../features/customCounter/customCounterSlice'

afterEach(() => {
    cleanup();
});

describe('Redux Integration Test', () => {
    let store:any;

    // テストケースが走る前に必ずstoreを作るようにする
    beforeEach(() => {
        store = configureStore({
            reducer: {
                customCounter: customCounterReducer,
            },
        });
    });
    // + が3回押された時にspanに3が表示されるかテスト
    it('should display value with increment by 1 per click', () => {
        // storeを使いたい場合は本番と同じように<Provider>で囲う
        render(
            <Provider store={store}>
                <Redux />
            </Provider>
        )
        // 3回押されたことを表現したいので3回書く
        userEvent.click(screen.getByText('+'));
        userEvent.click(screen.getByText('+'));
        userEvent.click(screen.getByText('+'));
        expect(screen.getByTestId('count-value')).toHaveTextContent(3)
    })
    it('should display value with decrement by 1 per click', () => {
        render(
            <Provider store={store}>
                <Redux />
            </Provider>
        )
        // 3回押されたことを表現したいので3回書く
        userEvent.click(screen.getByText('-'));
        userEvent.click(screen.getByText('-'));
        expect(screen.getByTestId('count-value')).toHaveTextContent(-2)
    })
    it('should display value with increment by amount', () => {
        render(
            <Provider store={store}>
                <Redux />
            </Provider>
        )
        // 30が入力されたことを想定したテスト
        userEvent.type(screen.getByPlaceholderText('Enter'), '30');
        userEvent.click(screen.getByText('IncrementByAmount'));
        expect(screen.getByTestId('count-value')).toHaveTextContent(30);
    })
});