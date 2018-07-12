import * as actionTypes from './actionTypes';
import {generateID} from '../../../utility';

const initialState = {
    contacts : [],
    selectedContactId : null
}

// create a new contact object with generated id and push in contact list array.
const addContact = (state, contact) => {
    const newContacts = state.contacts.slice();
    if(contact){
        const id = generateID();
        contact.id = id;
        newContacts.push(contact);
    }
    return {
        ...state,
        contacts: newContacts
    }
}

// find the object by id and filter out from contacts array
const deleteContact = (state, id) => {
    const newContacts = state.contacts.filter(contact => {
        return contact.id !== id;
    })
    return {
        ...state,
        contacts : newContacts
    }
}

/* loop over the contacts array and replace the object matching id for passed object
    with the new one
*/
const editContact = (state, newContact) => {
    let newContacts = state.contacts.map(contact => {
        if(contact.id === newContact.id){
            return newContact
        }
        return contact
    })
    return {
        ...state,
        contacts : newContacts
    }
}

// update id of selected object with passed id.
const selectContact = (state, id) => {
    return {
        ...state,
        selectedContactId : id
    }
}

export const contactListReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_CONTACT : return addContact(state, action.payload);
        case actionTypes.DELETE_CONTACT : return deleteContact(state, action.payload);
        case actionTypes.EDIT_CONTACT : return editContact(state, action.payload);
        case actionTypes.SELECT_CONTACT : return selectContact(state, action.payload);
    }   
    return state;
}