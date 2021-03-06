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
        if(window.confirm('????????????????????????????????????????????????')){
            dispatch(cancelOrder(order))
            alert('???????????????????????????????????????')
            history.push(path)
        } else {
            alert('???????????????????????????????????????')
        }
    }

    
    if(order){
        
        return (
            <div className={classes.root}>
                <h2 className={classes.title}>?????????????????????</h2>
                {order.userCart.length === 0 ?
                    <h2>?????????????????????????????????????????????</h2>
                    :
                    <Card>
                        <Typography>????????????{order.userOrderInfo.orderTimePoint} </Typography>
                        <Typography>???????????????{order.userOrderInfo.orderName} ???</Typography>
                        {order.userOrderInfo.paymentMethod !== 9 &&
                            <div>
                                <Typography>??????????????????{`??? ${order.userOrderInfo.orderZipcode} ${order.userOrderInfo.orderAddress}`}</Typography>
                                <Typography>???????????????{order.userOrderInfo.orderTel}</Typography>
                                <Typography>????????????????????????{order.userOrderInfo.orderEmail}</Typography>
                                <Typography>??????????????????{order.userOrderInfo.orderDate}</Typography>

                                <Typography>?????????????????????
                                    {Number(order.userOrderInfo.orderTime) === 1 && 
                                    '9 ~ 11 ???'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 2 && 
                                    '11 ~ 13 ???'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 3 && 
                                    '15 ~ 17 ???'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 4 && 
                                    '18 ~ 20 ???'
                                    }
                                    {Number(order.userOrderInfo.orderTime) === 5 && 
                                    '21 ~ 23 ???'
                                    }
                                </Typography>
                                <Typography>?????????????????????
                                    {Number(order.userOrderInfo.paymentMethod) === 1 &&
                                    '????????????'}
                                    {Number(order.userOrderInfo.paymentMethod) === 2 &&
                                    '????????????????????????'}
                                </Typography>
                            </div>
                        }

                        {order.userOrderInfo.paymentMethod === 9 ?
                        <div className={classes.canceledText}>?????????????????????</div>
                        :
                        <div className={classes.cancelBtnContainer}>
                            <PrimaryBtn 
                                label='????????????????????????'
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
                                                    ?????????
                                                </span>
                                                <span>
                                                    ??{item.price}
                                                </span>
                                            </div>
                                            <div>
                                                <span className={classes.bold}>
                                                    ?????????
                                                </span>
                                                <span>
                                                    {item.quantity}
                                                </span>
                                            </div>

                                            <div>
                                                <span className={classes.bold}>
                                                    ????????????
                                                </span>
                                                <span>
                                                    {item.size}
                                                </span>
                                                <div>
                                                    <p className={classes.bold}>
                                                        ???????????????
                                                    </p>
                                                    {item.topping.length !== 0 ?

                                                        item.topping.map((t, index:number) => 
                                                        <div key={index}>???{t.toppingName}???{t.toppingSize}???</div>   
                                                        )
                                                    :
                                                        <span>??????</span>
                                                    }
                                                </div>
                                            </div>

                                            <Typography>
                                                <span className={classes.bold}>????????????????????????</span>
                                                <span>??{item.toppingTotal}</span>
                                            </Typography>

                                            <hr/>
                                            <Typography className={classes.total}>
                                                ???????????{item.price * item.quantity + item.toppingTotal
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
                    <Typography className={classes.preResultText}>???????????{Math.floor(order.userOrderInfo.orderTotalPrice)}</Typography>
                    <Typography className={classes.preResultText}>??????????????{Math.floor(order.userOrderInfo.orderTotalPrice * 0.1)}</Typography>
                    <Typography className={classes.resultText}>???????????????????????{Math.floor(order.userOrderInfo.orderTotalPrice * 1.1)}</Typography>
                </div>
                <hr/>

                <div className={classes.linkBtnContainer}>
                    <PrimaryBtn 
                        className={classes.linkBtn}
                        onClick={() => link('/order/history')}
                        label='???????????????'
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
