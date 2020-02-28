import React, { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import './css/vkapp.css';

import { Panel, PanelHeader, ScreenSpinner } from '@vkontakte/vkui';
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

let hashObject = getObjectFromURL(window.location.hash);
let searchObject = getObjectFromURL(window.location.search);

const mapStateToProps = state => ({
    loading: state.loading,
    popout: state.popout
});

const loadSubscriptions = () => {

    const vk_group_id = searchObject.vk_group_id || '';
    const user_vk_id = searchObject.vk_user_id;

    return dispatch => {
        dispatch({ type: 'LOAD_BEGIN' });
        fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({ method: 'vkapp.load_info', group_id: vk_group_id, user_vk_id }))
            .then(response => response.json())
            .then(json => {
                const subscribesCount = json.subscriptions.filter(item => item.isSubscribed === true).length;
                let subscriptions = json.subscriptions;

                if (hashObject.s) {
                    subscriptions = subscriptions.filter(sub => sub.id === hashObject.s);
                }

                dispatch({ type: 'INFO_LOADED', payload: { ...json, searchObject, hashObject, subscribesCount, subscriptions } });
            })
    }
}

const App = ({ loading, dispatch, unsubscribe_color, popout }) => {

    console.log('call app');

    
    useEffect(() => {
        const vkBridgeSubscribe = event => {
            const { detail } = event;
                const { type, data } = detail;
    
                if (type === 'VKWebAppViewRestore') {
    
                    hashObject = getObjectFromURL(window.location.hash);
                    searchObject = getObjectFromURL(window.location.search);
    
                    dispatch(loadSubscriptions());
                }
        }

        dispatch(loadSubscriptions());

        bridge.subscribe(vkBridgeSubscribe);
        return () => bridge.unsubscribe(vkBridgeSubscribe);
    }, [dispatch, loadSubscriptions])

    if (loading) {
        return <ScreenSpinner size="large" />;
    }

    return (
        <View popout={popout} activePanel="main">
            <Panel id="main">
                <PanelHeader>Рассылка сообщений</PanelHeader>
                <SubscriptionsList />
                <UnsubscribeAll unsubscribe_color={unsubscribe_color} />
            </Panel>
        </View >
    );
}

export default connect(mapStateToProps)(App);

