import reducer, { increment, decrement, incrementByAmount } from "../features/customCounter/customCounterSlice";

describe('Reducer of ReduxToolkit', () =>  {
    describe('increment action', () => {
        // テスト用に渡すモックstateを定義
        let initialState = {
            mode: 0,
            value: 1,
            username: '',
        }
        // increment メソッドでstate.mode = 0の場合=> state.value + 1される
        it('shoule increment by 1 with mode 0', () => {
            // actionを作る
            const action = {type: increment.type}
            
            // 新しいstateを計算し、stateに代入
            const state = reducer(initialState, action);
            
            // reducerが出力した値が予想通りになっているか確認
            expect(state.value).toEqual(2)
        })

        // increment メソッドでstate.mode = 1の場合 => state.value + 100される
        it('shoule increment by 100 with mode 1', () => {
            // stateのmodeを1にする
            initialState = {
                mode: 1,
                value: 1,
                username: '',
            }
            // actionを作る
            const action = {type: increment.type}
            
            // 新しいstateを計算し、stateに代入
            const state = reducer(initialState, action);

            // reducerが出力した値が予想通りになっているか確認
            expect(state.value).toEqual(101)
        })
        // increment メソッドでstate.mode = 1の場合 => state.value + 100される
        it('shoule increment by 10000 with mode 2', () => {
            // stateのmodeを1にする
            initialState = {
                mode: 2,
                value: 1,
                username: '',
            }
            // actionを作る
            const action = {type: increment.type}
            
            // 新しいstateを計算し、stateに代入
            const state = reducer(initialState, action);

            // reducerが出力した値が予想通りになっているか確認
            expect(state.value).toEqual(10001)
        })
    })

    // incrementByAmount のテスト
    describe('incrementByAmount action', () => {
        let initialState = {
            mode: 0,
            value: 1,
            username: '',
        }
        it('shoule increment by payload value with mode 0', () => {
            // payloadには好きな値を渡せる
            const action = {type: incrementByAmount.type, payload: 3}
            const state = reducer(initialState, action)

            expect(state.value).toEqual(4)
        })
        it('shoule increment by 100 * payload value with mode 1', () => {
            initialState = {
                mode: 1,
                value: 1,
                username: '',
            }
            const action = {type: incrementByAmount.type, payload: 3}
            const state = reducer(initialState, action)

            expect(state.value).toEqual(301)
        })
        it('shoule increment by 10000 * payload value with mode 2', () => {
            initialState = {
                mode: 2,
                value: 1,
                username: '',
            }
            const action = {type: incrementByAmount.type, payload: 3}
            const state = reducer(initialState, action)

            expect(state.value).toEqual(30001)
        })
    })
})