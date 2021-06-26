import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import MockServer from './MockServer'
import userEvent from '@testing-library/user-event'
// msw からimport
import { rest } from 'msw'
import { setupServer } from 'msw/node'

interface User {
    username: string
}
// msw の setupServerという機能を使ってモックサーバーを作る
const server = setupServer(
  // axios.get()を使ったのでrest.get()とする
  // rest.get()の第一引数はAPIのエンドポイント（axios.get()と同じ）
  // 第二引数はアロー関数：引数には(req, res, ctx)の3つを取ることができる（決まっている）
  // req : リクエストのパスに検索用のクエリーを追加できる
  // res :
  // ctx (context) : JSONのオブジェクトの内容を定義
  rest.get(
    "https://jsonplaceholder.typicode.com/users/1",
    (req, res, ctx) => {
      // res()でresponseを作ることができる
      // res()ないのctxで中身を作っていく
      // ctx.jsonのなかでエンドポイントを自由に決めることができる
      return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
    }
  )
);

// サーバーを起動しておく（最初に1度だけでいいのでbeforeAll()を使用）
// サーバーを起動するコマンドはserver.listen()
beforeAll(() => server.listen())
// テストが1つ終わるたびに実行される処理：afterEach()
afterEach(() => {
    server.resetHandlers();
    cleanup();
})
// 最後にモックサーバーを閉じる
afterAll(() => server.close())

describe('Mocking API', () => {
    it('[Fetch success] Shoule diplay fetched data correctly and button disabled', async () => {
        render(<MockServer />);
        // userEvent.イベントの種類（イベントが行われる要素）
        userEvent.click(screen.getByRole('button'));

        // findByRole()にすることで処理を待たせることができる
        expect(await screen.findByText("Bred dummy")).toBeInTheDocument();

        // fetchが成功したらbuttonがdisabledになっているかのテスト（属性があるかの確認をしたいときはtoHaveAttribute('属性の名前')）
        expect(screen.getByRole('button')).toHaveAttribute('disabled')
    })

    // fetchが失敗した時のテストケース
    it('[Fetch failed] should display error message , no render h3, button abled', async () => {
        // server.use()で大元で作ったサーバーの内容を書き換えることができる（このテストケース内のみ有効な設定、次のテストケースではサーバーは元の状態に戻っている）
        server.use(
            rest.get(
                "https://jsonplaceholder.typicode.com/users/1",
                (req, res, ctx) => {
                    // エラーを設定したいのでstatusを404にする
                    return res(ctx.status(404));
                }
            )
        )
        render(<MockServer />);
        // ユーザがボタンをクリックした状態を表現
        userEvent.click(screen.getByRole('button'));
        // screen.debug(screen.getByRole("button"));
        
        // エラーメッセージを出すpタグにつけたdata-testIdで要素を取得
        expect(await screen.findByTestId('error')).toHaveTextContent('Fetching Failed !')

        // 通信に失敗した時（404が返ってきた時）h3 がないことと、ボタンが有効になっていることを確認
        // 存在しないことを確かめたいのでqueryByRole
        expect(screen.queryByRole('heading')).toBeNull();
        expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
    })
})