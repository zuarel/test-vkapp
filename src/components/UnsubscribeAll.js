import React, { useState, useEffect } from 'react';

const UnsubscribeAll = ({ groupInfo }) => {


    console.log('from unsub all');


    return (
        <div style={{ textAlign: 'center' }}>
            <button
                data-source="1" style={{ backgroundColor: groupInfo.unsubscribeColor }}
                className="subscriptions-group-button unsubscribe-button unsubscribe-all"
                id="unsubscribe-all">Отписаться от всех рассылок</button>
        </div>
    );
};

export default UnsubscribeAll;