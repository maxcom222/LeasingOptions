import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { getFieldName, getFieldId } from 'helpers/fieldArrayHelper'

import DiretorDetails from '../business/director-details';

const BusinessDirectorList = ({ formData }) => {

    const collectionName = "directors";
    const { register } = useFormContext();

    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        if (!formData[collectionName]) {
            addDirector({});
        }
        else {
            setDirectors(formData[collectionName]);
        }
    }, []);

    const addDirector = (props) => {
        setDirectors([...directors, props]);
    };

    const removeDirector = () => {
        setDirectors([...directors.slice(0, 1)]);
    };

    const onRadioboxChange = (evt) => {
        if (evt.target.value === "yes" && directors.length === 1) {
            addDirector({});
        }
        else if (evt.target.value === "no" && directors.length > 1) {
            removeDirector();
        }
    }

    return (
        <>
            {
                directors.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <h3>{index === 0 ? "Director Details" : "Additional Director"}</h3>
                            <DiretorDetails collectionName={collectionName} index={index} formData={item} />

                            {index === 0 &&
                                <>
                                    <div className="form-row">
                                        <div className="col-24 col-md-12">
                                            <label>Add Director</label>
                                        </div>
                                    </div>
                                    <div className="form-row mb-5">
                                        <div className="col-24 col-md-12">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                    name={getFieldName("addDirector", collectionName, index)}
                                                    id={getFieldId("addDirector_yes", collectionName, index)}
                                                    value="yes"
                                                    ref={register()}
                                                    defaultChecked={item.addDirector == "yes"}
                                                    onChange={onRadioboxChange} />
                                                <label className="form-check-label" htmlFor={getFieldId("addDirector_yes", collectionName, index)}>Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio"
                                                    name={getFieldName("addDirector", collectionName, index)}
                                                    id={getFieldId("addDirector_no", collectionName, index)}
                                                    value="no"
                                                    ref={register()}
                                                    defaultChecked={!(item.addDirector) || item.addDirector == "no"}
                                                    onChange={onRadioboxChange} />
                                                <label className="form-check-label" htmlFor={getFieldId("addDirector_no", collectionName, index)}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }

                        </React.Fragment>
                    )
                })
            }
        </>
    )
}

export default BusinessDirectorList