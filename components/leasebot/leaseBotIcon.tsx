import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import style from './leasebot.module.scss';

 const DynamicLeasebotComponent = dynamic(
        () => import('../../components/leasebot'),
        { loading: () => <p>Loading...</p> }
      )


const LeaseBotIcon: React.FC = (props:any) => {

    const [visible, setVisible] = useState('closed');
    const handleClick = () => {

        setVisible(visible == 'open' ? 'closed' : 'open')
    }

    const headerRectStyle = {
        backgroundColor: '#000000', 
        width: '408px', 
        height: '40px',
        paddingTop: 12,
        paddingBottom: -12,
        color: '#FFFFFF',
        fontSize: '24px'
      }
  
    return (
        <div id="chatwrapper" className={`${style['leasebot']} ${visible == 'open' ? style['is-open'] : ""}`}>
            <div id="chat-title-image" className={style['chat-title-image']} onClick={handleClick}>
                <img className="lazyload" alt="Leasing Options Leasebot will help you find the best deals 24/7!" width="110" height="110" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/leasebot.png`} />
                </div> 
                <div id="chat-header-rect" className={style['chat-header-rect']} style={headerRectStyle} onClick={handleClick} >{props.headerText}
                      {(visible === 'open') ? <span className={`${style['chevron']} ${style['top']}`}></span> : <span className={`${style['chevron']} ${style['bottom']}`}></span>}
                </div>     

                {visible === 'open' && 
                    <DynamicLeasebotComponent
                    botName="LeaseBot"
                    IdentityPoolId="eu-west-1:4c26ecc6-cbd0-4b31-8b8b-dab6409b1800"
                    placeholder="Type your message here"
                    style={{ position: "absolute" }}
                    backgroundColor="#FFFFFF"
                    height={430}
                    region="eu-west-1"
                    headerText="You are now talking to Leasebot!"
                    visible={visible}/>
                }
        </div>
    )
}

export default LeaseBotIcon