import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import './css/vkapp.css';

import { Panel, PanelHeader, Alert, Div, Button, ScreenSpinner } from '@vkontakte/vkui';
import SubscriptionsList from './components/SubscribersList';
import UnsubscribeAll from './components/UnsubscribeAll';



const getObjectFromURL = (url) => {
    const search = url.slice(1);
    const params = search.split('&');

    return params.reduce((acc, item) => {

        const [key, value] = item.split('=');

        acc[key] = value;

        return acc;
    }, {});
};

const buildQuery = (params) => {
    return Object.entries(params).map((item) => item.join('=')).join('&');
}

const hashObject = getObjectFromURL(window.location.hash);
const searchObject = getObjectFromURL(window.location.search);

const vk_group_id = searchObject.vk_group_id || '';
const user_vk_id = searchObject.vk_user_id;

function useFetch(url) {

    const [params, setParams] = useState({ data: [], loading: true });

    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();

        setParams({ data: json, loading: false });
    }

    useEffect(() => {
        fetchUrl();
    }, []);

    return params;
}


const App = () => {

    console.log('app called');

    const [popout, setPopout] = useState(null);
    const [subscriptions, setSubscriptions] = useState();
    const { data, loading } = useFetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({ method: 'vkapp.load_info', group_id: vk_group_id, user_vk_id }));

    if (loading) {
        return "loading";
    }

    const groupInfo = data;

    const item = hashObject.s
        ? subscriptions.find(subscription => subscription.id === hashObject.s)
        : null;

    const pageDescription = item
        ? (item.description || '')
        : groupInfo.description || '';

    const handleAction = (action, item) => {
        
    }

    return (
        <View popout={popout} activePanel="main">
            <Panel id="main">
                <PanelHeader>Рассылка сообщений</PanelHeader>
                <Div style={{ textAlign: 'center' }}>
                    {item && item.banner
                        && <img src={item.banner} alt="Баннер" style={{ maxWidth: '100%' }} />}

                    {groupInfo.banner
                        && <img src={groupInfo.banner} alt="Баннер" style={{ maxWidth: '100%' }} />}
                </Div>
                <Div style={{ padding: '15px' }}>
                    {((!item || !item.banner) && !groupInfo.banner)
                        && <p className="page-title">
                            <img src={groupInfo.avatar} alt="Аватарка паблика" style={{ borderRadius: '50%', marginRight: '16px' }} />
                            {groupInfo.name}</p>
                    }

                    <p className="page-description">{pageDescription}</p>
                    <div className="subscription-group-lists">
                       <SubscriptionsList handleAction={handleAction} subscriptions={subscriptions} />
                    </div>
                    <UnsubscribeAll groupInfo={groupInfo} />
                </Div>
            </Panel>
        </View >
    );
}

export default App;

