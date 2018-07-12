import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextFieldUI from '../../components/UI/TextField/TextField';
import {ButtonUI} from '../../components/UI/Button/Button';
import './AddContact.css';
import { withStyles } from '@material-ui/core/styles';
import { withMobileDialog, Typography } from '@material-ui/core';

const styles = {
    container : {
        display : 'flex',
        flexDirection : 'column',
        padding : 20,
        flexWrap : 'wrap'
    },
    textfield :{
        width : "70%",
        alignSelf : "center"
    },
    button : {
        margin : 10,
        width : "70%",
        alignSelf : "center"
    },
    errorMsg : {
        width : "70%",
        alignSelf : "center",
        color: "red"
    }

}
const initialState = {
    firstName : "",
    lastName : "",
    email : "",
    phone : "",
    isFirstNameValid : true,
    firstNameErrorMsg : "Please enter a valid first name",
    isLastnameValid : true,
    lastNameErrorMsg : "Please enter a valid last name",
    isEmailValid : true,
    emailErrorMsg : "Plese enter a valid email",
    isPhoneValid : true,
    phoneErrorMsg : "Please enter a valid phone number",
    touched : false
}

class AddContact extends Component {
    
    state = initialState

    // we look for 'selectedContactId' prop to enable the edit mode or add mode of form
    componentWillUpdate(nextProps){
        if(nextProps.selectedContactId !== this.props.selectedContactId){
            let selectedContact = this.props.contactList.find(contact => {
                return contact.id === nextProps.selectedContactId
            })

            if(selectedContact){
                this.setState({
                    ...initialState,
                    firstName : selectedContact.firstName,
                    lastName: selectedContact.lastName,
                    email : selectedContact.email,
                    phone : selectedContact.phone
                })
            }
        }
    }

    // reset form with default values
    clearForm = () => {
        this.setState({
            ...initialState
        })
    }
    // create contact object from state and dispatch it to reducer.
    addContact = () => {
       if(!this.validate()){
        return;
       }
        const contact = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            phone: this.state.phone,
            email: this.state.email
        }
        this.props.addContact(contact);
        this.clearForm();
    }

    //find the old object from state and update required fields and dispatch it to reducer
    editContact = () => {
       let oldContact = this.props.contactList.find(contact => {
           return contact.id === this.props.selectedContactId
       })
       let newContact = {...oldContact};
        newContact.firstName = this.state.firstName;
        newContact.lastName = this.state.lastName;
        newContact.email = this.state.email;
        newContact.phone = this.state.phone;

        this.props.editContact(newContact);
        this.clearForm();
        this.props.selectContact(null);
    }

    // validate field value and update state with error boolean for that field accordingly
    handleTextChange = (field, event) => {
        switch(field){
            case 'firstName' : {
                const isValid = this.isTextValid(event.target.value);
                this.setState({
                    isFirstNameValid : isValid
                })
            }; break;
            case 'lastName' : {
                const isValid = this.isTextValid(event.target.value);
                this.setState({
                    isLastnameValid : isValid
                })
            }; break;
            case 'email' : {
                const isValidText = this.isTextValid(event.target.value);
                let isValidEmail = false;
                if(isValidText){
                    isValidEmail = this.isEmailValid(event.target.value);
                }
                this.setState({
                    isEmailValid : isValidText && isValidEmail
                })
            }; break;
            case 'phone' : {
                const isValidText = this.isTextValid(event.target.value);
                let isValidPhone;
                if(isValidText){
                    isValidPhone = this.isNumberValid(event.target.value);
                }
                this.setState({
                    isPhoneValid : isValidText && isValidPhone
                })
            }
        }
        this.setState({
            [field] : event.target.value,
            touched : true
        })
    }

    // validate if any text field value is valid or not.
    isTextValid(field) {
        if(field && field.length > 0){
            return true;
        }
        return false;
    }

    // validate if any text is a valid number or not.
    isNumberValid(field){
        if(field && (field+"").length === 10 && !isNaN(field)){
            return true;
        }
        return false;
    }

    // validate if any text is a valid email address
    isEmailValid(field){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(field).toLowerCase());
    }

    validate = () => {
        const {isFirstNameValid, 
            isLastnameValid,
            isEmailValid, 
            isPhoneValid,
            firstName,
            lastName,
            phone,
            email,
            touched} = this.state;
        
        if(!touched){
            this.setState({
                isFirstNameValid : false,
                isLastnameValid : false,
                isEmailValid : false,
                isPhoneValid : false
            })
            return false;
        }
        if(!(isFirstNameValid && isLastnameValid && isEmailValid && isPhoneValid)) {
            return false;
        }
        return true;
    }

    render(){
        let {firstName, lastName, email, phone} = this.state;
        let {classes} = this.props;
        let button;
        let firstNameError;
        let lastNameError;
        let emailError;
        let phoneError;
        // render Edit/Add button accordingly if selectedContactId prop is bieng passed
        if(this.props.selectedContactId){
            button = (
                <ButtonUI onClick={this.editContact} 
                className={classes.button}>Edit Contact</ButtonUI>
            )
        }else{
            button = (
                <ButtonUI onClick={this.addContact}
                className={classes.button}>Add Contact</ButtonUI>
            )
        }
        if(!this.state.isFirstNameValid){
            firstNameError = (<Typography variant="caption" className={classes.errorMsg}>{this.state.firstNameErrorMsg}</Typography>)
        }
        if(!this.state.isLastnameValid){
            lastNameError = <Typography variant="caption" className={classes.errorMsg}>{this.state.lastNameErrorMsg}</Typography>
        }
        if(!this.state.isEmailValid){
            emailError = <Typography variant="caption" className={classes.errorMsg}>{this.state.emailErrorMsg}</Typography>
        }
        if(!this.state.isPhoneValid){
            phoneError = <Typography variant="caption" className={classes.errorMsg}>{this.state.phoneErrorMsg}</Typography>
        }
        return (
            <div className={classes.container}>
                <TextFieldUI
                    id="fname"  
                    label="First Name*"
                    handleChange={this.handleTextChange.bind(this, 'firstName')}
                    value={firstName}
                    className={classes.textfield}
                />
                {firstNameError}
                <TextFieldUI 
                    id="lname"
                    label="Last Name*"
                    handleChange={this.handleTextChange.bind(this, 'lastName')}
                    value={lastName}
                    className={classes.textfield}
                />
                {lastNameError}

                <TextFieldUI 
                    id="email"
                    label="Email*"
                    handleChange={this.handleTextChange.bind(this, 'email')}
                    value={email}
                    className={classes.textfield}
                />
                {emailError}
                <TextFieldUI 
                    id="phone"
                    label="Phone*"
                    handleChange={this.handleTextChange.bind(this, 'phone')}                    
                    value={phone}
                    className={classes.textfield}
                />
                {phoneError}

               {button}
            </div>
        )
    }
}

export default withStyles(styles)(AddContact);