import React from 'react';
import style from './live-chat.module.scss';
import { connect } from 'react-redux';
import { logLabelEvent } from 'helpers/analytics';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

type Props = {
    isInternal: boolean;
}

const LiveChat: React.FC<Props> = ({ isInternal }) => {
    const openLiveChat = () => {
        logLabelEvent('Contact', 'Click', 'live_chat_track');
        liveChatPopup();
    }

    const liveChatPopup = () => {
        if (process.browser) {
            // @ts-ignore
            if (chatService) {
                // @ts-ignore
                chatService.openChatWidget();
            }
        }

        return false;
    }

    return (
        <>
            {!isInternal &&
                <a onClick={openLiveChat} id="liveChatLink" className={style['liveChatLink']}>
                    <div id="livechat">
                        <div id="livechat_container"><FontAwesomeIcon icon={faComment} className="mr-1" />Live Chat</div>
                    </div>
                </a>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(LiveChat);