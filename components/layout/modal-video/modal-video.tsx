import React from 'react';
import Modal from 'react-bootstrap/Modal';

type Props = {
    onRequestClose: any,
    title: string,
    videoUrl: string,
}

const ModalVideo:React.FC<Props> = ({ onRequestClose, title, videoUrl, ...otherProps }) => {
    
    return (
        <>
            <Modal onHide={onRequestClose} centered={true} {...otherProps}>
                <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                    <Modal.Title className="mb-0">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe width="1024" height="315" data-src={videoUrl} className="lazyload" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-warning" onClick={onRequestClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalVideo;