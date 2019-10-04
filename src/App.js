import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import './css/vkapp.css';

import { Panel, PanelHeader } from '@vkontakte/vkui';

const getObjectFromURL = (url) => {
    const obj = {};
    const search = url.slice(1);
    const params = search.split('&');

    return params.reduce((acc, item) => {

        const [key, value] = item.split('=');

        acc[key] = value;

        return acc;
    }, {});
};


const App = () => {

    const hashObject = getObjectFromURL(window.location.hash);
    const searchObject = getObjectFromURL(window.location.search);

    const vk_group_id = searchObject.vk_group_id || '';
    const subscriptionId = hashObject.s || '';

    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const removeFromSubscriptions = (id) => {
        const subs = subscriptions.filter(subscription => subscription.id !== id);
        setSubscriptions(subs);
    };

    const load = () => {
        setSubscriptions([
            {id: 1, name: 'test 1', count: 1},
            {id: 2, name: 'test 2', count: 0},
        ]);
    };

    useState(() => {
        load();
    });

    return (
        <View activePanel="main">
            <Panel id="main">
                <PanelHeader>Рассылка сообщений</PanelHeader>
                <div style={{ padding: '15px' }}>
                    <p className="page-title">
                        <img src="https://sun9-44.userapi.com/c845418/v845418151/d56e6/f677KFnZxQ8.jpg?ava=1" alt="Аватарка паблика" style={{ borderRadius: '50%', marginRight: '16px' }}></img>
                        Pictures box
                    </p>
                    <p className="page-description">В этом списке рассылок можете выбрать те рассылки нашего сообщества,
                        которые будут приходить в максимально неудобное вам время и которые вы не будете читать.
                    Независимо от этого мы будем их вам присылать, так что подумайте дважды</p>

                    {subscriptionId ? }

                    {subscriptions.map(subscription => (
                        <div key={subscription.id} className="subscriptions-group-item">
                            <div className="subscriptions-group-item__info">
                                <p className="subscriptions-group-item__title">{subscription.name}</p>
                                <p className="subscriptions-group-item__count">Подписчиков: {subscription.count}</p>
                            </div>
                            <div className="subscriptions-group-item__action-block">
                                <button
                                    onClick={() => removeFromSubscriptions(subscription.id)}
                                    data-source="1"
                                    className="subscriptions-group-button subscribe-button"
                                    data-id={subscription.id}>Подписаться</button>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </Panel>
        </View >
    );
}

export default App;

