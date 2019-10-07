import React, { useState } from 'react';


const SubscriptionItem = ({ item: sourceItem, source }) => {

    const [item, setItem] = useState(sourceItem);

    const toggleSubscribe = (item) => {
        
    };

    const subscribe = (item) => {
        setItem({ ...item, isSubscribed: true, count: item.count + 1 });
    };

    const unsubscribe = (item) => {
        setItem({ ...item, isSubscribed: false, count: item.count - 1 });
    };

    return (
        <div className="subscriptions-group-item">
            <div className="subscriptions-group-item__info">
                <p className="subscriptions-group-item__title">{item.name}</p>
                <p className="subscriptions-group-item__count">Подписчиков: {item.count}</p>
            </div>
            <div className="subscriptions-group-item__action-block">

                {item.isSubscribed
                    ? <button data-source={source}
                        onClick={() => unsubscribe(item)}
                        className="subscriptions-group-button unsubscribe-button">Отписаться</button>
                    : <button data-source={source}
                        onClick={() => subscribe(item)}
                        className="subscriptions-group-button subscribe-button">Подписаться</button>
                }

            </div>
        </div>
    );
};

export default SubscriptionItem;