import React from 'react';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import style from './modal-contact.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { logLabelEvent } from '../../../helpers/analytics';
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';

type Props = {
    isInternal: boolean,
    onRequestClose: any,
    title: string,
}

const ModalContact:React.FC<Props> = ({ isInternal, onRequestClose, title, ...otherProps }) => {
    const handleCallbackClick = () => logLabelEvent('Contact', 'Click', 'request_callback_track');
    const handleContactClick = () => logLabelEvent('Contact', 'Click', 'leave_message_track');

    return (
        <>
            <Modal onHide={onRequestClose} centered={true} {...otherProps}>
                <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                    <Modal.Title className=" mb-0">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={style['contact-modal']}>
                        <Link passHref href="/request-callback">
                            <a className={style['contact-link']} onClick={(evt) => {handleCallbackClick()}}>
                                <div id="request-a-callback" className={style['contact-link__wrap']}>
                                    <p>No time to wait? We can call you</p>
                                    <div className={style['contact-link__background']}>
                                        <FontAwesomeIcon width="50" height="50" icon={faHeadset} title="Request a callback" />
                                        <button className="btn btn-primary btn-lg">Request a callback</button>
                                    </div>
                                </div>
                            </a>
                        </Link>
                        <Link passHref href="/contact">
                            <a className={style['contact-link']} onClick={(evt) => {handleContactClick()}}>
                                <div id="leave-us-a-message" className={style['contact-link__wrap']}>
                                    <p>Leave us a message</p>
                                    <div className={style['contact-link__background']}>
                                        <FontAwesomeIcon width="50" height="50" icon={faEnvelope} title="Contact us" />
                                        <button className="btn btn-primary btn-lg">Contact us</button>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <p className="d-block my-3 text-center">Telephone: <a href={`tel:${GetPhoneNumber(isInternal)}`}>{GetPhoneNumber(isInternal)}</a></p>
                </Modal.Body>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(ModalContact);