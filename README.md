This project exercise is a contact app with basic CRUD operations in place. 

Following is the project structure  : 

containers : this folder consist of 'ContactList' component which stores entire state of our application. 

    each container component has a store folder with action, actionTypes, reducers defined for that component. 

    all the reducers are combined in index.js

components : this folder consist of presentational components like 'AddContact'       which expects props from container 'contactList'. 

    We have other components like button, textfield which we can reuse. 


We respect single source of truth principle hence only pass contact id throughout application for data communication.

Following are the Technologies used : 
 Framework :  React,
 State Management : Redux, thunk,
 UI : React Material


To run this project, Please navigate to root folder (/contact-app) and 'run npm install' then 'npm start' to start the application. 

