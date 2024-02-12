import './consultation.scss';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import {useEffect, useState} from "react";
import {Button} from "../../Atoms/Button";
import { DayPicker } from 'react-day-picker';
import {getAppointment, getDoctors, getServices} from "../../../services/booking";
import EveningIcon from '../../../assets/icon/evening.svg';
import MorningIcon from '../../../assets/icon/morning.svg';
import AfterNoonIcon from '../../../assets/icon/afternoon.svg';
import {Spinner} from "../../Atoms/Spinner";
import CloseIcon from '../../../assets/icon/close.svg';
import ScrollDown from '../../../assets/images/move.png';

export const Consultation = ({handleState, state}) => {
    let selectedDate = '';
    const [morning, setMorning] = useState([]);
    const [evening, setEvening] = useState([]);
    const [selected, setSelected] = useState(state.originalTime);
    const [schedule, setSchedule] = useState([]);
    const [afterNoon, setAfterNoon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctorName, setDoctorName] = useState(null);
    const [doctorsInfo, setDoctorsInfo] = useState([]);
    const [showDoctorList, setShowDoctorList] = useState(false);
    const apiTime = state.originalTime !== '' ? format(state.originalTime, 'dd-LLL-Y') : '';

    useEffect(() => {
        (async () => {
            setSelected(new Date());
            handleState('originalTime', new Date());
            await getProvided();
        })()
    }, [])
    const getProvided = async () => {
        const {data: {data: {response: {returnvalue: {data: doctorsInformation}}}}} = await getDoctors(state.serviceId);
        if (doctorsInformation) {
            await changeProvider(doctorsInformation[0].id, doctorsInformation[0].name);
            setDoctorsInfo(doctorsInformation);
        }
    }
    const changeProvider = async (val, name) => {
        handleState('staffId', val);
        setDoctorName(name);
        await getSchedule(state.originalTime, val);
    }
    const getSchedule = async (selectedDate, staffId) => {
        setLoading(true);
        setMorning([]);
        setEvening([]);
        setAfterNoon([]);
        try {
            console.log(staffId, selectedDate, 51);
            const {data: {data: {response: {returnvalue: {data: locationData}}}}} = await getAppointment(state.serviceId, staffId, format(selectedDate, 'LLLL dd, y'));
            setSchedule(locationData);

            const _morning = [];
            const _evening = [];
            const _afterNoon = [];

            if (locationData.length) {
                locationData.forEach(item => {
                    const time = item.split(' ')[0].split(":")[0] + '.' + item.split(' ')[0].split(":")[1];
                    const timeFormat = item.split(' ')[1];
                    if (timeFormat === 'AM' && parseInt(time) < 12) {
                        _morning.push(item);
                    }
                    if (timeFormat === 'PM' && ((parseInt(time) >= 1 && parseInt(time) <= 4) || (time >= 12 && time <= 12.45))) {
                        _afterNoon.push(item);
                    }
                    if (timeFormat === 'PM' && parseInt(time) > 4 && parseInt(time) < 7) {
                        _evening.push(item);
                    }
                });
                setMorning(_morning);
                setEvening(_evening);
                setAfterNoon(_afterNoon);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    if (selected) {
        selectedDate = format(selected, "iiii, LLL. d");
    }
    const formatWeekdayName = (date, options) => (
        <>
            {format(new Date(date), 'EEE', { locale: options?.locale })}
        </>
    );
    const formatCaption = (date, options) => (
        <>
            {format(new Date(date), 'LLL y', { locale: options?.locale })}
        </>
    );
    const renderMorning = () => {
        if (morning.length) {
            return morning.map((item, index) => (
                <Button className={'py-[14px]'} key={index}
                        handleClick={() => {
                            window.location.href = '#enter-details'; handleState('fromTime', apiTime + ' ' + item)}}>{item}</Button>
            ))
        } else {
            return 'No morning appointments are available on this date.';
        }
    }

    const renderAfternoon = () => {
        if (afterNoon.length) {
            return afterNoon.map((item, index) => (
                <Button className={'py-[14px]'} key={index}
                        handleClick={() => {
                            window.location.href = '#enter-details'; handleState('fromTime', apiTime + ' ' + item)}}>{item}</Button>
            ))
        } else {
            return 'No afternoon appointments are available on this date.';
        }
    }
    const renderEvening = () => {
        if (evening.length) {
            return evening.map((item, index) => (
                <Button className={'py-[14px]'} key={index}
                        handleClick={() => {
                            window.location.href = '#enter-details'; handleState('fromTime', apiTime + ' ' + item)}}>{item}</Button>
            ))
        } else {
            return 'No evening appointments are available on this date.'
        }
    }

    return <>
        <div className={'lg:px-[50px] px-[0px] pt-[30px] lg:pt-0'}>
            <div className={'lg:px-[0] px-[20px] text-[34px] mb-[17px] mt-[46px] lg:block hidden'}>30 inute Consultaion</div>
            <div className={'lg:px-[0] px-[20px] text-[14px] mb-[17px] font-ptSerif'}>Schedule a complimentary Wrinkle Consultation (with option to receive same-day Wrinkle Treatment)</div>
            <div className={'lg:px-[0] px-[20px] text-[12px] mb-[27px] font-tradeGothic font-light lg:block hidden'}>SET FILTERS</div>
            <div className="lg:hidden animate-bounce fixed bottom-5 left-1/2 -translate-x-1/2 -ml-4"><img src={ScrollDown} alt="ScrollDown" className={'w-10 h-10 p-2 bg-amber-100 rounded-xl'}/></div>

            <div className={'text-xs mb-1 text-gray-500 lg:flex hidden'}>Choose Providers</div>
            <div className="gap-4 lg:flex hidden">
                <button onClick={() => {setShowDoctorList(!showDoctorList)}}
                    className={'bg-[#FFF1DA] px-[11px] py-[12px] rounded-[4px] text-[12px] relative cursor-pointer'}>
                    {doctorName ?? 'Select provider'}
                    {showDoctorList ? <div className="absolute bg-white rounded shadow w-80 h-max z-10 top-12 left-0">
                        <div className="flex font-tradeGothic font-bold justify-between text-[16px] p-3 pb-0">
                            PROVIDER
                            <div onClick={() => {setShowDoctorList(!showDoctorList)}}>
                                <img src={CloseIcon} alt={'CloseIcon'}/>
                            </div>
                        </div>
                        <div className={'mt-2 max p-2 max-h-[10rem] overflow-y-auto'}>
                            {doctorsInfo.length ? doctorsInfo.map((item, index) => (
                                <div
                                    className={`${state.staffId === item.id ? 'text-amber-700' : ''} flex text-[15px] font-bold hover:bg-amber-100 rounded p-2 w-full items-center`}
                                    key={index} onClick={async () => {
                                        console.log(item.id);
                                    await changeProvider(item.id, item.name)
                                }}>
                                    {item.name}
                                </div>
                            )) : <></>}
                        </div>
                    </div> : <></>}
                </button>
                <button className={'bg-[#FFA500] px-[11px] py-[12px] rounded-[4px] text-[12px] text-white'}>{state.studioLocation}</button>
            </div>
            <div className={'custom-calender bg-[#FCFBF7] w-full lg:px-[39px] px-[31px] lg:py-[46px] py-[31px]'}>
                <div className={'text-[24px] mb-[34px] lg:block hidden'}>Select a date</div>
                <DayPicker
                    mode="single"
                    disabled={{before: new Date()}}
                    formatters={{formatWeekdayName, formatCaption}}
                    defaultMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                    fromYear={new Date().getFullYear()}
                    toYear={2040}
                    selected={selected}
                    onSelect={async (e) => {
                        setSelected(e);
                        await getSchedule(e, state.staffId);
                        handleState('originalTime', e)
                    }}
                />
            </div>

            <div className={'text-xs mt-4 text-gray-500 lg:hidden flex px-[20px]'}>Choose Providers</div>
            <div className="gap-4 lg:hidden flex mt-[12px] lg:px-[0] px-[20px]" >
                <button onClick={() => {setShowDoctorList(!showDoctorList)}}
                        className={'bg-[#FFF1DA] px-[11px] font-[600] py-[12px] rounded-[4px] text-[12px] relative'}>
                    {doctorName ?? "Select provider"}
                    {showDoctorList ? <div className="absolute bg-white rounded shadow w-80 h-max z-10 top-12 left-0">
                        <div className="flex font-tradeGothic font-bold justify-between text-[16px] p-3 pb-0">
                            PROVIDER
                            <div onClick={() => {setShowDoctorList(!showDoctorList)}}>
                                <img src={CloseIcon} alt={'CloseIcon'}/>
                            </div>
                        </div>
                        <div className={'mt-2 max p-2 max-h-[10rem] overflow-y-auto'}>
                            {doctorsInfo.length ? doctorsInfo.map((item, index) => (
                                <div
                                    className={`${state.staffId === item.id ? 'text-amber-700' : ''} flex text-[15px] font-bold hover:bg-amber-100 rounded p-2 w-full items-center`}
                                    key={index} onClick={async () => {
                                    console.log(item.id);
                                    await changeProvider(item.id, item.name)
                                }}>
                                    {item.name}
                                </div>
                            )) : <></>}
                        </div>
                    </div> : <></>}
                </button>
                <button className={'bg-[#FFA500] px-[11px] font-[600] py-[12px] rounded-[4px] text-[12px] text-white'}>{state.studioLocation}</button>
            </div>
        </div>
        <div className={'px-[20px] flex flex-col justify-center'}>
            <div className={'lg:text-[24px] text-[16px] mt-[24px] lg:mt-[0] mb-[32px]'}>Select a time for <span className={'font-bold'}>{state.fromTime !== '' ? state.fromTime.split(' ')[0] : selectedDate}</span></div>
            <div>
                <div className={'lg:mb-[51px] mb-[43px]'}>
                    <div className={'flex gap-2 items-center mb-[14px] font-[600] text-[12px]'}>
                        <img src={MorningIcon} alt="morning" className={'w-[24px]'}/>
                        MORNING
                    </div>
                    <div className={`${morning.length ? 'grid' : ''} lg:grid-cols-5 grid-cols-3 gap-3 text-[#989191] text-[14px] font-ptSerif`}>
                        {loading ? <Spinner /> : renderMorning()}
                    </div>
                </div>
                <div className={'lg:mb-[51px] mb-[43px]'}>
                    <div className={'flex gap-2 items-center mb-[14px] text-[12px] font-[600]'}>
                        <img src={AfterNoonIcon} alt="morning" className={'w-[24px]'}/>
                        AFTERNOON
                    </div>
                    <div className={`${afterNoon.length ? 'grid' : ''} lg:grid-cols-5 grid-cols-3 gap-3 text-[#989191] text-[14px] font-ptSerif`}>
                        {loading ? <Spinner /> : renderAfternoon()}
                    </div>
                </div>
                <div className={'lg:mb-[51px] mb-[43px]'}>
                    <div className={'flex gap-2 items-center mb-[14px] text-[12px] font-[600]'}>
                        <img src={EveningIcon} alt="morning" className={'w-[24px]'}/>
                        EVENING
                    </div>
                    <div className={`${evening.length ? 'grid' : ''} lg:grid-cols-5 grid-cols-3 gap-3 text-[#989191] text-[14px] font-ptSerif`}>
                        {loading ? <Spinner /> : renderEvening()}
                    </div>
                </div>
                <div className={'mt-[79px text-[14px] font-ptSerif mb-4'}>
                    Not seeing the time you want? Call us at 212-884-9663 to schedule.
                </div>
            </div>
        </div>
    </>
}