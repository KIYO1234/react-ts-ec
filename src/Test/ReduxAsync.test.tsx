import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import customCounterReducer from '../features/customCounter/customCounterSlice'
import ReduxAsync from '../views/ReduxAsync'

afterEach(() => {
    cleanup();
})

describe('ReduxAsync test', () => {
    let store: any;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                customCounter: customCounterReducer,
            },
        });
    });
    it('shoule display value with 100 + payload', async () => {
        render(
            <Provider store={store}>
                <ReduxAsync />
            </Provider>
        );
        userEvent.click(screen.getByText('FetchDummy'));
        // asyncの場合はfindByを使う
        // 期待値の105は文字列なので注意（コマンドがtoEqual()ではなくtoHaveTextContent()になる）
        expect(await screen.findByTestId('count-value')).toHaveTextContent('105');
    });
});

