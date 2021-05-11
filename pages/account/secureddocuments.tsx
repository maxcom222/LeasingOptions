import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Customer } from 'types/account/Customer';
import AccountAPI from 'API/AccountAPI';
import { UploadDocument } from 'types/account/UploadDocument';
import AccountLayout from 'components/layout/account-layout';
import { WebDocument } from 'types/account/Document';

const AccountDocumentsPage: React.FC = () => {

    const [documents, setDocuments] = useState<Array<WebDocument>>([])

    const [name, setName] = useState<string>()
    const [comments, setComments] = useState<string>()
    const [fileName, setFileName] = useState<string>()
    const [fileType, setFileType] = useState<string>()

    const [upload, setUpload] = useState<string | null>()

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem('lo-account-credentials')))
    }, [])

    useEffect(() => {
        if (customer?.accountId) {
            AccountAPI.getDocuments(customer?.accountId)
                .then(data => {

                    if (data.data != null) {
                        setDocuments(data.data);
                    }
                })
        }

    }, [customer?.accountId])

    const updateComments = (event) => {
        setComments(event.target.value);
    }

    const updateName = (event) => {
        setName(event.target.value);
    }

    const onSubmitHandler = () => {

        let obj: UploadDocument = {
            accountId: customer.accountId,
            name: name!,
            comments: comments!,
            fileName: fileName!,
            fileType: fileType!,
            fileData: upload?.toString()!
        }

        AccountAPI.saveDocument(obj);
        return false;
    }

    const handleFile = (event) => {

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setFileName(file.name);
            setFileType(file.type)
            setUpload(reader.result?.toString().split(',').pop());
        };

        reader.onerror = (err) => {
            // reject(err);
        };

        reader.readAsDataURL(file);
    }

    return (

        <AccountLayout>
            <div className="container-fluid bg-light-grey py-3 py-md-5">
                <div className="row">
                    <div className="col-24 mb-3">
                        <p className="text-center"><strong>To assist with your application please upload the required documents here. Press the upload file button and follow the on screen instructions.</strong></p>
                        <p className="text-center"><strong>Please give the document a name and press upload.</strong></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 mb-3">
                        <h2 className="text-default">Upload document</h2>
                        <form onSubmit={onSubmitHandler}>
                            <div className="row">
                                <div className="col-24 col-md-12 mb-3 py-1">
                                    <input type="file" onChange={e => handleFile(e)} />
                                </div>
                                <div className="col-24 col-md-12 mb-3">
                                    <input type="text" className="form-control" onChange={e => updateName(e)} placeholder="Name"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <textarea className="form-control" placeholder="Comments" onChange={e => updateComments(e)}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-right">
                                    <button className="btn btn-primary btn-lg btn-fluid-xs" type="submit">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 mb-3">
                        <h2 className="text-default">Your documents</h2>
                    </div>
                </div>
                <div className="row">
                    {documents.map((document) =>
                        <div key={document.createdOn} className="col-24 col-md-12 mb-2">
                            <div className="w-100 bg-white px-3 py-1">
                                <div className="row">
                                    <div className="col-16 d-flex flex-wrap justify-content-center align-items-center border-right border-light">
                                        <strong className="w-100 d-block text-limit">{document.fileName}</strong>
                                        <span className="w-100 d-block text-limit">{document.fileSize} - {document.createdOn}</span>
                                    </div>
                                    <div className="col-8 d-flex flex-wrap justify-content-center align-items-center">
                                        <a href={'http://localhost:27381/api/documents/download?id=' + document.id} className="button button-brand" rel="noopener noreferrer" target="blank"><FontAwesomeIcon icon={faSearch} className="mr-1 ml-0" /> View</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AccountLayout>
    )
}

export default AccountDocumentsPage