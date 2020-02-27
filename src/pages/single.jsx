import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import SubscriptionItem from '../components/SubscriptionItem';

const SinglePage = ({ item }) => {
    return <SubscriptionItem item={item} />;
}

export default SinglePage;