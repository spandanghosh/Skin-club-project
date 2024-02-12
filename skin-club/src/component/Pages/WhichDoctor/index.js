import './whichDoctor.scss';
import {useEffect, useState} from "react";
import {Spinner} from "../../Atoms/Spinner";
import {getDoctors, getServices} from "../../../services/booking";
import ArrowRight from '../../../assets/icon/arrow-right.svg';

export const WhichDoctor  = ({setSteps, handleState, state}) => {
    const [loading, setLoading] = useState(true);
    const [doctorsInfo, setDoctorsInfo] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const {data: {data: {response: {returnvalue: {data: doctorsInformation}}}}} = await getDoctors(state.serviceId);
                if (doctorsInformation) {
                    setDoctorsInfo(doctorsInformation);
                    setLoading(false);
                    console.log(doctorsInformation, 18);
                }
            } catch (e) {
                console.log(e);
            }
        })()
    }, []);

    const renderServices = () => {
        if (loading) {
            return <Spinner />
        }

        return doctorsInfo.map((item, index) => (
            <div key={index}
                 onClick={() => {
                     handleState('staffId', item.id);
                     setSteps(5)
                 }}
                 className={'bg-[#FCF7F1] cursor-pointer flex justify-between items-center px-[14px] pt-[16px] pb-[14px] mb-[19px]'}>
                <div>
                    <div className={'text-[20px] lg:text-[24px]'}>{item.name}</div>
                    <div className={'text-[14px] font-ptSerif text-gray-500'}>{item.email}</div>
                </div>
                <img src={ArrowRight} alt={'ArrowRight'} />
            </div>
        ));
    }

    return <>
        <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
            <div className={'text-[35px] mb-[46px] lg:mb-[24px]'}>Choose Specialist?</div>
            {renderServices()}
        </div>
        <div className={'howCanWeHelpBanner'} />
    </>
}