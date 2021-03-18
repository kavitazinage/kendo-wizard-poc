//import * as React from 'react';
import React, { useState, useEffect} from "react";
//import * as ReactDOM from 'react-dom';

import { Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';

import { AccountDetails } from './AccountDetails';
import { PersonalDetails } from './PersonalDetails';
import { PaymentDetails } from './PaymentDetails';
import  {data}  from './Constant';

const stepPages = [
    AccountDetails,
    PersonalDetails,
    PaymentDetails  
];

export default function SampleWizard () {
    const [step, setStep] = React.useState(0);
    const [formState, setFormState] = React.useState({});
    const [steps, setSteps] = React.useState([
        { label: 'Account Details', isValid: undefined },
        { label: 'Personal Details', isValid: undefined },
        { label: 'Payment Details', isValid: undefined }
    ]);

    const [ndata, setData] = useState([]);
    useEffect(() => {
    const initialdata = data.map(function (item) {
        return {
            id: item.id,
            personid: 1,
            name: item.name,
            dateOfBirth: (item.dateOfBirth === '1900-01-01T00:00:00' || item.dateOfBirth === '0001-01-01T00:00:00') ? '' : new Date(item.dateOfBirth),
            gender: item.gender,
            relationship: item.relationship,
            isActive: item.isActive,
            type: item.type,
            percentage: parseInt(item.percentage),
            inEdit: true
        };
    });
    setData(initialdata);
}, []);


    const lastStepIndex = steps.length - 1;
    const isLastStep = lastStepIndex === step;
    // const isPreviousStepsValid = steps
    //     .slice(0, step)
    //     .findIndex(currentStep => currentStep.isValid === false) === -1;

    const onStepSubmit = React.useCallback(
        (event) => {
            const { isValid, values } = event;

            const currentSteps = steps.map((currentStep, index) => ({
                ...currentStep,
                isValid: index === step ? isValid : currentStep.isValid
            }));

            setSteps(currentSteps);

            //Get Props updated data on next click of step "Personal Details"
            if (currentSteps[step].label === "Personal Details") {
                console.log(ndata);
            }

            if (!isValid) {	
                return;	
            }	

            setStep(() => Math.min(step + 1, lastStepIndex));
            setFormState(values);

            if (isLastStep) {	
                alert(JSON.stringify(values));	
            }	
        },	
        [steps, step, isLastStep, ndata, lastStepIndex]
    );

    const onPrevClick = React.useCallback(
        (event) => {
            event.preventDefault();
            setStep(() => Math.max(step - 1, 0));
        },
        [step, setStep]
    );

    const stepComponent = (formProps) => {
      let component = null;
      // eslint-disable-next-line default-case
      switch(step){
        case 0:
        component =  <AccountDetails formProps={formProps}/>
        break;
        case 1:
        component =  <PersonalDetails formProps={formProps} data={ndata} setData={setData}/>
        break;
        case 2:
        component =  <PaymentDetails formProps={formProps}/>
        break;
      
      }
     
      return component
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Stepper value={step} items={steps} />
            <Form
                initialValues={formState}
                onSubmitClick={onStepSubmit}
                render={(formRenderProps) => (
                    <div style={{ alignSelf: 'center' }}>
                        <FormElement style={{ width: 480 }}>
                            {stepComponent(formRenderProps)}
                            <span style={{ marginTop: '40px' }} className={'k-form-separator'} />
                            <div
                                style={{ justifyContent: 'space-between', alignContent: 'center' }}
                                className={'k-form-buttons k-buttons-end'}
                            >
                                <span style={{ alignSelf: 'center' }}>Step {step + 1} of 3</span>
                                <div>
                                    {
                                        step !== 0 ? (
                                            <Button style={{ marginRight: '16px' }} onClick={onPrevClick}>
                                                Previous
                                            </Button>
                                        ) : undefined
                                    }
                                    <Button
                                        primary={true}
                                        disabled={!formRenderProps.allowSubmit}
                                        onClick={formRenderProps.onSubmit}
                                    >
                                        {isLastStep ? 'Submit' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </FormElement>
                    </div>
                )}
            />
        </div>
    );
};
// ReactDOM.render(
//     <App />,
//     document.querySelector('my-app')
// );