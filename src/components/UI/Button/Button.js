import React from 'react';
import Button from '@material-ui/core/Button';


export const ButtonUI = (props) => {

    return (
        <Button 
            variant="contained" 
            color={props.color ? props.color : "primary"}
            onClick={props.onClick}
            className={props.className ? props.className : ""}
        >
            {props.children}
      </Button>

    )
}