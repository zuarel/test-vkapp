import React, { useState, useEffect } from 'react';
import SubscriptionItem from './SubscriptionItem';
import { connect } from 'react-redux'

const SubscriptionsList = ({ subscriptions, source, unsubscribe_color }) => {
    // const SubscriptionsList = (props) => {    

    console.log('from sub list');

    return (
        <div className="subscription-group-lists">
            {subscriptions.map(subscription => (
                <SubscriptionItem key={subscription.id} source={source} item={subscription} />
            ))}
        </div>
    );
};

// export default connect(state => ({ ...state }))(SubscriptionsList);
export default connect(state => ({ subscriptions: state.subscriptions, unsubscribe_color: state.unsubscribe_color }))(SubscriptionsList);