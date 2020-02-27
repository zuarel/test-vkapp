import React, { useState } from 'react';


const SubscriptionItem = (props) => {

    console.log('from sub item');
    

    const {
        item,
        source,
        handleAction,
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
                        style={{ backgroundColor: unsubscribeColor ? unsubscribeColor : '' }}
                        onClick={() => handleAction('unsubscribe', item)}
                        className="subscriptions-group-button unsubscribe-button">Отписаться</button>
                    : <button data-source={source}
                        style={{ backgroundColor: subscribeColor ? subscribeColor : '' }}
                        onClick={() => handleAction('subscribe', item)}
                        className="subscriptions-group-button subscribe-button">Подписаться</button>
                }

            </div>
        </div>
    );
};

export default SubscriptionItem;