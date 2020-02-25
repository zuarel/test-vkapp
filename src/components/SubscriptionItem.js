import React from 'react';


const SubscriptionItem = (props) => {
    const {
        item,
        source,
        subscribe,
        unsubscribe,
        isSubscriptionPage,
        unsubscribeColor,
        subscribeColor
    } = props;
    
    return (
        <div className={`subscriptions-group-item ${isSubscriptionPage && 'subscription-page'}`}>
            <div className="subscriptions-group-item__info">
                <p className="subscriptions-group-item__title">{item.name}</p>
                <p className="subscriptions-group-item__count">Подписчиков: {item.count}</p>
                <p>{item.id}</p>
            </div>
            <div className="subscriptions-group-item__action-block">

                {item.isSubscribed
                    ? <button data-source={source}
                        onClick={() => unsubscribe(item)}
                        style={{backgroundColor: unsubscribeColor ? unsubscribeColor : ''}}
                        className="subscriptions-group-button unsubscribe-button">Отписаться</button>
                    : <button data-source={source}
                        onClick={() => subscribe(item)}
                        style={{backgroundColor: subscribeColor ? subscribeColor : ''}}
                        className="subscriptions-group-button subscribe-button">Подписаться</button>
                }

            </div>
        </div>
    );
};

export default SubscriptionItem;