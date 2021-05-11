import React, { useEffect, useState } from 'react';
import MetaHead from "components/seo/meta";
import ExpandableText from "components/expandable-text";
import VehicleCarousel from "components/vehicle-carousel";
import CardVehicle from "components/card/card-vehicle";
import DealsFilters from "components/deals-filters/deals-filters";
import CardWithStickers from 'components/card/card-with-stickers'
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from "enums/VehicleTypes";
import { getVehicleHeaderIcon } from "helpers/helpers";

type Props = {
    leasingDealType: LeasingDealTypes;
    vehicleType: VehicleTypes;

    serviceSchema: any;

    topSpecialOffers: any;
    specialOffersGrouped: any;
}

//TODO: slow rendering - investigate
const SpecialOffersPage: React.FC<Props> = ({ leasingDealType, vehicleType, topSpecialOffers, specialOffersGrouped, serviceSchema }) => {
    const [makes, setMakes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedMake, setSelectedMake] = useState<string>(null);
    const [sortOrder, setSortOrder] = useState<string>("price;asc");
    const [specialOffersGroupedList, setSpecialOffersGroupedList] = useState(null);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalModels, setTotalModels] = useState<number>(0);

    useEffect(() => {
        let itemsToShow = JSON.parse(JSON.stringify(specialOffersGrouped)) || [];

        for (let i = 0; i < itemsToShow.length; i++) {
            let group = itemsToShow[i];
            group.vehicles = group.vehicles.filter(item => leasingDealType === 2 ? item.personalDeal !== null : item.businessDeal !== null);
        }

        itemsToShow = itemsToShow.filter(item => item.vehicles && item.vehicles.length > 0);

        let makesList = itemsToShow.flatMap(item => item.vehicles).map(item => item.make).filter((value, idx, self) => self.indexOf(value) === idx).sort()
            .map(item => { return { id: item, name: item } });
        let categoriesList = itemsToShow.map(item => { return { id: item.categoryId, name: item.categoryName } });

        setCategories(categoriesList);
        setMakes(makesList);

        if (selectedMake && !makesList.map(item => item.id.toLowerCase()).includes(selectedMake.toLowerCase())) {
            setSelectedMake(null);
        }

        if (selectedCategories && selectedCategories.length > 0) {
            const availableCategoryIds = categoriesList.map(item => item.id);
            const updatedCategories = selectedCategories.filter(item => availableCategoryIds.includes(item));

            if (updatedCategories.length != selectedCategories.length) {
                setSelectedCategories(updatedCategories);
            }
        }
    }, [leasingDealType, specialOffersGrouped]);

    useEffect(() => {
        let itemsToShow = JSON.parse(JSON.stringify(specialOffersGrouped)) || [];

        if (selectedCategories && selectedCategories.length > 0) {
            itemsToShow = itemsToShow.filter(item => selectedCategories.includes(item.categoryId));
        }

        for (let i = 0; i < itemsToShow.length; i++) {
            let group = itemsToShow[i];

            if (selectedMake) {
                group.vehicles = group.vehicles.filter(item => item.make.toLowerCase() === selectedMake.toLowerCase());
            }

            group.vehicles = group.vehicles.filter(item => leasingDealType === 2 ? item.personalDeal !== null : item.businessDeal !== null);
        }

        itemsToShow = itemsToShow.filter(item => item.vehicles && item.vehicles.length > 0);

        let resultItems = itemsToShow.flatMap(item => item.vehicles).map(item => { return { make: item.make, model: item.model } });

        //TODO: Maybe worth sort setSpecialOffersGroupedList separatelly?
        for (let i = 0; i < itemsToShow.length; i++) {
            let group = itemsToShow[i];

            let sortDirection = sortOrder.split(";")[1];

            group.vehicles = group.vehicles.sort(function (a, b) {
                const aDeal = leasingDealType === 2 ? a.personalDeal : a.businessDeal;
                const bDeal = leasingDealType === 2 ? b.personalDeal : b.businessDeal;

                if (aDeal.monthlyPrice < bDeal.monthlyPrice) {
                    return -1;
                }
                else if (aDeal.monthlyPrice > bDeal.monthlyPrice) {
                    return 1;
                }

                return 0;
            });

            if (sortDirection === "desc") {
                group.vehicles = group.vehicles.reverse();
            }
        }

        setTotalItems(resultItems.length);
        setTotalModels(resultItems.map(item => item.model).filter((value, idx, self) => self.indexOf(value) === idx).length)
        setSpecialOffersGroupedList(itemsToShow);
    }, [leasingDealType, selectedMake, selectedCategories, sortOrder]);

    const handleCategoryChange = (value: number) => {
        if (!value) {
            setSelectedCategories([]);
        }
        else {
            if (selectedCategories.includes(value)) {
                let updatedCategories = selectedCategories.filter((item: number) => item !== value);

                setSelectedCategories(updatedCategories);
            }
            else {
                setSelectedCategories((prevSate) => [...prevSate, value]);
            }
        }
    }

    const handleMakeChange = (value: string) => {
        setSelectedMake(value);
    }

    const handleSortOrderChange = (value: string) => {
        if (value && sortOrder !== value) {
            setSortOrder(value);
        }
    }

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
            </MetaHead>
            <CardWithStickers>
            {topSpecialOffers?.length > 0 &&
                <div className="container-fluid py-5 bg-white">
                    <div className="row">
                        <div className="col-24">
                            <h1 className="mb-5">{vehicleType == VehicleTypes.Car ? 'Car' : 'Van'} Lease Deals &amp; Special Offers</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 px-md-0">
                            <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={topSpecialOffers.length > 3}>
                                {topSpecialOffers?.map(vehicle => (
                                    <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`featured-${vehicle.vehicleRef}`} header={true} headerColor="#980000" headerIcon={getVehicleHeaderIcon(vehicle.optionsType)} vehicle={vehicle} dealSelector={leasingDealType} />
                                ))}
                            </VehicleCarousel>
                        </div>
                    </div>
                </div>
            }

            <DealsFilters
                categories={selectedCategories}
                make={selectedMake}
                totalItems={totalItems}
                totalModels={totalModels}
                settings={{
                    availableCategories: categories,
                    availableMakes: makes,
                    onCategoryChange: handleCategoryChange,
                    onMakeChange: handleMakeChange,
                    onSortOrderChange: handleSortOrderChange
                }}
            />

            {specialOffersGroupedList?.map((category, index) =>
                (
                    <div key={category.categoryId} className={`container-fluid py-3 py-md-5 ${index % 2 == 0 ? 'bg-white' : 'bg-light-grey'}`}>
                        <div className="row">
                            <div className="col-24">
                                <h3 className="mb-3 mb-md-5"><mark className="mark-text">{category.vehicles.length}</mark> {category.categoryName} Special Offers</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24">
                                <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={category.vehicles.length > 3}>
                                    {category.vehicles?.map(vehicle => (
                                        <CardVehicle key={`${category.categoryId}-${vehicle.vehicleRef}`} id="category-1" header={true} headerColor="#009892" headerIcon={getVehicleHeaderIcon(vehicle.optionType)} vehicle={vehicle} dealSelector={leasingDealType} />
                                    ))}
                                </VehicleCarousel>
                            </div>
                        </div>
                    </div>
                )
            )}
            </CardWithStickers>
            <div className="container-fluid py-3 py-md-5">
                <div className="row">
                    <div className="col-24">
                        {vehicleType == VehicleTypes.Car &&
                            <ExpandableText theme="light">
                                {'<p>Browse our best car leasing deals and save money on your next vehicle today. Simply click the icons below to filter by body type or price and find top value on a huge choice of vehicles. Our handpicked special offers won’t be around forever. Check them out now and find the brand new car you want for the lowest price.</p>' +
                                    `<p>With a wide range of special offers, it’s simple to find the best car lease deals around with Leasing Options. We have a fantastic selection of new vehicles with impressive savings available, guaranteeing you a great price on both <Link href="/car-leasing"><a>personal</a></Link> and <a href="/business-car-leasing">business</a> contracts.</p>
                                <p>From SUVs to convertibles to hybrids, we have an extensive selection of cars on offer for a limited time. Choose the body type or brand you’re looking to find the right car for your lifestyle and budget. What’s more, we have fantastic discounts on many leading manufacturers, with the likes of <a href="/car-leasing/mercedes-benz">Mercedes-Benz</a>, <a href="/car-leasing/audi">Audi</a> and <a href="/car-leasing/kia">Kia</a> regularly on offer.</p>
                                <p>Our special offers are perfect if you’re looking for the lowest possible monthly bill, or if you have a specific type of car in mind but aren’t fussy about the model.</p>
                                <p>If you need your vehicle as soon as possible, check for the In Stock label, where you’ll find cars that are ready to be delivered to your door fast. Don’t forget to view our Mega Deals and Manager Specials for additional price cuts too.</p>
                                <p>Leasing already offers a flexible, affordable way to drive your chosen car for a fixed monthly rate. And with our latest discounts, you can take advantage of even lower prices and get brilliant savings on a brand-new vehicle today.</p>
                                <p>Find your perfect car leasing deal today with Leasing Options. If you can’t decide or have any questions, just <a href="/contact">get in touch</a> with our expert team who’ll be happy to help. </p>`}
                            </ExpandableText>
                        }

                        {vehicleType == VehicleTypes.Commercial &&
                            <ExpandableText theme="light">
                                {'<p>Buying a van can mean expensive up-front costs that can mean putting your plans on hold. With van leasing, you can get on the move as quickly as possible with affordable monthly payments. Enjoy access to the latest van models, with the benefits of better mileage and lower emissions – there are no depreciation costs to worry about, and you can even have maintenance included as part of your contract.</p>'}
                            </ExpandableText>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpecialOffersPage;