import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import './css/vkapp.css';

import { Panel, PanelHeader } from '@vkontakte/vkui';
import SubscriptionsList from './components/SubscribersList';
import SubscriptionItem from './components/SubscriptionItem';

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

    const load = () => {
        setSubscriptions([
            { id: 1, name: 'test 1', count: 1, isSubscribed: true, banner: 'https://scx1.b-cdn.net/csz/news/800/2019/1-nature.jpg' },
            { id: 2, name: 'test 1', count: 1 },
            { id: 3, name: 'test 1', count: 1 },
            { id: 4, name: 'test 1', count: 1 },
            { id: 5, name: 'test 2', count: 0 },
            { id: 6, name: 'test 2', count: 0 },
            { id: 7, name: 'test 2', count: 0 },
            { id: 8, name: 'test 2', count: 0 },
            { id: 9, name: 'test 2', count: 0 },
            { id: 10, name: 'test 2', count: 0 },
            { id: 11, name: 'test 2', count: 0 },
            { id: 12, name: 'test 2', count: 0 },
            { id: 13, name: 'test 2', count: 0 },
            { id: 14, name: 'test 2', count: 0 },
            { id: 15, name: 'test 2', count: 0 },
            { id: 16, name: 'test 2', count: 0 },
            { id: 17, name: 'test 2', count: 0 },
            { id: 18, name: 'test 2', count: 0 },
            { id: 19, name: 'test 2', count: 0 },
        ]);
    };

    useState(() => {
        load();
    });


    const [arr, setArr] = useState([1, 2, 3]);
    const item = subscriptions.find(subscription => subscription.id == subscriptionId);

    const pageDescription = item
        ? (item.description || '')
        : 'В этом списке рассылок можете выбрать те рассылки нашего сообщества, которые будут приходить в максимально неудобное вам время и которые вы не будете читать. Независимо от этого мы будем их вам присылать, так что подумайте дважды';

    return (
        <View activePanel="main">
            <Panel id="main">
                <PanelHeader>Рассылка сообщений</PanelHeader>

                {item && item.banner
                    && <img src="https://scx1.b-cdn.net/csz/news/800/2019/1-nature.jpg" alt="Баннер" style={{ maxWidth: '100%' }}></img>}

                <div style={{ padding: '15px' }}>

                    {(!item || !item.banner)
                        && <p className="page-title">
                            <img src="https://sun9-44.userapi.com/c845418/v845418151/d56e6/f677KFnZxQ8.jpg?ava=1" alt="Аватарка паблика" style={{ borderRadius: '50%', marginRight: '16px' }} />
                            pictures box</p>}

                    <p className="page-description">{pageDescription}</p>
                </div>
            </Panel>
        </View >
    );
}

export default App;

