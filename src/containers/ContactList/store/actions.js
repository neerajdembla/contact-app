import * as actionTypes from './actionTypes';

export const deleteContact = (id) => {
    return {
        type : actionTypes.DELETE_CONTACT,
        payload : id
    };
}

export const editContact = (contact) => {
    return {
        type : actionTypes.EDIT_CONTACT,
        payload : contact
    }
}

export const listContacts = () => {
    return {
        type : actionTypes.LIST_CONTACTS,
    }
}

export const addContact = (contact) => {
    return {
        type: actionTypes.ADD_CONTACT,
        payload : contact
    }
}

export const selectContact = (id) => {
    return {
        type : actionTypes.SELECT_CONTACT,
        payload : id
    }
}