import './whatTreatment.scss';
import ArrowRight from '../../../assets/icon/arrow-right.svg';

export const WhatTreatment  = ({setSteps, handleState, state}) => {
    return <>
        <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
            <div className={'text-[35px] mb-[46px] lg:mb-[24px]'}>What treatment are you after?</div>
            <div onClick={() => {handleState('typeOfService', 'wrinkle consultation'); setSteps(5)}}
                className={'bg-[#FCF7F1] cursor-pointer flex justify-between items-center px-[14px] pt-[16px] pb-[14px] mb-[19px]'}>
                <div>
                    <div className={'text-[20px] lg:text-[24px]'}>Anti wrinkle</div>
                    <div className={'text-[14px] font-ptSerif'}>Schedule a complimentary Wrinkle Consultation</div>
                </div>
                <img src={ArrowRight} alt={'ArrowRight'} />
            </div>
            <div onClick={() => {handleState('typeOfService', 'wrinkle relaxer'); setSteps(5)}}
                className={'bg-[#FCF7F1] cursor-pointer flex justify-between items-center px-[14px] pt-[16px] pb-[14px]'}>
                <div>
                    <div className={'text-[20px] lg:text-[24px]'}>Bio remodeling</div>
                    <div className={'text-[14px] font-ptSerif'}>Schedule a Wrinkle Relaxer treatment</div>
                </div>
                <img src={ArrowRight} alt={'ArrowRight'} />
            </div>
        </div>
        <div className={'howCanWeHelpBanner'} />
    </>
}