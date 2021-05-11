import MetaHead from "../components/seo/meta";
import MainLayout from "../components/layout/main-layout";
import { VehicleTypes } from "enums/VehicleTypes";
import { GetSitemapBodyTypePages, GetSitemapBudgetPages, GetInStockPages, GetGeneralSitemapPages, GetVehicleTypes } from "business-logic/sitemapService";
import { ManufacturerModels } from "types/ManufacturerModels";
import { groupByArray } from "helpers/helpers";
import { GetCanonicalUrl, GetVehicleManufacturerUrl, GetShortModelUrl } from "helpers/urlHelper";
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { SitemapPageIndexItem } from "types/SitemapPageIndexItem";
import { GetManufacturersModels } from "business-logic/vehicleService";

export async function getServerSideProps() {
    const sitemapPages: Array<SitemapPageIndexItem> = await GetGeneralSitemapPages(true);
    const manufacturerModels: { data: Array<ManufacturerModels> } = await GetManufacturersModels();
    return { props: { pages: sitemapPages, manufacturerModels: manufacturerModels.data } }
}



const SiteMap = ({ pages, manufacturerModels }) => {

    const getLeaseDealType = (type: VehicleTypes) => {
        return type == VehicleTypes.Car ? LeasingDealTypes.Personal : LeasingDealTypes.Van
    }

    const types = GetVehicleTypes();

    return (
        <>
            <MetaHead>
                <title>Sitemap | LeasingOptions</title>
                <meta name="description" content="View the Leasing Options Sitemap to help you navigate our site."></meta>
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire"></meta>
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-white">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-24 mb-3 mb-md-5">
                                <h1>Sitemap</h1>
                                <ol className="ordered-list">
                                    {pages.map((page) => (
                                        <li key={page.name}><a href={page.url}>{page.name}</a></li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {types.map((vehicleType) => (
                            <div className="row">
                                <div className="col-24">
                                    <h3>{VehicleTypes[vehicleType].toString() === 'Car' ? 'Car Leasing' : ' Van Leasing'}</h3>
                                </div>
                                <div className="col-24 col-md-8 mb-3 mb-md-5">
                                    <h4 className="text-mint">Budget pages</h4>
                                    <hr />
                                    <ul>
                                        {GetSitemapBudgetPages(vehicleType).map((page) => (
                                            <li key={page.name}><a href={page.url}>{page.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-24 col-md-8 mb-3 mb-md-5">
                                    <h4 className="text-mint">Body type pages</h4>
                                    <hr />
                                    <ul>
                                        {GetSitemapBodyTypePages(vehicleType).map((page) => (
                                            <li key={page.name}><a href={page.url}>{page.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-24 col-md-8 mb-3 mb-md-5">
                                    <h4 className="text-mint">In stock pages</h4>
                                    <hr />
                                    <ul>
                                        {GetInStockPages(vehicleType).map((page) => (
                                            <li key={page.name}><a href={page.url}>{page.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                                {manufacturerModels.filter((item: ManufacturerModels) => {
                                    return item.models.some(x => x.vehicleType == vehicleType);
                                })?.map((item: ManufacturerModels) => (
                                    <div className="col-24 col-md-8 mb-3 mb-md-5">
                                        <h4 className="text-mint">{item.manufacturer.manufacturer}</h4>
                                        <hr />
                                        <ul>
                                            <li><a href={GetCanonicalUrl(GetVehicleManufacturerUrl(false, null, getLeaseDealType(vehicleType), item.manufacturer.manufacturerUrl))}>SEE ALL</a></li>
                                            {groupByArray(item.models.filter((item) => {
                                                return item.vehicleType == vehicleType;
                                            }), 'shortModText').map((model) => (
                                                <li><a href={GetCanonicalUrl(GetShortModelUrl(false, null, getLeaseDealType(vehicleType), item.manufacturer.manufacturerUrl, model.values[0].shortModTextUrl))}>{model.key}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

SiteMap.layout = MainLayout;
export default SiteMap;