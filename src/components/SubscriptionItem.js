import React, { useState } from 'react';
import { connect } from 'react-redux';


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

    const toggleSubscribe = async (item) => {
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
    isSubscriptionPage: state.isSubscriptionPage,
    unsubscribe_color: state.unsubscribeColor,
    subscribe_color: state.subscribeColor,
    searchObject: state.searchObject,
    hashObject: state.hashObject,
}))(SubscriptionItem);