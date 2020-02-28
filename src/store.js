import { createStore, applyMiddleware } from 'redux'
// import RootReducer from './reducers';
import thunk from 'redux-thunk';

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

        case 'LOAD_FAILED':
            return {
                ...state,
                loading: false,
                html: action.payload.html
            }

        case 'INFO_LOADED':
            return { ...state, ...action.payload, loading: false, }

        case 'TOGGLE_SUBSCRIBE':
            return {
                ...state,
                subscribesCount: state.subscribesCount + 1 * (action.payload.type === 'subscribe' ? 1 : -1),
                subscriptions: state.subscriptions.map(sub => (sub.id === action.payload.id) ? { ...sub, isSubscribed: (action.payload.type === 'subscribe') ? true : false, count: (action.payload.type === 'subscribe') ? sub.count + 1 : sub.count - 1 } : sub)
            }

        case 'UNSUBSCRIBE_ALL':

            return {
                ...state,
                subscriptions: state.subscriptions.map(item => (item.isSubscribed ? { ...item, isSubscribed: false } : item)),
                subscribesCount: 0
            }

        default:
            return state;
    }
}

const store = createStore(MyReducer, applyMiddleware(thunk));

export default store;