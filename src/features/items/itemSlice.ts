import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import firebase from 'firebase'

export interface ItemState {
    items: {
            id: number,
            name: string,
            desc: string,
            priceM: number,
            priceL: number,
            url: string,
            selectedSize?: string | null
            price? : number
    }[]  
}

export const initialState: ItemState = {
    items: [],
}

export const fetchThunk = createAsyncThunk(
    'items/fetchThunk',
    async () => {
        type Item = {
            id: number,
            name: string,
            desc: string,
            priceM: number,
            priceL: number,
            url: string,
            selectedSize?: string | null
            price?: number
        }
        const fetchedItems:ItemState['items'] = []
        await firebase.firestore().collection('items').orderBy('id').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
            fetchedItems.push(doc.data() as Item)
            })
        })
        return fetchedItems
    }
)

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchThunk.fulfilled, (state, action) => {
                state.items = action.payload
            })
    }
})

export const itemList = (state: RootState): ItemState['items'] => state.items.items
export default itemSlice.reducer