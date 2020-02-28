import React, { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import { connect } from 'react-redux';
import '@vkontakte/vkui/dist/vkui.css';
import './css/vkapp.css';

import { Panel, PanelHeader, ScreenSpinner, Alert } from '@vkontakte/vkui';
import SubscriptionsList from './components/SubscribersList';
import UnsubscribeAll from './components/UnsubscribeAll';
import PageHeader from './components/PageHeader';

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
    popout: state.popout,
    html: state.html,
});

const loadSubscriptions = () => {

    const vk_group_id = searchObject.vk_group_id || '';
    const user_vk_id = searchObject.vk_user_id;

    return dispatch => {
        dispatch({ type: 'LOAD_BEGIN' });

        if (!vk_group_id || !user_vk_id) {
            dispatch({ type: 'LOAD_FAILED', payload: { html: 'Откройте приложение из меню сообщества или по прямой ссылке' } });
            return;
        }

        fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({ method: 'vkapp.load_info', group_id: vk_group_id, user_vk_id }))
            .then(response => response.json())
            .then(json => {

                const subscribesCount = json.subscriptions.filter(item => item.isSubscribed === true).length;
                let { subscriptions, ...groupInfo } = json;

                if (hashObject.s) {
                    subscriptions = subscriptions.filter(sub => sub.id === hashObject.s);
                }

                dispatch({
                    type: 'INFO_LOADED',
                    payload: {
                        ...json,
                        groupInfo,
                        searchObject,
                        hashObject,
                        item: hashObject.s ? { ...subscriptions.find(item => item.id === hashObject.s) } : null,
                        subscribesCount,
                        subscriptions,
                        source: hashObject.s ? 2 : 1 // 2 - подписка по прямой ссылке, 1 - страница всех рассылок
                    }
                });
            })
    }
}

const App = ({ loading, dispatch, groupInfo, popout, html }) => {

    console.log('call app');

    useEffect(() => {
        const vkBridgeSubscribe = event => {
            
            console.log(event);
            
            
            const { detail } = event;
            const { type } = detail;

            if (type === 'VKWebAppViewRestore') {

                hashObject = getObjectFromURL(window.location.hash);
                searchObject = getObjectFromURL(window.location.search);

                dispatch(loadSubscriptions());
            }
        }

        dispatch(loadSubscriptions());

        bridge.subscribe(vkBridgeSubscribe);
        return () => bridge.unsubscribe(vkBridgeSubscribe);
    }, [dispatch])

    if (loading) {
        return (
            <View popout={popout} activePanel="main">
                <Panel id="main">
                    <PanelHeader>Рассылка сообщений</PanelHeader>
                    <ScreenSpinner size="large" />
                </Panel>
            </View >
        );
    }

    if (html) {

        const alert = (<Alert actions={[{
            title: 'закрыть',
            autoclose: true,
            style: 'cancel'
        }]} onClose={() => { }}>
            <h2>Что-то пошло не так.</h2>
            <p>{html}</p>
        </Alert>)

        return (
            <View popout={alert} activePanel="main">
                <Panel id="main">
                    <PanelHeader>Рассылка сообщений</PanelHeader>
                </Panel>
            </View >
        )
    }

    return (
        <View popout={popout} activePanel="main">
            <Panel id="main">
                <PanelHeader>Рассылка сообщений</PanelHeader>
                <PageHeader />
                <SubscriptionsList />
                <UnsubscribeAll />
            </Panel>
        </View >
    );
}

export default connect(mapStateToProps)(App);

