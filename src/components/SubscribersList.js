import React from 'react';
import SubscriptionItem from './SubscriptionItem';
import { connect } from 'react-redux'

const SubscriptionsList = ({ subscriptions, source }) => {

    console.log('from sub list');

    return (
        <div className="subscription-group-lists">
            {subscriptions.map(subscription => (
                <SubscriptionItem key={subscription.id} source={source} item={subscription} />
            ))}
        </div>
    );
};

export default connect(state => ({ subscriptions: state.subscriptions, }))(SubscriptionsList);