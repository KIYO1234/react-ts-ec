import React, {useEffect} from 'react';
import Router from './Router'
import { useAppSelector, useAppDispatch } from './app/hooks';
import { fetchCart, setUser, fetchToppings, fetchHistory, CartItem, noLoginCartAdd, UserState } from './features/users/userSlice'
import firebase from 'firebase'
import { fetchThunk } from './features/items/itemSlice'
import RenderInput from './Test/RenderInput';
import FrameworkList from './Test/FrameworkList';
import UseEffectRender from './Test/UseEffectRender';

const App: React.FC = () => {
  // テスト用ダミーデータ------------------------
    const data = [
      {id: 1, item: 'React'},
      {id: 2, item: 'Angular'},
      {id: 3, item: 'Vue'},
    ]

 // -----------------------------------------------

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
      <RenderInput outputConsole={console.log}/>
      <FrameworkList frameworks={data}/>
      {/* <FrameworkList /> */}
      <UseEffectRender />
    </div>
  );
}

export default App;
