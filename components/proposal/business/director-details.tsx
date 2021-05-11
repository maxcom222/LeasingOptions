import React from 'react';

import DateOfBirth from '../common/date-of-birth';
import FullName from '../common/full-name';
import GenderSelector from '../common/gender-selector';
import NationalitySelector from '../common/nationality-selector';
import MaritalStatusSelector from '../common/marital-status-selector';
import PropertyStatusSelector from '../common/property-status-selector';
import PropertyTenureSelector from '../common/property-tenure-selector';
import PropertyTypeSelector from '../common/property-type-selector';
import AddressHistory from './../address/address-history';

const DirectorDetails = ({ collectionName, index, formData }) => {

    return (
        <>
            <FullName formData={formData} collectionName={collectionName} index={index} />
            <DateOfBirth defaultValue={formData.dob} collectionName={collectionName} index={index} minYears={0} />
            <GenderSelector defaultValue={formData.genderId} collectionName={collectionName} index={index} />
            <NationalitySelector defaultValue={formData.nationalityId} collectionName={collectionName} index={index} />
            <MaritalStatusSelector defaultValue={formData.maritalStatusId} collectionName={collectionName} index={index} />
            <PropertyStatusSelector defaultValue={formData.propertyStatusId} collectionName={collectionName} index={index} />
            <PropertyTypeSelector defaultValue={formData.propertyTypeId} collectionName={collectionName} index={index} />
            <div className="mb-5"></div>

            <AddressHistory formData={formData} minHistoryMonths={60} parentContainer={(collectionName) ? `${collectionName}[${index}]` : null} />
        </>
    )
}

export default DirectorDetails