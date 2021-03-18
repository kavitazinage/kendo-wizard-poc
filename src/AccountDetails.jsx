import * as React from 'react';

import { Field } from '@progress/kendo-react-form';

import {
    FormInput, 
} from './form-components.jsx';



export const AccountDetails = () => (
    <div>
        <Field
            key={'userName'}
            id={'userName'}
            name={'userName'}
            label={'Username'}
            component={FormInput}
            
        />
         
      
    </div>
);