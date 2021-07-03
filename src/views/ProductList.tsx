import React, { useState } from 'react'
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import {useEffect} from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import { itemList, ItemState, fetchThunk } from '../features/items/itemSlice'
import { useAppDispatch } from '../app/hooks'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';


const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    margin: '0 auto'
  },
  title: {
    margin: '0 auto'
  },
  media: {
      height: 140,
  },
  grid: {
      width: 200,
      marginBottom: 20,
  },
  between: {
      justifyContent: 'space-between',
      marginTop: 50,
      padding: theme.spacing(2)
  },
  under: {
      marginBottom: 10,
  },
  bottom: {
      marginBottom: 40,
  },
  cardBody: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingRight: 20,
      paddingLeft: 20,
      height: 150,
  },
  textField: {
      textAlign: 'center',
      marginTop: 30,
  },
  searchBtn: {
      marginTop: 6,
      marginLeft: 20,
  },
  noMatchText: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: '10%',
  },
  inputBase: {
    border: '1px solid transparent',
    boxShadow: '0 2px 5px 1px rgb(64 60 67 / 16%)',
    borderRadius: 24,
    width: 400,
    paddingLeft: 30,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputArea: {
      width: 300,
  },
  icon: {
      padding: 5,
  },
  pen: {
      textAlign: 'right',
  },
}));

// function sum (a:number, b:number):number {
//     return a * b;
// };
// module.exports = sum;
export const sum = (a:number, b:number):number => {
    return a * b;
};

const ProductList: React.FC = () => {
    let items:ItemState['items'] = useSelector(itemList)
    const dispatch = useAppDispatch()
    const classes = useStyles()
    useEffect(() => {
        dispatch(fetchThunk())
    }, [dispatch])

    useEffect(() => {
        setShowingItems(items)
    }, [items])
    
    const history = useHistory()
    const link = (path: string) => {
        history.push(path)
    }

    const [searchWord, setSearchWord] = useState<string>('')
    const [showingItems, setShowingItems] = useState<ItemState['items']>([])
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setSearchWord(e.target.value)
    }
   
    const search = ():void => {
        const list:ItemState['items'] = items.filter(item => item.name.indexOf(searchWord) !== -1 )
        setShowingItems(list)
    }

    const clear = () => {
        setSearchWord('')
        setShowingItems(items)
    }
    return (
        <div className={classes.root}>
            <div className={classes.inputBase}>
                <InputBase
                    className={classes.inputArea}
                    placeholder='Search'
                    onChange={handleChange}
                    onKeyPress={() => search()}
                    value={searchWord}
                />
                <IconButton onClick={() => search()} className={classes.icon}>
                    <SearchIcon/>
                </IconButton>
                <IconButton onClick={() => clear()} className={classes.icon}>
                    <ClearIcon/>
                </IconButton>
            </div>
            <div className={classes.pen}>
                <IconButton onClick={() => link('/hoge')}>
                    <CreateIcon />
                </IconButton>
            </div>
            <form action="/api/v1">
                <button type='submit'>送信</button>
            </form>
            {showingItems.length > 0 && 
                <Grid 
                container 
                spacing={4} 
                className={classes.between}
            >
                {showingItems.map(item => (
                    <Card 
                        key={item.id}
                        className={classes.bottom}    
                    >
                        <CardActionArea 
                            onClick={() => link(`/details/${item.id}`)}
                            >
                            <Grid 
                                item xs={4}  
                            >
                                <Grid className={classes.grid}>
                                    <CardMedia 
                                        image={item.url} 
                                        className={classes.media}
                                    />
                                    <div className={classes.cardBody}> 
                                        <Typography className={classes.under}>
                                            {item.name}
                                        </Typography>
                                        <Typography>
                                            M：¥{item.priceM}
                                        </Typography>
                                        <Typography>
                                            L：¥{item.priceL}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardActionArea>
                    </Card>
                ))}
            </Grid>
            }
            {showingItems.length === 0 && 
                <div className={classes.noMatchText}>該当する商品はありません</div>
            }
        </div>
    )
}

export default ProductList