export default subscribeToMailing = () => ({
    type: 'SUBSCRIBE_MAILING'
})

export default unsubscribeFromMailing = () => ({
    type: 'UNSUBSCRIBE_MAILING'
})

export default unsubscribeFromAll = () => ({
    type: 'UNSUBSCRIBE_ALL'
})

export default appLoadBegin = () => ({
    type: 'APP_LOAD_BEGIN'
})

export default appLoadFailed = () => ({
    type: 'APP_LOAD_FAILED'
})

export default appLoadSuccess = () => ({
    type: 'APP_LOAD_SUCCESS'
})

export default allowMessagesFromGroupSuccess = () => ({
    type: 'ALLOW_MESSAGES_FROM_GROUP_SUCCESS'
})

export default allowMessagesFromGroupFailed = () => ({
    type: 'ALLOW_MESSAGES_FROM_GROUP_FAILED'
})