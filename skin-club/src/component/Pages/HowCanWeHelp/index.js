import './howCanWeHelp.scss';
import {useEffect, useState} from "react";
import {Spinner} from "../../Atoms/Spinner";
import {getServices} from "../../../services/booking";
import ArrowRight from '../../../assets/icon/arrow-right.svg';

export const HowCanWeHelp  = ({handleState, state}) => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const {data: {data: {response: {returnvalue: {data: serviceData}}}}} = await getServices(state.selectedStudio);
                setServices(serviceData);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        })()
    }, []);

    const renderServices = () => {
        if (loading) {
            return <Spinner />
        }

        return services.map((item, index) => (
            <div key={index}
                 onClick={() => {
                     handleState('serviceId', item.id);
                     handleState('newOrOld', item.name === 'New Patient Consultation' ? 'new' : 'old');
                     window.location.href = '#consultation';
                 }}
                 className={'bg-[#FCF7F1] cursor-pointer flex justify-between items-center px-[14px] pt-[16px] pb-[14px] mb-[19px]'}>
                <div>
                    <div className={'text-[20px] lg:text-[24px]'}>{item.name}</div>
                </div>
                <img src={ArrowRight} alt={'ArrowRight'} />
            </div>
        ));
    }

    return <>
        <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
            <div className={'text-[35px] mb-[46px] lg:mb-[24px]'}>How can we help?</div>
            {renderServices()}
        </div>
        <div className={'howCanWeHelpBanner'} />
    </>
}