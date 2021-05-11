import React from 'react';
import Modal from 'react-bootstrap/Modal';

type Props = {
    onRequestClose: any,
    title: string,
    imagePath: string,
    imageAlt?: string,
}

const ModalGallery: React.FC<Props> = ({ onRequestClose, title, imagePath, imageAlt, ...otherProps }) => {

    return (
        <>
            <Modal onHide={onRequestClose} centered={true} {...otherProps}>
                <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                    <Modal.Title className="text-center capitalize">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={imagePath} className="img-fluid" alt={imageAlt} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-warning" onClick={onRequestClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalGallery;