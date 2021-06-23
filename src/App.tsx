import React, {useEffect} from 'react';
import Router from './Router'
import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchCart, setUser, fetchToppings, fetchHistory, CartItem, noLoginCartAdd, UserState } from './features/users/userSlice'
import firebase from 'firebase'
import { fetchThunk } from './features/items/itemSlice'

const App: React.FC = () => {
  const userInfo:UserState['userInfo'] = useAppSelector(state => state.user.userInfo)
  const isSignedIn = useAppSelector(state => state.user.userInfo.isSignedIn)
  const uid = useAppSelector(state => state.user.userInfo.uid)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!isSignedIn){
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          const loginUser: UserState['userInfo'] = {
              uid: user.uid,
              isSignedIn: true,
              displayName: user.displayName,
          }
          dispatch(setUser(loginUser))
        } 
      })
    }

  })
  useEffect(() => {
    dispatch(fetchToppings())
    dispatch(fetchThunk())
    dispatch(fetchHistory(uid))
  }, [dispatch, uid])

  useEffect(() => {
    dispatch(fetchCart(userInfo))
  },[dispatch, userInfo])

  useEffect(() => {
    if(isSignedIn && uid){        
        const noLoginCart: CartItem[] = JSON.parse(localStorage.getItem('noLoginCart') || '[]')
        localStorage.setItem('noLoginCart', JSON.stringify([]));
        if(noLoginCart.length > 0 ){
            noLoginCart.forEach(item => dispatch(noLoginCartAdd(item)))
        }   
    }
  })

  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
