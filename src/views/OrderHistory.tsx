import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { UserState, fetchHistory } from '../features/users/userSlice'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import NoMessage from '../components/NoMessage';
import PrimaryBtn from '../components/PrimaryBtn';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
  },
  card: {
      marginBottom: 20,
      width: '80%',
      marginRight: 'auto',
      marginLeft: 'auto',
      position: 'relative'
  },
  cardHeader: {
      display: 'flex',
      paddingTop: 20,
      paddingBottom: 20,
      marginBottom: 20,
      paddingLeft:20,
      backgroundColor: '#f6f6f6!important',
      position: 'relative',
  },
  media: {
    height: 100,
    width: 100,
    marginRight: 20,
  },
  cardBody: {
      display: 'flex',
      marginBottom: 30,
      marginLeft: 20,
  },
  orderInfo: {
      position: 'absolute',
      right: 20
  },
  orderBtn: {
      position: 'absolute',
      right: 20,
  },
  noHistoryMsg: {
      textAlign: 'center',
      marginTop: '30%',
      fontSize: 40,
  },
  linkBtn: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'right',
      marginTop: 40,
  },
  canceledText: {
      color: 'red',
      marginLeft: 20,
  }
}))

const OrderHistory:React.FC = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const uid:string | undefined = useAppSelector(state => state.user.userInfo.uid)
    const history:UserState['history'] = useAppSelector(state => state.user.history)
    const userCart:UserState['cart'][] = history.map(item => item.userCart)
    const order:number[][][] = userCart.map(order => order.map(o => o.topping.map(i => i.toppingPrice)))
    const prices = []
    for(let i = 0; i < order.length; i++){
        prices.push(order[i])
    }
    const historyLink = useHistory()
    const page = (id: string):void => {
        historyLink.push(id)
    }
    
    // useEffect(() => {
    //     dispatch(fetchHistory(uid))
    // },[dispatch, uid])

    if(history.length > 0){
        return (
            <div>
                <h2 className={classes.title}>注文履歴</h2>
                {history.map((item, index: any) => 
                    <Card className={classes.card} key={index}>
                        <div className={classes.cardHeader}>
                            <div>
                                <div>注文日</div>
                                <div>{item.userOrderInfo.orderTimePoint}</div>
                            </div>
                            <div>
                                <span>合計</span>
                                <span>：¥{item.userOrderInfo.orderTotalPrice}</span>
                                {item.userOrderInfo.paymentMethod === 9 &&
                                    <span className={classes.canceledText}>キャンセル済み</span>
                                }
                            </div>
                            <div className={classes.orderBtn}>
                                <Button 
                                    onClick={() => page(`/your-order/${item.orderId}`)}
                                    variant='contained'
                                >注文内容を表示</Button>
                            </div>
                        </div>
                        {item.userCart.map(i => (
                            <div className={classes.cardBody} key={i.cartId}>
                                <CardMedia image={i.url} className={classes.media}></CardMedia>
                                <div>{i.name}</div>
                            </div>
                        ))}
                    </Card>
                )}
            </div>
        )
    } else {
        return (
            <div>
                <NoMessage label='履歴はありません' />
                <PrimaryBtn 
                        className={classes.linkBtn}
                        onClick={() => page('/')}
                        label='商品一覧へ'
                />
            </div>
        )
    }
}

export default OrderHistory
