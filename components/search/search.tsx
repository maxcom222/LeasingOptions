import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import SearchButtons from './search-buttons';
import SearchMakes from './search-makes';
import SearchModels from './search-models';
import SearchBodies from './search-bodies';
import SearchBudgets from './search-budgets';
import SearchDetailed from './search-detailed';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import style from './search.module.scss';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { GetSearchFiltersUrl } from '../../helpers/urlHelper';
import { LeasingDealTypes } from '../../enums/LeasingDealTypes';
import { SearchPanels } from '../../enums/SearchPanels';
import { Make } from 'types/Make';
import { SiteSettings } from '../../environment/siteSettings';

type Props = {
    onRequestClose?: any,
    title?: string,
    activePanel?: number,
    dealToggle: LeasingDealTypes;
    carManufacturerList: Array<Make>,
    vanManufacturerList: Array<Make>,
    vehicleFilters: any;
    userPostcode: string;
}

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
        vehicleFilters: state.vehicleFilters,
        carManufacturerList: state.carManufacturerList,
        vanManufacturerList: state.vanManufacturerList,
        userPostcode: state.userPostcode,
    };
}

const Search: React.FC<Props> = ({ onRequestClose, title, activePanel = 1, dealToggle, carManufacturerList, vanManufacturerList, vehicleFilters, userPostcode, ...otherProps }) => {
    const dispatch = useDispatch();
    const [modalCtas, setmodalCtas] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>(title);
    const [currentPanel, setCurrentPanel] = useState<number>(activePanel);
    const [currentMake, setCurrentMake] = useState<string>('');

    const [vehicleCount, setVehicleCount] = useState<number>(0);
    const handleTitleChange = (title) => {
        setModalTitle(title);
    }
    const handlePanelChange = (panel, title) => {
        setCurrentPanel(panel);
        handleTitleChange(title);

        if (panel === SearchPanels.SearchDetailed) {
            setmodalCtas(true);
        } else {
            setmodalCtas(false);
        }
    }

    const handleMakeUpdate = (make) => setCurrentMake(make);
    const handleBackButton = () => {
        if (currentPanel === SearchPanels.SearchModels && currentMake) {
            setCurrentMake('');
        } else {
            setCurrentPanel(SearchPanels.SearchButtons);
            handlePanelChange(SearchPanels.SearchButtons, title);
        }
    }
    const handleVehicleCountUpdate = (count) => setVehicleCount(count);
    const handleClearButton = () => {
        dispatch({ type: 'RESET_POSTCODE' });
        dispatch({
            type: 'UPDATE_ALL_FILTERS',
            payload: {
                initialRentals: SiteSettings.DefaultInitialRentals,
                mileage: SiteSettings.GetDealTypeDefaultMileage(dealToggle)
            }
        });
    }

    useEffect(() => {
        if (activePanel === SearchPanels.SearchDetailed) {
            setmodalCtas(true);
        } else {
            setmodalCtas(false);
        }
    }, [activePanel])

    return (
        <>
            <Modal onHide={onRequestClose} centered={true} className={`search-modal ${currentPanel === SearchPanels.SearchDetailed ? "search-modal--detailed" : ""}`} {...otherProps}>
                <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                    <Modal.Title className="text-center mb-0">{modalTitle} {!userPostcode && currentPanel > 1 ? <FontAwesomeIcon width="12" height="24" icon={faChevronLeft} onClick={() => handleBackButton()} /> : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body--search p-0">
                    <div className={style['vehicle-search']}>
                        {currentPanel === SearchPanels.SearchButtons && <SearchButtons active={true} handlePanelChange={handlePanelChange} />}
                        {currentPanel === SearchPanels.SearchMakes && <SearchMakes active={true} makes={dealToggle === LeasingDealTypes.Van ? vanManufacturerList : carManufacturerList} />}
                        {currentPanel === SearchPanels.SearchModels && <SearchModels active={true} makes={dealToggle === LeasingDealTypes.Van ? vanManufacturerList : carManufacturerList} handleMakeUpdate={handleMakeUpdate} currentMake={currentMake} dealToggle={dealToggle} />}
                        {currentPanel === SearchPanels.SearchBodies && <SearchBodies active={true} />}
                        {currentPanel === SearchPanels.SearchBudgets && <SearchBudgets active={true} />}
                        {currentPanel === SearchPanels.SearchDetailed && <SearchDetailed active={true} handleVehicleCountUpdate={handleVehicleCountUpdate} />}
                    </div>
                </Modal.Body>

                {modalCtas &&
                    <Modal.Footer className="modal-footer__ctas">
                        <div className={style['search-ctas']}>
                            <button className="btn btn-lg" onClick={() => handleClearButton()}>Clear search</button>
                            <button className="btn btn-primary btn-lg"><Link passHref href={GetSearchFiltersUrl(dealToggle, userPostcode, vehicleFilters)}><a className="text-decoration-none">{vehicleCount === 0 ? "No results" : "See " + vehicleCount + " deals"}</a></Link></button>
                        </div>
                    </Modal.Footer>
                }
            </Modal>
        </>
    )
}

export default connect(mapStateToProps)(Search);