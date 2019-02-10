import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Field, reduxForm} from 'redux-form';

/**TODO: validate*/
const require = value => value ? undefined : 'Required';
const maxLength = value => value && value.length > 15 ? `Must be 15 characters or less` : undefined;
const number = value => value && isNaN(Number(value)) ? `Must be a number` : undefined;
const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined;
const minAge = minValue(18);
const isValidEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
/**TODO: warning */
const overYearsOld = value => value && value > 70 ? 'You might be too old for using this' : undefined;
const isYahooMail = value => value && /.+@yahoo\.com/.test(value) ? 'Really? You still use yahoo mail?' : undefined; 
/**TODO: normalize = 'auto correct input' */
const normalizeUpper = value => value && value.toUpperCase();
const normalizeLower = value => value && value.toLowerCase();
const normalizePhoneNumber = value => {
  if (!value) return '';
  const numberValue = value.replace(/[^\d]/g, ''); // get numeric value
  if (numberValue.length <= 3) return numberValue; // type '123' => display '123'
  if (numberValue.length <= 7) return `${numberValue.slice(0,3)}.${numberValue.slice(3)}`; // type '1234567' => display '123.4567'
  return `${numberValue.slice(0,3)}.${numberValue.slice(3,6)}.${numberValue.slice(6,10)}`; // type '1234567890' => display '123.456.7890'
}

const renderField = ({label, keyboardType, meta: {touched, error, warning}, input: {onChange, ...restInput}}) => {
  return (
    <View style={{flexDirection: 'column', height: 70, alignItems: 'flex-start'}}>
      <View style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', width: 80}}>{label}</Text>
        <TextInput style={{borderColor: 'steelblue', borderWidth: 1, height: 37, width: 120, padding: 5}}
          keyboardType={keyboardType} onChangeText={onChange} {...restInput}
        />
      </View>
      {touched && ((error && <Text style={{color: 'red'}}>{error}</Text>) ||
          (warning && <Text style={{color: 'orange'}}>{warning}</Text>))}
    </View>
  ); 
}

const submit = values => {
  alert(`Validate success. Values = ~${JSON.stringify(values)}`);
}

const ContactComponent = props => {
  const {handleSubmit} = props;
  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 40, justifyContent: 'flex-start'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 10}}>Redux form</Text>
      <Field keyboardType='default' label='Username: ' component={renderField} name='username'
        validate={[require,maxLength]}
        normalize={normalizeLower}
      />
      <Field keyboardType='default' label='Fullname: ' component={renderField} name='fullname'
        validate={[require,maxLength]}
        normalize={normalizeUpper}
      />
      <Field keyboardType='email-address' label='Email: ' component={renderField} name='email'
        validate={isValidEmail}
        warn={isYahooMail}
      />
      <Field keyboardType='numeric' label='Phone: ' component={renderField} name='phone'
        normalize={normalizePhoneNumber}
      />
      <Field keyboardType='numeric' label='Age: ' component={renderField} name='age'
        validate={[require, number, minAge]}
        warn={overYearsOld}
      />
      <TouchableOpacity onPress={handleSubmit(submit)} style={{margin: 10, alignItems: 'center'}}>
        <Text style={{backgroundColor: 'steelblue', color: 'white', fontSize: 16, height: 37, width: 200, textAlign: 'center', padding: 10}}>Submit</Text>
      </TouchableOpacity>  
    </View> 
  )
}

const ContactForm = reduxForm({
  form: 'contact',
})(ContactComponent);
export default ContactForm;