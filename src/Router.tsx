import { Switch, Route, BrowserRouter } from 'react-router-dom'
import ProductList from './views/ProductList'
import Details from './views/Details'
import Cart from './views/Cart'
import OrderConfirm from './views/OrderConfirm'
import OrderHistory from './views/OrderHistory'
import YourOrder from './views/YourOrder'
import Header from './views/Header'
import OrderFinished from './views/OrderFinished'
import Hoge from './Test/Hoge'

const Router = () => {
    return (
        <>
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path={'/hoge'} component={Hoge}></Route>
                <Route path={'/order/finished'} component={OrderFinished}></Route>
                <Route path={'/your-order/:orderId'} component={YourOrder}></Route>
                <Route path={'/order/history'} component={OrderHistory}></Route>
                <Route path={'/order/confirm'} component={OrderConfirm}></Route>
                <Route path={'/cart'} component={Cart}></Route>
                <Route path={'/details/:id'} component={Details}></Route>
                <Route path={'/'} component={ProductList}></Route>
            </Switch>
        </BrowserRouter>
        </>
    )
}
export default Router