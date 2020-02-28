export default (state = {}, action) => {
    switch(action.type) {
        case 'SUBSCRIBE_MAILING':
            return;
        case 'UNSUBSCRIBE_MAILING':
            return;
        case 'UNSUBSCRIBE_ALL':
            return;
        case 'APP_LOAD_BEGIN':
            return;
        case 'APP_LOAD_FAILED':
            return;
        case 'APP_LOAD_SUCCESS':
            return;
        case 'ALLOW_MESSAGES_FROM_GROUP_SUCCESS':
            return;
        case 'ALLOW_MESSAGES_FROM_GROUP_FAILED':
            return;

        default:
            return state;
    }
}