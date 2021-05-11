import React from 'react';
import Link from 'next/link';
import style from './search.module.scss';
import { connect } from 'react-redux';
import{ GetDealTypeUrl } from '../../helpers/urlHelper';
import { LeasingDealTypes } from '../../enums/LeasingDealTypes';

type Props = {
    active: boolean;
    dealToggle: LeasingDealTypes;
}

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
    };
}

const SearchBudgets:React.FC<Props> = ({active, dealToggle}) => {
    return (
        <div className={`${style['modal-panel']} ${active ? style['is-active'] : ''} flex-wrap align-items-center justify-content-start`}>
            <ul>
                <li><Link href={GetDealTypeUrl(dealToggle, '/search')}>Show me everything</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-150')}>Below £150</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-200')}>Up to £200</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-250')}>Up to £250</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-300')}>Up to £300</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-350')}>Up to £350</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-400')}>Up to £400</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-450')}>Up to £450</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-500')}>Up to £500</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-600')}>Up to £600</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-700')}>Up to £700</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-800')}>Up to £800</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-900')}>Up to £900</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-1000')}>Up to £1000</Link></li>
                <li><Link href={GetDealTypeUrl(dealToggle, '/budget-over-1000')}>Above £1000</Link></li>
            </ul>
        </div>
    )
}

export default connect(mapStateToProps)(SearchBudgets);