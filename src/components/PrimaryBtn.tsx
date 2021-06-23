import React  from "react"
import Button from '@material-ui/core/Button';

export type PrimaryBtnProps = {
    label: string
    onClick?: () => void
    className?: string
    type?: string
    // variant: string
    // color: string
}
const PrimaryBtn: React.FC<PrimaryBtnProps> = (props: PrimaryBtnProps) => {
    return (
        <Button 
            variant='contained' 
            color='primary'
            onClick={props.onClick}
            className={props.className}
            // type={props.type}
        >{props.label}</Button>
    )
}

export default PrimaryBtn