import React from 'react';
import Modal from 'react-bootstrap/Modal';

type Props = {
	onRequestClose: any;
}

const VehicleAdditionalTaxModal: React.FC<Props> = ({ onRequestClose, ...otherProps }) => {
	return (
		<Modal onHide={onRequestClose} centered={true} scrollable={true} {...otherProps}>
			<Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
				<Modal.Title className="mb-0">Additional Tax</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>As the options that you have chosen increase the vehicle P11D value to over £40,000, the vehicle tax will increase by £320 per annum, from the second year of the lease onwards. Please contact your Account Manager if you have any questions regarding the vehicle-tax rate.</p>
			</Modal.Body>
			<Modal.Footer>
				<button type="button" className="btn btn-primary btn-lg" onClick={onRequestClose}>Close</button>
			</Modal.Footer>
		</Modal>
	)
}

export default VehicleAdditionalTaxModal;