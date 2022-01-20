import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customCounterReducer from "../features/customCounter/customCounterSlice";
import ReduxAsync from "../views/ReduxAsync";
// 外部のJSONplaceholderのAPIのエンドポイントをmswでモッキングするための準備
import { rest } from 'msw';
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);
beforeAll(() => server.listen());
// 各テストケースが終わるたびにcleanup()を実行
afterEach(() => {
    server.resetHandlers();
    cleanup();
})
// 全てのテストケースが終わった後にservetを止める
afterAll(() => server.close());

describe('Redux Async API mocking', () => {
    let store:any;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                customCounter: customCounterReducer,
            },
        });
    });
    it('[Fetch success] should display username in h1 tag', async () => {
        render(
            <Provider store={store}>
                <ReduxAsync />
            </Provider>
        )
        // 初期状態で<h1></h1>タグのusernameがないことのテスト
        expect(screen.queryByRole('heading')).toBeNull();
        userEvent.click(screen.getByText('FetchJSON'));
        expect(await screen.findByText('Bred dummy')).toBeInTheDocument();
    })
    it('[Fetch failed] should display anonymous in h1 tag', async () => {
        server.use(
            rest.get(
                'https://jsonplaceholder.typicode.com/users/1',
                (req, res, ctx) => {
                    return res(ctx.status(404));
                }
            )
        );
        render(
            <Provider store={store}>
                <ReduxAsync />
            </Provider>
        );
        // 初期状態で<h1></h1>タグのusernameがないことのテスト
        expect(screen.queryByRole('heading')).toBeNull();
        userEvent.click(screen.getByText('FetchJSON'));
        expect(await screen.findByText('anonymous')).toBeInTheDocument();
    })
});