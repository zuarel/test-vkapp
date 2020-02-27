import React, { useState, useEffect } from 'react';
import SubscriptionItem from './SubscriptionItem';

const SubscriptionsList = ({ subscriptions = [], source, handleAction }) => {


    console.log('from sub list');

    return (
        <div className="subscription-group-lists">
            {subscriptions.map(subscription => (
                <SubscriptionItem key={subscription.id} source={source} item={subscription} handleAction={handleAction} />
            ))}
        </div>
    );
};

export default SubscriptionsList;