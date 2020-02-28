import React from 'react';
import { connect } from 'react-redux';

function PageHeader(props) {

    const { item, groupInfo } = props;

    const bannerUrl = item && item.banner
        ? item.banner
        : groupInfo.banner;

    const banner = bannerUrl
        ? <img src={bannerUrl} alt="Баннер" style={{ maxWidth: '100%' }} />
        : '';

    let bannerIsHide = '';

    if (!item || !item.banner || !groupInfo.banner) {
        bannerIsHide = (
            <>
                <p className="page-title">
                    <img src={groupInfo.avatar} alt="Аватарка паблика" style={{ borderRadius: '50%', marginRight: '16px' }} />
                    {groupInfo.name}</p>
            </>
        );
    }

    const description = item
        ? item.description
        : groupInfo.description;


    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                {banner}
            </div>
            <div style={{ padding: '15px' }}>
                {bannerIsHide}
                <p className="page-description">{description}</p>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        item: state.item,
        groupInfo: state.groupInfo
    }),
)(PageHeader);