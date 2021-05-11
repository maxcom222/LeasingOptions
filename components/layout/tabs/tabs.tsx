import React, { useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ModalContext from '../../HOCs/modal/modalContext';
import ModalGallery from '../../layout/modal-gallery';

type Props = {
    modalTitle: string;
    activeTab: string;
    handleActiveTab: any;
    tabOne: any;
    tabTwo?: any;
    tabThree?: any;
    tabFour?: any;
}

const ModelTabs: React.FC<Props> = ({ modalTitle, activeTab, handleActiveTab, tabOne, tabTwo = null, tabThree = null, tabFour = null }) => {
    const modalContext = useContext(ModalContext);

    const handleGalleryClick = (imagePath, imageAlt) => {
        modalContext.showModal(ModalGallery, { show: true, title: modalTitle, imagePath: imagePath, imageAlt: imageAlt })
    }
    const handleTabChange = (key) => handleActiveTab(key);

    return (
        <Tabs id="model-tabs" activeKey={activeTab} onSelect={handleTabChange}>
            {tabOne &&
                <Tab eventKey="review" title="Review" dangerouslySetInnerHTML={{__html: tabOne.review}}></Tab>
            }
            {tabTwo.length > 0 &&
                <Tab eventKey="gallery" title="Gallery">
                    <div className="row">
                        {tabTwo?.map((image, index) => (
                            <div key={`thumbnail-${index}`} className="col-12 col-sm-6 col-md-8 col-lg-6 col-xl-4 pb-4">
                                <img data-src={image} className="img-fluid lazyload" alt="Gallery thumbnail" onClick={() => { handleGalleryClick(image, "") }} />
                            </div>
                        ))}
                    </div>
                </Tab>
            }
        </Tabs>
    )
}

export default ModelTabs;