import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import firebase from 'firebase'

export interface UserState {
    userInfo: {
        uid: string | undefined
        isSignedIn: boolean
        displayName: string | null
        email?: string | undefined | null
    }
    cart: {
        cartId?: string | undefined;
        id: number
        name: string;
        desc: string;
        price: number
        url: string;
        size: string;
        quantity: number;
        topping: {
            toppingName: string;    
            toppingSize: string;
            toppingPrice: number;
            toppingId: string | undefined
        }[];
        priceM: number;
        priceL: number;
        toppingTotal: number
    }[]
    topping: {
        id: number,
        name: string,
        priceM: number,
        priceL: number,
    }[]
    orderInfo: {
        orderName: string;
        orderTel: string;
        orderEmail: string;
        orderZipcode: string;
        orderAddress: string;
        orderDate: string;
        orderTime: number;
        orderTimePoint: Date | null | string;
        paymentMethod: number;
        orderTotalPrice: number;
    }
    history: {
        userCart: {
            cartId?: string | undefined;
            desc: string;
            id: number
            name: string;
            price: number
            priceL: number
            priceM: number;
            quantity: number;
            size: string;
            topping: {
                toppingName: string;    
                toppingSize: string;
                toppingPrice: number;
                toppingId: string | undefined
            }[];
            url: string;
            toppingTotal: number
        }[],
        userOrderInfo: {
            orderAddress: string;
            orderDate: string;
            orderEmail: string;
            orderName: string;
            orderTel: string;
            orderTime: number;
            orderTimePoint: Date | null | string | object;
            orderTotalPrice: number;
            orderZipcode: string;
            paymentMethod: number;
        },
        orderId?: string;
    }[]
}

export const initialState: UserState = {
    userInfo: {
        uid: undefined,
        isSignedIn: false,
        displayName: '',
    },
    cart: [],
    topping: [],
    orderInfo: {
        orderAddress: '',
        orderDate: '',
        orderEmail: '',
        orderName: '',
        orderTel: '',
        orderTime: 0,
        orderZipcode: '',
        orderTimePoint: '',
        paymentMethod: 0,
        orderTotalPrice: 0,
    },
    history: []
}
export type carts = UserState['cart']
export type orderHistory = UserState['history']
export type orderType = UserState['orderInfo']

export interface CartItem {
    cartId?: string;
    id: number
    name: string;
    desc: string;
    price: number
    url: string;
    size: string;
    quantity: number;
    topping: {
        toppingName: string;
        toppingSize: string;
        toppingPrice: number;
        toppingId: string | undefined
    }[];
    priceM: number;
    priceL: number;
    toppingTotal: number;
    cartTotalPrice: number;
}


export const fetchCart = createAsyncThunk(
    'users/fetchCart',
    async (userInfo:UserState['userInfo']) => {
        const fetchedCart: UserState['cart'] = []
        if(userInfo.isSignedIn){
            await firebase.firestore().collection(`users/${userInfo.uid}/cart`).get().then(snapshot => snapshot.forEach(doc => fetchedCart.push({...doc.data(), cartId: doc.id} as CartItem )))
        } 
        return fetchedCart
    }
)

export const fetchToppings = createAsyncThunk(
    'users/fetchToppings',
    async () => {
        type toppingItem = {
            id: number,
            name: string,
            priceM: number,
            priceL: number,
        }
        const fetchedToppings: UserState['topping'] = []
        await firebase.firestore().collection('toppings').orderBy('id').get().then(snapshot => snapshot.forEach(doc => fetchedToppings.push(doc.data() as toppingItem)))
        return fetchedToppings
    }
)

export const fetchHistory = createAsyncThunk(
    'users/fetchHistory',
    async (uid: string | undefined) => {
        type IndividualOrder = {
            userCart: {
                cartId: string;
                desc: string;
                id: number
                name: string;
                price: number
                priceL: number
                priceM: number;
                quantity: number;
                size: string;
                topping: {
                    toppingName: string;    
                    toppingSize: string;
                    toppingPrice: number;
                    toppingId: string | undefined
                }[];
                url: string;  
                toppingTotal: number;
            }[],
            userOrderInfo: {
                orderAddress: '',
                orderDate: '',
                orderEmail: '',
                orderName: '',
                orderTel: '',
                orderTime: 0,
                orderTimePoint: '',
                orderTotalPrice: 0,
                orderZipcode: '',
                paymentMethod: 0,
            },
            orderId?: '',
        }
        const fetchedHistory: UserState['history'] = []
        await firebase.firestore().collection(`users/${uid}/orders`).get().then(snapshot => snapshot.forEach(doc => fetchedHistory.push({...doc.data(), orderId: doc.id} as IndividualOrder)))
        return fetchedHistory
    }
)

export interface OrderInfo {
    userOrderInfo: UserState['orderInfo'],
    userCart: UserState['cart'],
    uid: UserState['userInfo']['uid'],
}
export const asyncOrder = createAsyncThunk(
    'users/asyncOrder',
    async (orderInfo: OrderInfo) => {
        if(!orderInfo.userOrderInfo.paymentMethod){
           orderInfo.userOrderInfo.paymentMethod = 1
        }
        if(!orderInfo.userOrderInfo.orderTime){
            orderInfo.userOrderInfo.orderTime = 1
        }
        await firebase.firestore().collection(`users/${orderInfo.uid}/orders`).add(orderInfo)
        const cartIds:string[] = []
        orderInfo.userCart.forEach((item: any) => cartIds.push(item.cartId))
        const cartAfterAdd:any = []
        await firebase.firestore().collection(`users/${orderInfo.uid}/cart`).get().then(snapshot => snapshot.forEach(doc => cartAfterAdd.push({...doc.data(), cartId: doc.id})))
        await cartIds.forEach((cartId:string) => {
             firebase.firestore().doc(`users/${orderInfo.uid}/cart/${cartId}`).delete()
        })
        orderInfo.userCart = cartAfterAdd        
        return orderInfo
    }
)
type Chosen = {
    chosen: {
        desc: string,
        id: number,
        name: string,
        priceL: number,
        priceM: number,
        url: string,
    },
    price: number,
    quantity: number,
    size: string,
    topping: []
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addToCart: (state, action:PayloadAction<Chosen>) => {
            console.log(action.payload)
            
            if(action.payload.topping.length >= 2){
                const filteredTopping:any = action.payload.topping.filter(function(element:any, i: number, self: any){
                    return(self.findIndex(function(n:any){
                        return(element.toppingName === n.toppingName)
                    })=== i)}
                )
                action.payload.topping = filteredTopping
            } 
            
            if(action.payload.price === 0){
                action.payload.price = action.payload.chosen.priceM
            }
            let prices:any = []
            const toppingTotal = prices.reduce((a:number, b:number) => a + b, 0)

            let arrayForLS = []
            if(state.userInfo.isSignedIn){
                const cartRef = firebase.firestore().collection(`users/${state.userInfo.uid}/cart`).doc()
                const newCartItem: CartItem = {
                    cartId: cartRef.id,
                    id: action.payload.chosen.id,
                    name: action.payload.chosen.name,
                    desc: action.payload.chosen.desc,
                    price: action.payload.price,
                    url: action.payload.chosen.url,
                    size: action.payload.size,
                    quantity: action.payload.quantity,
                    topping: action.payload.topping,
                    priceM: action.payload.chosen.priceM,
                    priceL: action.payload.chosen.priceL,
                    toppingTotal: toppingTotal * action.payload.quantity,
                    cartTotalPrice: action.payload.price * action.payload.quantity + toppingTotal * action.payload.quantity
                }
                cartRef.set(newCartItem)
                state.cart = [newCartItem, ...state.cart]
                alert('商品をカートに追加しました')
            } else {
                const newCartItem: CartItem = {
                    id: action.payload.chosen.id,
                    name: action.payload.chosen.name,
                    desc: action.payload.chosen.desc,
                    price: action.payload.price,
                    url: action.payload.chosen.url,
                    size: action.payload.size,
                    quantity: action.payload.quantity,
                    topping: action.payload.topping,
                    priceM: action.payload.chosen.priceM,
                    priceL: action.payload.chosen.priceL,
                    toppingTotal: toppingTotal * action.payload.quantity,
                    cartTotalPrice: action.payload.price * action.payload.quantity + toppingTotal * action.payload.quantity
                }
                const noLoginCart:any = localStorage.getItem('noLoginCart')
                arrayForLS = [...JSON.parse(noLoginCart), newCartItem]
                localStorage.setItem('noLoginCart', JSON.stringify(arrayForLS))                
                alert('ログインしていません')
                state.cart = [newCartItem, ...state.cart]
            }
        },
        deleteFromCart: (state, action) => {
            const uid = state.userInfo.uid
            firebase.firestore().doc(`users/${uid}/cart/${action.payload}`).delete()
            state.cart = state.cart.filter(item => item.cartId !== action.payload)
        },
        setUser: (state, action) => {
            state.userInfo = action.payload
        },
        deleteUser: (state) => {
            const deletedUser: UserState['userInfo'] = {
                uid: undefined,
                isSignedIn: false,
                displayName: '',
            }
            state.userInfo = deletedUser
        },
        fetchCart: (state) => {
            const uid = state.userInfo.uid
            if(uid){
                const fetchedCart: UserState['cart'] = []
                firebase.firestore().collection(`users/${uid}/cart`).orderBy('id').get().then(snapshot => snapshot.forEach(doc => fetchedCart.push(doc.data() as CartItem)))
            } 
        },
        noLoginCartAdd: (state,action) => {
            const uid = state.userInfo.uid
            const cartRef = firebase.firestore().collection(`users/${uid}/cart`).doc()

            const newCartItem: CartItem = {
                cartId: cartRef.id,
                id: action.payload.id,
                name: action.payload.name,
                desc: action.payload.desc,
                price: action.payload.price,
                url: action.payload.url,
                size: action.payload.size,
                quantity: action.payload.quantity,
                topping: action.payload.topping,
                priceM: action.payload.priceM,
                priceL: action.payload.priceL,
                toppingTotal: action.payload.toppingTotal * action.payload.quantity,
                cartTotalPrice: action.payload.price * action.payload.quantity + action.payload.toppingTotal * action.payload.quantity
            }
            cartRef.set(newCartItem)
            
        },
        cancelOrder: (state, action) => {    
            firebase.firestore().doc(`users/${action.payload.uid}/orders/${action.payload.orderId}`).update({
                [`userOrderInfo.paymentMethod`] : 9
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                if(state.userInfo.isSignedIn){
                    const noLoginCart:any = localStorage.getItem('noLoginCart')
                    const length:number = JSON.parse(noLoginCart.length)
                                    
                    if(length <= 2){
                        state.cart = action.payload
                    } else {
                        const newNoLoginCart:any = JSON.parse(noLoginCart)
                        state.cart = newNoLoginCart
                    }
                } else {
                    const noLoginCart: CartItem[] = JSON.parse(localStorage.getItem('noLoginCart') || '[]')
                    state.cart = noLoginCart
                }
            })
            .addCase(fetchToppings.fulfilled, (state, action) => {
                state.topping = action.payload
            }) 
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.history = action.payload
            })
            .addCase(asyncOrder.fulfilled, (state, action) => {
                const order = {
                    userCart: action.payload.userCart, 
                    userOrderInfo: action.payload.userOrderInfo
                }
                state.cart = []
                localStorage.setItem('noLoginCart', JSON.stringify([]))
                state.history = [order, ...state.history]
            })
    }
})
export const {addToCart, deleteFromCart ,setUser, deleteUser, noLoginCartAdd, cancelOrder} = userSlice.actions
export const userInfo = (state: RootState): UserState['userInfo'] => state.user.userInfo
export const cartList = (state: RootState): UserState['cart'] => state.user.cart
export default userSlice.reducer