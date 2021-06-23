import React from 'react'
import { Typography } from '@material-ui/core';

const Title: React.FC<{title: string}>= ({title}) => {
    return (
        <Typography variant='h5'>{title}</Typography>
    )
}

export default Title