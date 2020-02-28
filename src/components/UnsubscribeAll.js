import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const buildQuery = (params) => {
    return Object.entries(params).map((item) => item.join('=')).join('&');
}

const UnsubscribeAll = (props) => {


    if (props.subscribesCount < 1) {
        return '';
    }

    console.log('from unsub all');

    const unsubscribeAll = async () => {
        try {

            const fd = new FormData();

            fd.append('user_vk_id', props.searchObject.vk_user_id);
            fd.append('group_id', props.searchObject.vk_group_id);
            fd.append('source', String(props.source));
            fd.append('tag_id', props.tag_id);

            fd.append('utm_source', props.hashObject['utm_source'] || '');
            fd.append('utm_medium', props.hashObject['utm_medium'] || '');
            fd.append('utm_campaign', props.hashObject['utm_campaign'] || '');
            fd.append('utm_content', props.hashObject['utm_content'] || '');
            fd.append('utm_term', props.hashObject['utm_term'] || '');
            fd.append('params', JSON.stringify(props.searchObject));

            const res = await fetch('https://smm-n.targethunter.dev/ajax?' + buildQuery({
                method: 'vkapp.unsubscribe_all',
            }), { method: 'POST', body: fd });


            const data = await res.json();

            if (data.status !== 'ok') {
                throw new Error(data.text || 'Что-то пошло не так. Не удалось отписаться');
            }

            props.dispatch({ type: 'UNSUBSCRIBE_ALL' });

        } catch (error) {
            alert(error.toString());
        }

    };

    return (
        <div style={{ textAlign: 'center' }}>
            <button
                data-source="1" style={{ backgroundColor: props.unsubscribe_color }}
                className="subscriptions-group-button unsubscribe-button unsubscribe-all"
                onClick={() => unsubscribeAll()}
                id="unsubscribe-all">Отписаться от всех рассылок</button>
        </div>
    );
};

export default connect(state => ({
    subscribesCount: state.subscribesCount,
    searchObject: state.searchObject,
    hashObject: state.hashObject    
}))(UnsubscribeAll);