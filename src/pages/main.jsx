import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import SubscriptionsList from '../components/SubscribersList';

const MainPage = ({subscriptions}) => {
    return <SubscriptionsList subscriptions={subscriptions} />;
}

export default MainPage;