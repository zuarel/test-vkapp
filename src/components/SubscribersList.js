import React, { useState, useEffect } from 'react';
import SubscriptionItem from './SubscriptionItem';

const SubscriptionsList = ({ subscriptions = [], source }) => {
    return (
        <div className="subscription-group-lists">
            {subscriptions.map(subscription => (
                <SubscriptionItem key={subscription.id} source={source} item={subscription} />
            ))}
        </div>
    );
};

export default SubscriptionsList;