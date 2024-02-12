
import './App.scss';
import {useEffect, useState} from "react";
import Logo from './assets/icon/logo.svg';
import ArrowLeft from './assets/icon/big-arrow-left.svg';
import {PaymentInfo} from "./component/Pages/PaymentInfo";
import {EnterDetails} from "./component/Pages/EnterDetails";
import {HowCanWeHelp} from "./component/Pages/HowCanWeHelp";
import {ChooseStudio} from "./component/Pages/ChooseStudio";
import {Consultation} from "./component/Pages/Consultation";
import {EmailAndPhone} from "./component/Pages/EmailAndPhone";
import {VerificationCode} from "./component/Pages/VerificationCode";
import {WhatTreatment} from "./component/Pages/WhatTreatment";
import {WhichDoctor} from "./component/Pages/WhichDoctor";
import {useLocation} from 'react-router-dom';


const App = () => {

    const [windowTab, setWindowTab] = useState('');
    const [steps, setSteps] = useState(0);
    const [state, setState] = useState({
        cvc: '',
        staffId: '',
        fromTime: '',
        newOrOld: '',
        userPhone: '',
        userEmail: '',
        serviceId: '',
        staffList: [],
        expiration: '',
        originalTime: '',
        userLastName: '',
        userFirstName: '',
        studioLocation: '',
        selectedStudio: '',
        creditCardNumber: '',
        verificationCode: '',
    });


    const reset = () => {
        window.location.href = '';
        setState({
            cvc: '',
            staffId: '',
            fromTime: '',
            userPhone: '',
            userEmail: '',
            serviceId: '',
            staffList: [],
            expiration: '',
            originalTime: '',
            userLastName: '',
            userFirstName: '',
            selectedStudio: '',
            creditCardNumber: '',
            verificationCode: '',
        });
    }

    const handleState = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    window.addEventListener('popstate', function (event) {
        const {hash} = event.target.location;
        if (windowTab !== hash) {
            setWindowTab(hash)
        }
    });

    console.log(state);

    useEffect(() => {
        setWindowTab(window.location.hash)
    }, [])

    const goBack = () => {
        switch (windowTab) {
            case '#email-phone':
                window.location.href = '';
                break;
            case '#validation':
                window.location.href = '#email-phone';
                break;
            case '#how-help':
                window.location.href = '#validation';
                break;
            // case 4:
            //     return <WhichDoctor state={state} handleState={handleState} />
            case '#consultation':
                window.location.href = '#how-help';
                break;
            case '#enter-details':
                window.location.href = '#consultation';
                break;
            case '#payment':
                window.location.href = '#enter-details';
                break;
            default:
                return <ChooseStudio state={state} handleState={handleState} />;
        }
    }

    const renderScreens = () => {
        switch (windowTab) {
            case '':
                return <ChooseStudio state={state} handleState={handleState} />
            case '#email-phone':
                return <EmailAndPhone state={state} handleState={handleState} />
            case '#validation':
                return <VerificationCode state={state} handleState={handleState} />
            case '#how-help':
                return <HowCanWeHelp state={state} handleState={handleState} />
            // case 4:
            //     return <WhichDoctor state={state} handleState={handleState} />
            case '#consultation':
                return <Consultation state={state} handleState={handleState} />
            case '#enter-details':
                return <EnterDetails state={state} handleState={handleState} />
            case '#payment':
                return <PaymentInfo reset={reset} state={state} handleState={handleState} />
            default:
                return <ChooseStudio state={state} handleState={handleState} />
        }
        if (steps > 0) {
            setSteps(steps - 1);
        }
    }

  return (
      <div>
          <div className="w-full py-4 flex justify-center items-center border-b border-black relative">
            <div className="go-back absolute left-[17px] cursor-pointer" onClick={goBack}>
                <img src={ArrowLeft} alt="ArrowLeft"/>
            </div>
            <div className="logo">
                {steps === 4 && window.innerWidth < 500 ?
                    <div className={'text-[14px] uppercase text-black font-bold'}>30 inute Consultaion</div> :
                    <img className={'w-[130px] lg:w-auto'} src={Logo} alt="logo" />}
            </div>
          </div>
          <div className="lg:grid grid-cols-2 gap-2 body">
              {renderScreens()}
          </div>
      </div>
  );
}

export default App;
