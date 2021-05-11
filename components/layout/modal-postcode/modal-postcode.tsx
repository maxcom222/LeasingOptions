import React, { useRef, useState, useContext } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { FormatValidatePostcode, AddSpaceToPostcode } from 'helpers/helpers';
import ModalContext from '../../HOCs/modal/modalContext';
import Search from '../../search';
import { SearchPanels } from '../../../enums/SearchPanels';

type Props = {
    onRequestClose: any;
    title: string;
    userPostcode: string;
    updateUserPostcode: any;
}

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
        vehicleFilters: state.vehicleFilters,
        userPostcode: state.userPostcode,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserPostcode: (userPostcode) => {
            dispatch({ type: 'UPDATE_POSTCODE', userPostcode: userPostcode });
        },
    }
}

const ModalPostcode: React.FC<Props> = ({ onRequestClose, title, userPostcode, updateUserPostcode, ...otherProps }) => {
    const modalContext = useContext(ModalContext);
    const postcodeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const handlePostcodeSubmit = (evt) => {
        evt.preventDefault();
        let enteredPostcode = postcodeRef.current.value.toLowerCase();

        if (FormatValidatePostcode(enteredPostcode)) {
            setIsValidated(true);
            updateUserPostcode(AddSpaceToPostcode(enteredPostcode));
        } else {
            setIsValidated(false);
            updateUserPostcode(null);
        }

        setIsSubmitted(true);

        if (FormatValidatePostcode(enteredPostcode)) {
            modalContext.showModal(Search, { show: true, title: "Refine Search", activePanel: SearchPanels.SearchDetailed })
        }
    }

    return (
        <>
            <Modal onHide={onRequestClose} centered={true} {...otherProps}>
                <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                    <Modal.Title className="text-center mb-0">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100 py-3 px-3 px-md-5">
                        <p className="mb-2">Please enter a full postcode.</p>
                        <div className="row">
                            <div className="col-24 form-group">
                                <input type="text" ref={postcodeRef} className={`form-control ${isSubmitted && !isValidated ? 'is-invalid' : ''}`} placeholder="AB12 3CD" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24 d-flex align-items-center justify-content-end">
                                <button className="btn btn-success btn-lg" onClick={(evt) => handlePostcodeSubmit(evt)}>Next</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPostcode);