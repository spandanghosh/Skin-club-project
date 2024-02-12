import './chooseStudio.scss';
import GoogleMapReact from "google-map-react";
import ArrowRight from "../../../assets/icon/arrow-right.svg";
import {grayMap} from "./googleMapCustomStyle";
import {GOOGLE_MAP_API_KEY} from "../../../env";
import {getLocations} from "../../../services/booking";
import {useEffect, useState} from "react";
import {Spinner} from "../../Atoms/Spinner";
import Marker from "../../../assets/images/marker.png";

const AnyReactComponent = () => <img className={'w-6 h-9'} src={Marker} alt={'Marker'} />;
export const ChooseStudio = ({handleState, state}) => {
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    useEffect(() => {
        (async () => {
            try {
                const {data: {data: {response: {returnvalue: {data: locationData}}}}} = await getLocations();
                setLocations(locationData);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        })()
    }, []);

    const handleStoreClick = (name, value, place) => {
        handleState(name, value);
        handleState('studioLocation', place);
        window.location.href = '#email-phone'
    }

    const renderLocation = () => {
        if (loading) {
            return <Spinner />
        }
        return locations.length ? locations.map((item, index) => {
            return (
                <div onClick={() => {handleStoreClick('selectedStudio', item.id, item.name)}}
                     key={index}
                     className={'bg-[#F2EFE8] flex justify-between items-center px-[14px] pt-[15px] pb-[14px] mb-[12px] cursor-pointer'}>
                    <div>
                        <div className={'text-[20px] lg:text-[20px]'}>{item.name}</div>
                        {/*<div className={'text-[14px]  font-ptSerif font-ptSerif'}>70 Schermerhorn Street Brooklyn, NY 11201</div>*/}
                    </div>
                    <img src={ArrowRight} alt={'ArrowRight'} />
                </div>
            )
        }) : <div>No location information found</div>
    }

    return (
        <>
            <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
                <div className={'text-[35px] mb-[18px]'}>Choose a studio</div>
                {renderLocation()}
            </div>
            <div>
                <GoogleMapReact
                    options={{
                        styles: grayMap,
                    }}
                    bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
                    defaultCenter={{
                        lat: -37.861229977293290,
                        lng: 145.00804780332552
                    }}
                    defaultZoom={12}
                >
                    <AnyReactComponent
                        lat={-37.837719471384666}
                        lng={145.00804780332552}
                    />
                    <AnyReactComponent
                        lat={-37.851229977193235}
                        lng={144.9935798047721}
                    />
                    <AnyReactComponent
                        lat={-37.90570568887008}
                        lng={145.0076489459398}
                    />
                </GoogleMapReact>
            </div>
        </>
    )
}