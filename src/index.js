import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { ScreenSpinner } from '@vkontakte/vkui';


// Init VK  Mini App
bridge.send('VKWebAppInit');


const initialState = {
    subscriptions: [],
    loading: true,
    subscribesCount: 0,
    showUnsubscribeAll: false,
};

function MyReducer(state = initialState, action) {

    switch (action.type) {

        case 'LOAD_BEGIN':
            return { ...state, loading: true, };

        case 'INFO_LOADED':
            return { ...state, ...action.payload, loading: false, }

        case 'TOGGLE_SUBSCRIBE':
            return {
                ...state,
                subscribesCount: state.subscribesCount + 1 * (action.payload.type === 'subscribe' ? 1 : -1),
                subscriptions: state.subscriptions.map(sub => (sub.id === action.payload.id) ? { ...sub, isSubscribed: (action.payload.type === 'subscribe') ? true : false, count: (action.payload.type === 'subscribe') ? sub.count + 1 : sub.count - 1 } : sub)
            }
        // return { ...state, ...action.payload }

        case 'UNSUBSCRIBE_ALL':

            return {
                ...state,
                subscriptions: state.subscriptions.map(item => (item.isSubscribed ? { ...item, isSubscribed: false } : item)),
                subscribesCount: 0
            }
    }

    return state;
}

const store = createStore(MyReducer, applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));
