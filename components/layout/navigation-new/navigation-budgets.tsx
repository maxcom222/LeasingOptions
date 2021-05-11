import React from 'react';
import Link from 'next/link';
import style from './navigation.module.scss';
import { GetDealTypeUrl } from 'helpers/urlHelper';

const NavBudgets = ({id, dealSelector}) => {

    return (
        <div id={id} className={style['panel-content']}>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/150')} passHref><a>Below £150</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/200')} passHref><a>Up to £200</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/250')} passHref><a>Up to £250</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/300')} passHref><a>Up to £300</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/350')} passHref><a>Up to £350</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/400')} passHref><a>Up to £400</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/450')} passHref><a>Up to £450</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/500')} passHref><a>Up to £500</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/600')} passHref><a>Up to £600</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/700')} passHref><a>Up to £700</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/800')} passHref><a>Up to £800</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/900')} passHref><a>Up to £900</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget/1000')} passHref><a>Up to £1000</a></Link>
            <Link href={GetDealTypeUrl(dealSelector, '/budget-over/[budget]')} as={GetDealTypeUrl(dealSelector, '/budget-over/1000')} passHref><a>Above £1000</a></Link>
        </div>
    );
}

export default NavBudgets;
