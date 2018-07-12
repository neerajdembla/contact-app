import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions';
import AddContact from '../../components/AddContact/AddContact';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CardActions } from '@material-ui/core';
import {ButtonUI} from '../../components/UI/Button/Button';

const styles = {
    container:{
        display: 'flex',
        flexDirection : 'column',
    },
    card: {
      width : '80%',
      alignSelf : 'center',
      backgroundColor : 'lightblue',
      display : 'flex',
      justifyContent : 'space-around',
      flexWrap : 'wrap',
      margin: 10
    },
    center : {
        alignSelf: 'center'
    }
  };


class ContactList extends Component {
    render(){
        let {classes} = this.props;
        return <React.Fragment>
                <AddContact addContact={this.props.addContact} 
                    selectedContactId={this.props.selectedContactId}
                    contactList={this.props.contacts}
                    editContact={this.props.editContact}
                    selectContact={this.props.selectContact}
                />
                <div className={classes.container}>
                    {this.props.contacts.map(contact => {
                        return (
                            <Card key={contact.id} className={classes.card}>
                                <Typography className={classes.center}>{contact.firstName}</Typography>
                                <Typography className={classes.center}>{contact.lastName}</Typography>
                                <Typography className={classes.center}>{contact.email}</Typography>
                                <Typography className={classes.center}>{contact.phone}</Typography>
                                <CardActions>
                                    <ButtonUI onClick={this.props.deleteContact.bind(this, contact.id)}>Delete</ButtonUI>
                                    <ButtonUI onClick={this.props.selectContact.bind(this, contact.id)}>Edit</ButtonUI>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
            </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        contacts : state.contactList.contacts,
        selectedContactId: state.contactList.selectedContactId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteContact : (id) => dispatch(actionCreators.deleteContact(id)),
        editContact : (contact) =>  dispatch(actionCreators.editContact(contact)),
        listContacts : () => dispatch(actionCreators.listContacts()),
        addContact: (contact) => dispatch(actionCreators.addContact(contact)),
        selectContact : (id) => dispatch(actionCreators.selectContact(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactList));