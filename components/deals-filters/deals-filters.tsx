import React from 'react';
import DropDown from '../layout/drop-down';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
    categories: any[];
    make: any;
    totalItems: number;
    totalModels: number;

    settings: {
        availableCategories: any[];
        availableMakes: any[];
        onMakeChange: any;
        onCategoryChange: any;
        onSortOrderChange: any;
    };
}

const DealsFilters: React.FC<Props> = ({ categories, make, totalItems, totalModels, settings }) => {
    const hasSelectedCategoris = categories && categories.length > 0;

    return (
        <>
            <div className="container-fluid pt-3 pt-md-5 bg-white">
                <div className="row">
                    <div className="col-24 col-md-12">
                        <h2 className="mb-2"><mark className="mark-text">{totalItems}</mark> Deals from <mark className="mark-text">{totalModels}</mark> Matching Models</h2>
                    </div>
                    <div className="col-24 col-md-6 mb-3 mb-md-0">
                        <DropDown active={make} indicator={true} wrapperClass="w-100" buttonClass="btn-block bg-light-grey btn-lg text-left" buttonText="Make">
                            <button type="button" onClick={() => settings.onMakeChange(null)}>All</button>
                            {settings.availableMakes?.map(item =>
                                <button key={item.id} type="button" onClick={() => settings.onMakeChange(item.id)}>{item.name}</button>
                            )}
                        </DropDown>
                    </div>
                    <div className="col-24 col-md-6 mb-3 mb-md-0">
                        <DropDown active={'Price Low > High'} indicator={true} wrapperClass="w-100" buttonClass="btn-block bg-light-grey btn-lg text-left" buttonText="Sort by">
                            <button onClick={() => settings.onSortOrderChange("price;asc")} type="button">Price Low {'>'} High</button>
                            <button onClick={() => settings.onSortOrderChange("price;desc")} type="button">Price High {'>'} Low</button>
                        </DropDown>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container-fluid pt-2 bg-white">
                <div className="row">
                    <div className="col-24 mb-3 mb-md-5">
                        <button type="button" className={`btn ${!hasSelectedCategoris ? 'btn-primary' : 'btn-light'} btn-labeled btn-fluid btn-square btn-lg mr-3 mb-3`} onClick={() => settings.onCategoryChange(null)}>
                            <span className="btn-label"><FontAwesomeIcon width="17" height="17" icon={!hasSelectedCategoris ? faTimes : faPlus} /></span>
                            <span className="btn-text">Any</span>
                        </button>
                        {settings.availableCategories?.map(item => (
                            <button key={item.id} type="button" className={`btn ${categories.includes(item.id) ? 'btn-primary' : 'btn-light'} btn-labeled btn-fluid btn-square btn-lg mr-3 mb-3`} onClick={() => settings.onCategoryChange(item.id)}>
                                <span className="btn-label"><FontAwesomeIcon width="17" height="17" icon={categories.includes(item.id) ? faTimes : faPlus} /></span>
                                <span className="btn-text">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DealsFilters;