import './enterDetails.scss';
import {Input} from "../../Atoms/Input";
import {Button} from "../../Atoms/Button";
import {useState} from "react";

export const EnterDetails = ({handleState, state}) => {
    const [userFirstNameError, setUserFirstNameError] = useState(false);
    const [userLastNameError, setUserLastNameError] = useState(false);
    const [userEmailError, setUserEmailError] = useState(false);
    const [userPhoneError, setUserPhoneError] = useState(false);

    const validateAndGo = () => {
        if (state.userFirstName === "") {
            setUserFirstNameError(true)
        }
        if (state.userLastName === "") {
            setUserLastNameError(true)
        }
        if (state.userEmail === "") {
            setUserEmailError(true)
        }
        if (state.userPhone === "") {
            setUserPhoneError(true)
        }

        if (state.userPhone !== '' && state.userEmail !== '' && state.userFirstName !== '' && state.userLastName !== '') {
            setUserFirstNameError(false);
            setUserLastNameError(false);
            setUserEmailError(false);
            setUserPhoneError(false);
            window.location.href = '#payment';
        }
    }

    return <>
        <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
            <h2 className={'text-[34px] lg:mb-[26px] mb-[10px]'}>Enter your details</h2>
            <div className={'lg:text-[14px] text-[16px] text-[#636466] lg:text-[black] font-ptSerif mb-[33px] leading-6'}>Your Wrinkle Consultation is scheduled for <span className={'text-black font-bold lg:font-normal'}>{state.dateTime}</span> at our Brooklyn Heights studio.
                Please arrive 10 minutes prior to your scheduled appointment time to fill out forms, take photos, etc.
            </div>
            <div className={'lg:grid grid-cols-2 gap-4'}>
                <div>
                    <small className={'text-[12px]'}>First name</small>
                    <Input
                        type={'text'}
                        name={'userFirstName'}
                        onChange={handleState}
                        value={state.userFirstName}
                        placeholder={'Enter first name'}
                    />
                    {userFirstNameError && <small className={'text-xs text-rose-600'}>User first name required</small>}
                </div>
                <div className={'mt-[24px] lg:mt-[0]'}>
                    <small className={'text-[12px]'}>Last name</small>
                    <Input
                        type={'text'}
                        name={'userLastName'}
                        onChange={handleState}
                        value={state.userLastName}
                        placeholder={'Enter last name'}
                    />
                    {userLastNameError && <small className={'text-xs text-rose-600'}>User last name required</small>}
                </div>
            </div>
            <div className={'mt-[24px]'}>
                <small className={'text-[12px]'}>Phone</small>
                <Input
                    type={'text'}
                    name={'userPhone'}
                    onChange={handleState}
                    value={state.userPhone}
                    placeholder={'Enter your phone number'}
                />
                {userPhoneError && <small className={'text-xs text-rose-600'}>User phone required</small>}
            </div>
            <div className={'mt-[24px]'}>
                <small className={'text-[12px]'}>Email</small>
                <Input
                    type={'text'}
                    name={'userEmail'}
                    onChange={handleState}
                    value={state.userEmail}
                    placeholder={'Enter your email'}
                />
                {userEmailError && <small className={'text-xs text-rose-600'}>User email required</small>}
            </div>
            <Button handleClick={validateAndGo} className={'mt-[24px] text-[14px] font-tradeGothic py-[14px]'}>CONTINUE</Button>
        </div>
        <div className={'enterDetailsBanner'} />
    </>
}