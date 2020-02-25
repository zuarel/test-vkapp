import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import './css/vkapp.css';

import { Panel, PanelHeader, Alert, Div, Button, ScreenSpinner } from '@vkontakte/vkui';
import SubscriptionItem from './components/SubscriptionItem';
import MainPage from './pages/main';
import SinglePage from './pages/single';


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
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

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
    const { data, loading } = useFetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({ method: 'vkapp.load_info', group_id: vk_group_id, user_vk_id }));

    if (loading) {
        return "";
    }

    const { subscriptions, ...groupInfo } = data;

    const page = !hashObject.s
        ? <MainPage subscriptions={subscriptions} />
        : <SinglePage id={hashObject.s} subscriptions={subscriptions} />

    return (
        <View popout={popout} activePanel="main">
            <Panel id="main">
                <PanelHeader>Рассылка сообщений</PanelHeader>
                {page}
            </Panel>
        </View >
    );
}

export default App;

