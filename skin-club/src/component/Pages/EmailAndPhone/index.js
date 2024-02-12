import './emailAndPhone.scss';
import {Input} from "../../Atoms/Input";
import {Button} from "../../Atoms/Button";
import {useState} from "react";
import 'react-phone-number-input/style.css'
import {login} from "../../../services/booking";
import {validateEmail, validPhoneNumber} from "../../../helpers";
import SweetAlert2 from "react-sweetalert2";
import {Spinner} from "../../Atoms/Spinner";
import PhoneInput from 'react-phone-number-input'

export const EmailAndPhone = ({handleState, state}) => {
    const [swalProps, setSwalProps] = useState({});
    const [loading, setLoading] = useState(false);
    const [userEmailError, setUserEmailError] = useState(false);
    const [userPhoneError, setUserPhoneError] = useState(false);

    const validateAndGo = async () => {
        if (state.userEmail === "") {
            setUserEmailError(true);
            return;
        } else {
            setUserEmailError(false);
        }
        if (state.userPhone === "") {
            setUserPhoneError(true);
            return;
        } else {
            setUserPhoneError(false);
        }

        if (state.userEmail !== "" && !validateEmail(state.userEmail)) {
            setSwalProps({
                show: true,
                icon: 'error',
                title: 'Invalid Email!',
                confirmButtonColor: 'black',
                text: 'Please use a valid email. Ex: user@example.com',
            });
            setTimeout(() => {
                setSwalProps({});
            }, 5000);
            return null;
        }

        if (state.userPhone !== "" && !validPhoneNumber(state.userPhone)) {
            setSwalProps({
                show: true,
                icon: 'error',
                title: 'Invalid Phone Number!',
                confirmButtonColor: 'black',
                html: '<div class="mb-2">Please use a valid phone.</div><div> Ex: +1408XXXXXXX</div>',
            });
            setTimeout(() => {
                setSwalProps({});
            }, 5000);
            return null;
        }

        if ((state.userPhone !== '' && validPhoneNumber(state.userPhone)) && (state.userEmail !== '' && validateEmail(state.userEmail))) {
            setUserEmailError(false);
            setUserPhoneError(false);
            setLoading(true);
            try {
                const {data: {data}} = await login(state.userPhone, state.userEmail);
            } catch (err) {
                console.log(err);
            }
            window.location.href = '#validation'
        }
        setLoading(false);
    }

    return <>
        <SweetAlert2 {...swalProps} />
        <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
            <h2 className={'text-[34px] mb-[28px]'}>Enter you email and phone</h2>
            <div className={'lg:text-[14px] text-[16px] mb-[25px] font-ptSerif lg:text-black text-[#636466]'}>Help us find or set up your account by verifying your email and phone.
            Referral credit is only valid for verified new patients</div>
            <div>
                <small className={'text-[14px]'}>Email</small>
                <Input
                    type={'text'}
                    name={'userEmail'}
                    onChange={handleState}
                    value={state.userEmail}
                    placeholder={'jane@gmail.com'}
                />
                {userEmailError && <small className={'text-xs text-rose-600'}>User email required</small>}
            </div>
            <div className={'mt-[24px]'}>
                <small className={'text-[14px]'}>Phone</small>
                <PhoneInput
                    international
                    defaultCountry="AU"
                    placeholder={'(447) 488-8549'}
                    className={'w-full py-2 border-b border-gray-900'}
                    value={state.userPhone}
                    onChange={(e) => {
                        console.log(e);
                        handleState('userPhone', e)
                    }}/>
                {userPhoneError && <small className={'text-xs text-rose-600'}>User phone required</small>}
            </div>
            <Button handleClick={validateAndGo} className={'mt-[43px] font-tradeGothic text-[14px] py-[14px]'}>
                {loading ? <Spinner color={'white'} /> : 'CONTINUE'}
            </Button>
        </div>
        <div className={'emailAndPhoneBanner'} />
    </>
}