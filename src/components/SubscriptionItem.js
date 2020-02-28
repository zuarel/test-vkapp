import React from 'react';
import { connect } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';


const buildQuery = (params) => {
    return Object.entries(params).map((item) => item.join('=')).join('&');
}

const SubscriptionItem = (props) => {

    console.log('from sub item');

    const {
        item,
        dispatch,
        source,
        isSubscriptionPage,
        unsubscribe_color: unsubscribeColor,
        subscribe_color: subscribeColor,
    } = props;

    async function checkMessagesFromGroupAllowed(group_id, user_vk_id, isAllowedCallback) {
        var fd = new FormData();

        fd.append('user_vk_id', props.searchObject.vk_user_id);
        fd.append('group_id', props.searchObject.vk_group_id);

        const res = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({ method: 'vkapp.check_allowed', }),
            { method: 'POST', body: fd });

        const { status, ...data } = await res.json();

        return data;

    }

    const toggleSubscribe = async (item) => {

        const { is_messages_from_group_allowed } = await checkMessagesFromGroupAllowed();

        if (!is_messages_from_group_allowed) {
            const res2 = await bridge.send('VKWebAppAllowMessagesFromGroup', { group_id: +props.searchObject.vk_group_id });

            console.log(res2);
            
        }

        return;

        var fd = new FormData();

        fd.append('user_vk_id', props.searchObject.vk_user_id);
        fd.append('group_id', props.searchObject.vk_group_id);
        fd.append('subscribe_id', item.id);
        fd.append('source', String(source));
        fd.append('tag_id', props.tag_id);

        fd.append('utm_source', props.hashObject['utm_source'] || '');
        fd.append('utm_medium', props.hashObject['utm_medium'] || '');
        fd.append('utm_campaign', props.hashObject['utm_campaign'] || '');
        fd.append('utm_content', props.hashObject['utm_content'] || '');
        fd.append('utm_term', props.hashObject['utm_term'] || '');
        fd.append('params', JSON.stringify(props.searchObject));

        const res = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({ method: item.isSubscribed ? 'vkapp.unsubscribe_user' : 'vkapp.subscribe_user', }),
            { method: 'POST', body: fd });

        const { status, ...data } = await res.json();

        if (status !== 'ok') {
            throw new Error(data.text || 'Что-то пошло не так. Не удалось подписаться');
        }

        const i = { ...item };

        i.isSubscribed = !item.isSubscribed;
        i.count = item.isSubscribed ? item.count + -1 : (item.count + 1);

        dispatch({ type: 'TOGGLE_SUBSCRIBE', payload: { type: !item.isSubscribed ? 'subscribe' : 'unsubscribe', id: item.id } });
    };

    return (
        <div className={`subscriptions-group-item ${isSubscriptionPage ? 'subscription-page' : ''}`}>
            <div className="subscriptions-group-item__info">
                <p className="subscriptions-group-item__title">{item.name}</p>
                {item.hide_count !== 1 && <p className="subscriptions-group-item__count">Подписчиков: {item.count}</p>}
            </div>
            <div className="subscriptions-group-item__action-block">

                {item.isSubscribed
                    ? <button data-source={source}
                        style={{ backgroundColor: unsubscribeColor ? unsubscribeColor : '' }}
                        onClick={() => toggleSubscribe(item)}
                        className="subscriptions-group-button unsubscribe-button">Отписаться</button>
                    : <button data-source={source}
                        style={{ backgroundColor: subscribeColor ? subscribeColor : '' }}
                        onClick={() => toggleSubscribe(item)}
                        className="subscriptions-group-button subscribe-button">Подписаться</button>
                }

            </div>
        </div>
    );
};

export default connect(state => ({
    source: state.source,
    unsubscribe_color: state.unsubscribe_color,
    subscribe_color: state.subscribe_color,
    searchObject: state.searchObject,
    hashObject: state.hashObject,
    isSubscriptionPage: !!state.hashObject.s
}))(SubscriptionItem);