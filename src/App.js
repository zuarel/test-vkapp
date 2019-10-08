import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import './css/vkapp.css';

import { Panel, PanelHeader, Alert, Div, Button, ScreenSpinner } from '@vkontakte/vkui';
import SubscriptionItem from './components/SubscriptionItem';

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

const App = () => {

    const hashObject = getObjectFromURL(window.location.hash);
    const searchObject = getObjectFromURL(window.location.search);

    const vk_group_id = searchObject.vk_group_id || '';
    const user_vk_id = searchObject.vk_user_id;
    const subscriptionId = hashObject.s || '';

    const [subscriptions, setSubscriptions] = useState([]);
    const [isGroupInfoLoading, setGroupInfoLoading] = useState(false);
    const [popout, setPopout] = useState(null);
    const [groupInfo, setGroupInfo] = useState({
        description: '',
        avatar: '',
        name: '',
        banner: '',
        unsubscribeColor: '',
        subscribeColor: ''
    });

    const loadGroupInfo = async () => {
        if (isGroupInfoLoading) {
            return;
        }

        setGroupInfoLoading(true);

        try {
            const res = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({ method: 'vkapp.load_info', group_id: vk_group_id, user_vk_id }));
            const { subscriptions, ...data } = await res.json();


            if (data.status !== 'ok') {
                throw new Error('Не удалось загрузить данные.');
            }

            setGroupInfo({
                ...groupInfo,
                description: data.description,
                avatar: data.avatar,
                name: data.name,
                banner: data.banner,
                subscribeColor: data.subscribe_color,
                unsubscribeColor: data.unsubscribe_color
            });

            setSubscriptions(subscriptions);
        } catch (error) {
            setGroupInfoLoading(true);

            setPopout(<Alert
                actions={[{
                    title: 'закрыть',
                    autoclose: true,
                    style: 'cancel'
                }]}
                onClose={() => setPopout(null)}
            >
                <h2>Что-то пошло не так.</h2>
                <p>{error.message}</p>
            </Alert>);
        }
    };

    const source = subscriptionId ? 2 : 1;

    const item = subscriptions.find(subscription => subscription.id === subscriptionId);

    const pageDescription = item
        ? (item.description || '')
        : groupInfo.description || '';

    const subscribeItem = async (item) => {
        const res = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({
            user_vk_id,
            method: 'vkapp.subscribe_user',
            subscribe_id: item.id,
            group_id: vk_group_id,
        }));

        const { status, ...data } = await res.json();

        if (status !== 'ok') {
            throw new Error(data.text || 'Что-то пошло не так. Не удалось подписаться');
        }

        const s = subscriptions.map(item => item);
        const i = s.find(subscription => subscription.id === item.id);

        i.isSubscribed = true;
        i.count = item.count + 1

        setSubscriptions(s);
    };

    let lastPressedItem = null;

    connect.subscribe(async ({ detail: { type } }) => {
        if (type === 'VKWebAppAllowMessagesFromGroupResult') {
            await subscribeItem(lastPressedItem);
        }
    });

    const onSubscribe = async (item) => {

        showSpinner();

        lastPressedItem = item;

        try {
            const res1 = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({
                user_vk_id,
                method: 'vkapp.check_allowed',
                group_id: vk_group_id,
            }));

            const { is_messages_from_group_allowed } = await res1.json();

            if (!is_messages_from_group_allowed) {
                connect.send('VKWebAppAllowMessagesFromGroup', { group_id: +vk_group_id });
                setPopout(null);
                return;
            }

            await subscribeItem(item);
            openSubscribeModal(true);
        } catch (error) {
            alert(error.toString());
        }

        lastPressedItem = null;
    };

    const unsubscribeItem = async (item) => {
        try {
            const res = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({
                user_vk_id,
                method: 'vkapp.unsubscribe_user',
                subscribe_id: item.id,
                group_id: vk_group_id,
            }));

            const { status, ...data } = await res.json();

            if (status !== 'ok') {
                throw new Error(data.text || 'Что-то пошло не так. Не удалось отписаться');
            }

            item.isSubscribed = false;
            item.count = item.count - 1

            return item;

        } catch (error) {
            alert(error.toString());
        }
    }

    const onUnsubscribe = async (item) => {

        showSpinner();

        var s = subscriptions.map(item => item);
        var i = s.find(subscription => subscription.id === item.id);

        await unsubscribeItem(i);

        setSubscriptions(s);
        openUnsubscribeModal();
    };

    const unsubscribeAll = async () => {

        showSpinner();
        try {
            const res = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({
                user_vk_id,
                method: 'vkapp.unsubscribe_all',
                group_id: vk_group_id,
            }));


            const data = await res.json();

            if (data.status !== 'ok') {
                throw new Error(data.text || 'Что-то пошло не так. Не удалось отписаться');
            }

            showSpinner();

            const s = subscriptions.map(item => item);

            for (const subscription of s) {
                if (!subscription.isSubscribed) {
                    continue;
                }

                await unsubscribeItem(subscription);
            }

            setSubscriptions(s);
            openUnsubscribeModal();
        } catch (error) {
            alert(error.toString());
        }
    };

    const openSubscribeModal = (showDialogLink) => {

        setPopout(<Alert
            actions={[{
                title: 'закрыть',
                autoclose: true,
                style: 'cancel'
            }]}
            onClose={() => setPopout(null)}
        >
            <h2>Вы успешно подписались на рссылку.</h2>
            <p>Рассылка скоро придёт Вам в личные сообщения.</p>

            {showDialogLink && <Div>
                <Button onClick={() => window.top.location.href = 'https://vk.com/im?sel=-' + vk_group_id} size="l" stretched>Перейти к сообщениям</Button>
            </Div>}
        </Alert>);
    }

    const openUnsubscribeModal = () => {
        setPopout(<Alert
            actions={[{
                title: 'закрыть',
                autoclose: true,
                style: 'cancel'
            }]}
            onClose={() => setPopout(null)}
        >
            <h2>Вы отписаны.</h2>
            <p>Рассылка Вам больше не будет приходить.</p>
        </Alert>);
    }

    const showSpinner = () => {
        setPopout(<ScreenSpinner size="large" />);
    }

    useEffect(() => {
        loadGroupInfo();
    });

    return (
        <View popout={popout} activePanel="main">
            <Panel id="main">
                <PanelHeader>Рассылка сообщений</PanelHeader>
                <div style={{ textAlign: 'center' }}>
                    {item && item.banner
                        && <img src={item.banner} alt="Баннер" style={{ maxWidth: '100%' }}></img>}

                    {groupInfo.banner
                        && <img src={groupInfo.banner} alt="Баннер" style={{ maxWidth: '100%' }}></img>}
                </div>

                <div style={{ padding: '15px' }}>

                    {((!item || !item.banner) && !groupInfo.banner)
                        && <p className="page-title">
                            <img src={groupInfo.avatar} alt="Аватарка паблика" style={{ borderRadius: '50%', marginRight: '16px' }} />
                            {groupInfo.name}</p>
                    }

                    <p className="page-description">{pageDescription}</p>


                    {subscriptions.filter(subscription => (!subscriptionId || subscription.id === subscriptionId)).map(subscription =>
                        <SubscriptionItem
                            item={subscription}
                            source={source}
                            subscribe={onSubscribe}
                            unsubscribe={onUnsubscribe}
                            subscribeColor={groupInfo.subscribeColor}
                            unsubscribeColor={groupInfo.unsubscribeColor}
                            isSubscriptionPage={!!item}
                            key={subscription.id} />
                    )}

                    {subscriptions.filter(item => item.isSubscribed).length > 0 && <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={unsubscribeAll}
                            data-source="1" style={{ backgroundColor: groupInfo.unsubscribeColor }}
                            className="subscriptions-group-button unsubscribe-button unsubscribe-all"
                            id="unsubscribe-all">Отписаться от всех рассылок</button>
                    </div>}
                </div>
            </Panel>
        </View >
    );
}

export default App;

