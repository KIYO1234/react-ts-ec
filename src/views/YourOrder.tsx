import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import PrimaryBtn from '../components/PrimaryBtn'
import { Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import { UserState, fetchHistory, cancelOrder } from '../features/users/userSlice';
import Loading from '../components/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    marginBottom: 100, 
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    textAlign: 'center',
  },
  media: {
    height: 140,
    width: 140,
  },
  grid: {
    margin: '0 auto'
  },
  between: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 30,
      marginBottom: 30,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
  },
  desc: {
      width: 200,
  },
  addBtn: {
      position: 'absolute',
      right: 0,
  },
  flex: {
      display: 'flex'
  },
  linkBtnContainer: {
      width: '60%',
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 40,
  },
  linkBtn: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'right',
  },
  card: {
      marginBottom: 20,
      width: '80%',
      marginRight: 'auto',
      marginLeft: 'auto',
  },
  bold: {
      fontWeight: 'bold'
  },
  itemName: {
      fontSize: 25,
      marginBottom: 10,
  },
  total: {
      fontSize: 25,
      fontWeight: 'bold'
  },
  resultContainer: {
      textAlign: 'center',
      margin: 10,
  },
  preResultText: {
    fontSize: 25,
  },
  resultText: {
      fontSize: 30,
      fontWeight: 'bold',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardActionArea: {
      width: 200
  },
  cancelBtnContainer: {
      textAlign: 'right',
      paddingRight: 40,
      marginBottom: 30,
  },
  canceledText: {
      fontSize: 25,
      color: 'red',
      paddingRight: 40,
      marginBottom: 30,
  }
}));

const YourOrder: React.FC = () => {
    const classes = useStyles()
    const yourOrder:UserState['history'] = useAppSelector(state => state.user.history)
    const param = useParams<{orderId: string}>()
    const filteredYourOrder:UserState['history'] = yourOrder.filter(a => a.orderId === param.orderId)
    const order = filteredYourOrder[0]
    const uid:string | undefined = useAppSelector(state => state.user.userInfo.uid)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchHistory(uid))
    },[dispatch, uid])
    
    const history = useHistory()
    const link = (path:string):void => {
        history.push(path)
    }

    const cancel = (path:string):void => {
        if(window.confirm('本当に注文をキャンセルしますか？')){
            dispatch(cancelOrder(order))
            alert('注文がキャンセルされました')
            history.push(path)
        } else {
            alert('操作がキャンセルされました')
        }
    }

    
    if(order){
        
        return (
            <div className={classes.root}>
                <h2 className={classes.title}>お客様のご注文</h2>
                {order.userCart.length === 0 ?
                    <h2>お客様のご注文履歴はありません</h2>
                    :
                    <Card>
                        <Typography>注文日：{order.userOrderInfo.orderTimePoint} </Typography>
                        <Typography>注文者名：{order.userOrderInfo.orderName} 様</Typography>
                        {order.userOrderInfo.paymentMethod !== 9 &&
                            <div>
                                <Typography>配達先住所：{`〒 ${order.userOrderInfo.orderZipcode} ${order.userOrderInfo.orderAddress}`}</Typography>
                                <Typography>電話番号：{order.userOrderInfo.orderTel}</Typography>
                                <Typography>メールアドレス：{order.userOrderInfo.orderEmail}</Typography>
                                <Typography>配達予定日：{order.userOrderInfo.orderDate}</Typography>

                                <Typography>配達予定時間：
                                    {Number(order.userOrderInfo.orderTime) === 1 && 
                                    '9 ~ 11 時'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 2 && 
                                    '11 ~ 13 時'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 3 && 
                                    '15 ~ 17 時'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 4 && 
                                    '18 ~ 20 時'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 5 && 
                                    '21 ~ 23 時'
                                    }
                                </Typography>
                                <Typography>お支払い方法：
                                    {Number(order.userOrderInfo.paymentMethod) === 1 &&
                                    '代金引換'}
                                    {Number(order.userOrderInfo.paymentMethod) === 2 &&
                                    'クレジットカード'}
                                </Typography>
                            </div>
                        }

                        {order.userOrderInfo.paymentMethod === 9 ?
                        <div className={classes.canceledText}>キャンセル済み</div>
                        :
                        <div className={classes.cancelBtnContainer}>
                            <PrimaryBtn 
                                label='注文をキャンセル'
                                onClick={() => cancel('/order/history')}
                            />
                        </div>
                        }

                    {order.userCart.map((item, index: number) => 
                        <Card 
                            key={index}
                            className={classes.card} 
                        >
                            <Grid 
                                item xs={8} 
                                className={classes.grid}
                            >
                                <Grid className={classes.between}>
                                    <Grid item xs={12}>
                                        <CardMedia 
                                            className={classes.media}
                                            image={item.url} 
                                        />
                                    </Grid>
                                    <div>
                                        <Grid item xs={12} className={classes.desc}>

                                            <Typography className={classes.cardActionArea + ' ' + classes.itemName}>
                                                {item.name}
                                            </Typography>

                                            <div>
                                                <span className={classes.bold}>
                                                    価格：
                                                </span>
                                                <span>
                                                    ¥{item.price}
                                                </span>
                                            </div>
                                            <div>
                                                <span className={classes.bold}>
                                                    個数：
                                                </span>
                                                <span>
                                                    {item.quantity}
                                                </span>
                                            </div>

                                            <div>
                                                <span className={classes.bold}>
                                                    サイズ：
                                                </span>
                                                <span>
                                                    {item.size}
                                                </span>
                                                <div>
                                                    <p className={classes.bold}>
                                                        トッピング
                                                    </p>
                                                    {item.topping.length !== 0 ?

                                                        item.topping.map((t, index:number) => 
                                                        <div key={index}>・{t.toppingName}（{t.toppingSize}）</div>   
                                                        )
                                                    :
                                                        <span>なし</span>
                                                    }
                                                </div>
                                            </div>

                                            <Typography>
                                                <span className={classes.bold}>トッピング合計：</span>
                                                <span>¥{item.toppingTotal}</span>
                                            </Typography>

                                            <hr/>
                                            <Typography className={classes.total}>
                                                小計：¥{item.price * item.quantity + item.toppingTotal
                                                }
                                            </Typography>
                                            <hr/>

                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>
                    )}
                    </Card>
                }
                <hr/>
                <div className={classes.resultContainer}>
                    <Typography className={classes.preResultText}>小計：¥{Math.floor(order.userOrderInfo.orderTotalPrice)}</Typography>
                    <Typography className={classes.preResultText}>消費税：¥{Math.floor(order.userOrderInfo.orderTotalPrice * 0.1)}</Typography>
                    <Typography className={classes.resultText}>最終請求金額：¥{Math.floor(order.userOrderInfo.orderTotalPrice * 1.1)}</Typography>
                </div>
                <hr/>

                <div className={classes.linkBtnContainer}>
                    <PrimaryBtn 
                        className={classes.linkBtn}
                        onClick={() => link('/order/history')}
                        label='履歴画面へ'
                    />
                </div>
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }
}

export default YourOrder
