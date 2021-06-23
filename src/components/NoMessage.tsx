import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  noMsg: {
      textAlign: 'center',
      marginTop: '30%',
      fontSize: 40,
  }
}))
export type NoMessageProps = {
    label: string
}
const NoMessage: React.FC<NoMessageProps> = (props: NoMessageProps) => {
    const classes = useStyles()
    return (
        <div className={classes.noMsg}>
            {props.label}
        </div>
    )
}

export default NoMessage
