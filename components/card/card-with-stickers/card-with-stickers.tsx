import React, { useState, useEffect } from 'react';
import style from './trust-micro.module.scss';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import { connect } from 'react-redux';
import { GetStickerList } from 'business-logic/vehicleService';

function mapStateToProps(state) {
    return {
        stickerList: state.stickerList,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updatestickerList: (data) => {
            dispatch({ type: 'UPDATE_STICKER_LIST', data: data });
        }
    }
}


const CardWithStickers = ({ stickerList, updatestickerList, children }) => {
  
    useEffect(() => {
        if (stickerList?.length < 1) {
            GetStickerList(null).then((data) => {               
                updatestickerList(data.data);
            });
        }
    },[]);

    return (
        <>{children}</>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardWithStickers);