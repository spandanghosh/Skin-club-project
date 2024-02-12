import {useState} from "react";
import './verificationCode.scss';
import {Input} from "../../Atoms/Input";
import {Button} from "../../Atoms/Button";
import {verifyOTP} from "../../../services/booking";
import SweetAlert2 from "react-sweetalert2";
import {Spinner} from "../../Atoms/Spinner";

export const VerificationCode = ({handleState, state}) => {

    const [loading, setLoading] = useState(false);
    const [swalProps, setSwalProps] = useState({});

    const [verificationCodeError, setVerificationCodeError] = useState(false);


    const validateAndGo = async () => {
        setLoading(true);
        if (state.verificationCode === "") {
            setVerificationCodeError(true)
        }

        if (state.verificationCode !== '') {
            setVerificationCodeError(false);

            try {
                const {data: {data}} = await verifyOTP(state.userPhone, state.verificationCode);
                if (data && data.hasOwnProperty('token')) {
                    localStorage.setItem('auth_token', data.token);
                }
                window.location.href = '#how-help'
            } catch (err) {
                setSwalProps({
                    show: true,
                    icon: 'error',
                    title: 'Verification Failed!',
                    confirmButtonColor: 'black',
                    text: "You've provided a wrong OTP",
                });
                setTimeout(() => {
                    setSwalProps({});
                }, 5000)
                console.log(err);
            }
        }
        setLoading(false);
    }

    return <>
        <SweetAlert2 {...swalProps} />
        <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
            <h2 className={'text-[34px] mb-[28px]'}>Enter verification code</h2>
            <div className={'text-[14px] mb-[25px] font-ptSerif'}>Enter the 6 digit code sent to xxx-xxx-xxxx. This may take a moment</div>
            <div>
                <small className={'text-[14px]'}>Verification Code</small>
                <Input
                    name={'verificationCode'}
                    value={state.verificationCode}
                    onChange={handleState}
                    type={'text'}
                    placeholder={'Enter verification code'}
                />
                {verificationCodeError && <small className={'text-xs text-rose-600'}>Verification code required</small>}
            </div>
            <div className="flex justify-center flex-col items-center">

                <Button handleClick={validateAndGo} className={'text-[14px] font-tradeGothic py-[14px] mt-[24px]'}>
                    {loading ? <Spinner color={'white'} /> : 'VERIFY'}
                </Button>
                <div className={'text-[12px] mt-[24px]'}>OR</div>
                <div onClick={() => {
                    window.location.href = '#how-help'}} className={'underline cursor-pointer text-[12px] mt-[24px] mb'}>Continue as a Guest</div>
            </div>
        </div>
        <div className={'verificationBanner'} />
    </>
}