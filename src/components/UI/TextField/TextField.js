import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const styles = {
    textField : {

    }
}

class TextFieldUI extends Component {

    render(){
        let {id, label, classes, value, handleChange, margin, className} = this.props;
        
        return (
            <TextField
                id={id}
                label={label}
                value={value}
                onChange={handleChange}
                margin={margin ? margin : "normal"}
                className={className ? className : ""}
            />
        )
    }
}

TextFieldUI.propTypes = {
    id : PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    margin: PropTypes.string
}

export default withStyles(styles)(TextFieldUI);