import './paymentInfo.scss';
import {Button} from "../../Atoms/Button";
import {bookAppointment, makePurchase} from "../../../services/booking";
import {CreditCard, PaymentForm} from 'react-square-web-payments-sdk';
import {SQUAREUP_APP_ID, SQUAREUP_LOCATION_ID} from "../../../env";
import {useState} from "react";
import SweetAlert2 from "react-sweetalert2";
import {Exception} from "sass";
import {Input} from "../../Atoms/Input";

export const PaymentInfo = ({state, reset}) => {

    const [swalProps, setSwalProps] = useState({});
    const [haveCoupon, setHaveCoupon] = useState(false);

    const validateAndGo = async (payment) => {
        try {
            const {data: {data}} = await bookAppointment(
                state.serviceId,
                state.staffId,
                state.fromTime,
                {
                    name: state.userFirstName + " " + state.userLastName,
                    email: state.userEmail,
                    phone_number: state.userPhone,
                },
                {
                    user_phone: state.userPhone,
                    user_email: state.userEmail,
                    user_first_name: state.userFirstName,
                    user_last_name: state.userLastName
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    const makePurchaseRequest = async (token) => {
        setSwalProps({});
        try {
            const {data: {data: {payment}}} = await makePurchase(
                token,
                state.userEmail,
                state.staffId,
                state.fromTime,
                {
                    name: state.userFirstName + " " + state.userLastName,
                    email: state.userEmail,
                    phone_number: state.userPhone,
                },
                state.serviceId,
                {
                    user_phone: state.userPhone,
                    user_email: state.userEmail,
                    user_first_name: state.userFirstName,
                    user_last_name: state.userLastName
                });
            // await validateAndGo(payment);
            setSwalProps({
                show: true,
                title: 'Successful!',
                confirmButtonColor: 'black',
                text: 'You booking is now complete',
            });
            setTimeout(() => {
                reset();
            }, 3000)
        } catch (e) {
            console.log(e);
            setSwalProps({
                show: true,
                icon: 'error',
                title: 'Failed!',
                confirmButtonColor: 'black',
                text: 'You booking was not completed',
            });
        }
    }

    return <>
        <SweetAlert2 {...swalProps} />
        <div className={'lg:px-[50px] px-[20px] pt-[30px] lg:pt-0 flex flex-col justify-center'}>
            <h2 className={'text-[34px] mb-[26px]'}>Your payment info</h2>

            <div className={'text-[14px] font-ptSerif leading-6 mb-[33px]'}>A credit card is required to book your appointment. Cancellation is free up to 12 hours before your appointment. Cancellations within 12 hours incur a $25 fee.
            </div>

            <div className={'my-[24px] lg:mt-[mt-0]'}>
                <div className={'py-2 border-b w-full border-gray-900 mb-[16px]'}>
                    <div className={'text-[14px] font-bold'}>Appointment Details</div>
                </div>
                {state.newOrOld === 'old' ? <>
                    <div className={'flex justify-between border-b text-gray-600 border-gray-700 pb-[14px] font-ptSerif text-[14px]'}>
                        <div>Anti wrinkle</div>
                        <div>$425</div>
                    </div>
                    <div className={'flex justify-between border-b text-gray-600  border-gray-900 py-[14px] font-ptSerif text-[14px]'}>
                        <div>Bio remodelling</div>
                        <div>$649</div>
                    </div>
                </> : <></>}
                <div className={'flex justify-between border-b font-bold border-gray-900 py-[14px] font-ptSerif text-[14px]'}>
                    <div>You pay now</div>
                    <div>$0</div>
                </div>
            </div>
            <div className={'text-xs font-bold font-tradeGothic mb-2 cursor-pointer'} onClick={() => {setHaveCoupon(!haveCoupon)}}>Have a coupon?</div>
            {haveCoupon ? <Input
                type={'text'}
                name={'coupon'}
                className={'mb-3'}
                placeholder={'Enter your coupon here'}
            /> : <></>}
            <PaymentForm
                cardTokenizeResponseReceived={async (data, verifiedBuyer) => {
                    await makePurchaseRequest(data.token);
                }}
                locationId={SQUAREUP_LOCATION_ID}
                applicationId={SQUAREUP_APP_ID}>
                <CreditCard
                    buttonProps={{
                        css: {
                            className: 'font-tradeGothic',
                            backgroundColor: 'black',
                            borderRadius: '30px',
                            fontWeight: 'bold'
                        }
                    }}>CONFIRM BOOKING</CreditCard>
            </PaymentForm>
        </div>
        <div className={'paymentBanner'} />
    </>
}