import { useParams } from 'react-router';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import PrimaryBtn from '../components/PrimaryBtn'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addToCart } from "../features/users/userSlice";
import { useHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useState, useEffect } from "react";
import { UserState } from '../features/users/userSlice'
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { fetchThunk, ItemState } from '../features/items/itemSlice'
import Loading from '../components/Loading'

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    margin: '0 auto',
    marginBottom: 100,
  },
  media: {
    height: 100,
    width: 100,
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
  flex: {
      display: 'flex'
  },
  linkBtn: {
      display: 'inline',
      marginLeft: 'auto',
      textAlign: 'right'
  },
  buttons: {
      display: 'flex',
      width: '80%',
      justifyContent: 'space-between'
  },
  select: {
      width: 100,
      marginRight: 20,
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
  toggle: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  toggleOpen: {
    transform: 'rotate(180deg)',
  },
  cardContent: {
      width: 400
  },
  inline: {
      display: 'inline'
  },
  bottom: {
      marginTop: 30,
      marginBottom: 30,
  },
  loading: {
      marginLeft: 'auto',
      marginRight: 'auto',
  }
}));

const Details: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchThunk())
    }, [dispatch])
    let items:ItemState['items'] = useAppSelector(state => state.items.items)
    const classes = useStyles()
    const {id} = useParams<{id: string}>()
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
    const index:number = items.findIndex(item => item.id === Number(id))
    let chosen:Item = items[index]
    const history = useHistory()
    const link = (path:string) => {
        history.push(path)
    }
    const [{size, price}, setSizeAndPrice] = useState<{size: string, price: number}>({size: 'M', price: 0})
    const handleChangeSizeAndPrice = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>): void => {
        if(e.target.value === 'M'){
            setSizeAndPrice({size: e.target.value, price: chosen.priceM})            
        } else if (e.target.value === 'L') {
            setSizeAndPrice({size: e.target.value, price: chosen.priceL})
        }
    }
        
    // トッピング    
    const toppings: UserState['topping'] = useAppSelector(state => state.user.topping)
    
    // トッピング画面のtoggle
    const [expanded, setExpanded] = React.useState<boolean>(false)
    const handleExpandClick = ():void => {
        setExpanded(!expanded)
    }
    
    interface selectedTopping {
        toppingName: string,
        toppingPrice: number,
        toppingSize: string
    }
    
    // トッピング
    const[topping, setTopping] = React.useState<any>([])
    const handleTopping = (e:any) :void => {
        const includeL = e.target.value.indexOf('L')
        const includeM = e.target.value.indexOf('M')
        
        if(includeL !== -1){
            let t: selectedTopping = {
                toppingName: e.target.ariaLabel,
                toppingPrice: 300,
                toppingSize: e.target.title
            }
            let result = topping.filter(((element: selectedTopping, index: number,self: any) => self.findIndex((e:any) => e.toppingName === element.toppingName) === index))
            setTopping([t, ...result])
            
        } else if (includeM !== -1){
            let t: selectedTopping = {
                toppingName: e.target.ariaLabel,
                toppingPrice: 200,
                toppingSize: e.target.title
            }
            let result = topping.filter(((element: selectedTopping, index: number,self: []) => self.findIndex((e:any) => e.toppingName === element.toppingName) === index))    
            setTopping([t, ...result])
        } else {
            let index:number = topping.findIndex((item: selectedTopping) => item.toppingName === e.target.ariaLabel)
            let deletedTopping:selectedTopping[] = topping
            deletedTopping.splice(index, 1)
        }
    }
    
    // 個数
    const [quantity, setQuantity] = useState(1)
    const handleQuantity = (e:any): void => setQuantity(e.target.value)
    
    if(chosen) {
        return (
            <div className={classes.root}>
            <Card className={classes.bottom}>
                <Grid 
                    item xs={8} 
                    className={classes.grid}
                    >
                    <Grid className={classes.between}>
                        <Grid item xs={12}>
                            <CardMedia 
                                className={classes.media}
                                image={chosen.url} 
                                />
                        </Grid>
                        <div>
                            <Grid item xs={12} className={classes.desc}>
                                <div>
                                    {chosen.name}
                                </div>
                                <div>
                                    M：¥{chosen.priceM}
                                </div>
                                <div>
                                    L：¥{chosen.priceL}
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                    <div className={classes.bottom}>{chosen.desc}</div>
                    <div>
                        <FormControl>
                            <InputLabel>Size</InputLabel>
                            {/* 商品サイズ */}
                            <Select 
                                value={size}
                                className={classes.select}
                                onChange={handleChangeSizeAndPrice}
                                >
                                <MenuItem value='M'>M</MenuItem>
                                <MenuItem value='L'>L</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel>個数</InputLabel>
                            {/* 商品の個数 */}
                            <Select 
                                value={quantity}
                                className={classes.select}
                                onChange={handleQuantity}
                                >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>

                        {/* 追加ボタン */}
                        <PrimaryBtn 
                            onClick={() => 
                                [
                                    dispatch(addToCart({chosen, size, price, topping, quantity})),
                                    link('/')
                                ]
                            }
                            label='追加'
                        />
                    </div>
                    <CardActions>トッピング
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label='show more'
                            >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse 
                        in={expanded}
                        timeout='auto'
                        unmountOnExit
                        >
                        <CardContent 
                            className={classes.cardContent}
                            >
                            {toppings.map(topping => 
                                <div key={topping.id}>
                                    {topping.name}
                                    <FormControl
                                        component='fieldset'
                                        >
                                        <RadioGroup 
                                            className={classes.inline}
                                            onChange={handleTopping}
                                            >

                                            <FormControlLabel label='M'control={<Radio inputProps={{'aria-label': topping.name, 'title': 'M'}}/>}
                                            value={`${topping.name} M`}/>

                                            <FormControlLabel label='L'control={<Radio inputProps={{'aria-label': topping.name, 'title' : 'L'}}/>}
                                            value={`${topping.name} L`} />

                                            <FormControlLabel 
                                                label='なし'
                                                control={<Radio inputProps={{'aria-label': topping.name, 'title': 'no'}}/>}
                                                value={`${topping.name} no`} />
                                        </RadioGroup>
                                    </FormControl>
                                
                                </div>
                            )}
                            
                        </CardContent>
                    </Collapse> 
                </Grid>
            </Card>
            <div className={classes.buttons}>
                <PrimaryBtn 
                    className={classes.linkBtn}
                    onClick={() => link('/')}
                    label='商品一覧へ'
                    />
                <PrimaryBtn 
                    className={classes.linkBtn}
                    onClick={() => 
                        [
                            dispatch(addToCart({chosen, size, price, topping, quantity})),
                            link('/'),
                        ]
                    }
                    
                    label='追加'
                    />
                <PrimaryBtn 
                    className={classes.linkBtn}
                    onClick={() => link('/cart')}
                    label='カートへ'
                    />
            </div>
        </div>
        )
    } else {
        return (
            <Loading></Loading>
        )
    }
        
}
    
    export default Details

