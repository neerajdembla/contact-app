import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {contactListReducer} from './containers/ContactList/store/reducer';

const rootReducer = combineReducers({
    contactList : contactListReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const logger = store => {
    return next => {
        return action => {
            console.log("middleware ", action);
            let result = next(action);
            console.log("results next state ", store.getState());
            return result;
        }
    }
}
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
