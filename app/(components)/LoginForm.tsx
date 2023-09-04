import LoadingOverlay from '@app/(components)/LoadingOverlay';
import LabelWithInput from '@app/(components)/LabelWithInput';
import { FormEvent, useRef, useState } from 'react';

const initialFormErrors = {
  emailUsername: '',
  password: '',
};

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState('');
  const [loginError, setLoginError] = useState('');

  const emailUsernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userPayload = {
      emailUsername: emailUsernameRef.current
        ? emailUsernameRef.current.value
        : '',
      password: passwordRef.current ? passwordRef.current.value : '',
    };

    const { payloadToSend, err } = validateLogin(userPayload);

    if (err !== '') {
      setLoginError(err);
    } else if (submitError !== '') {
      setLoginError('');
    } else if (err === '') {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadToSend),
        });
        const data = await response.json();
        setLoading(false);

        if (response.ok) {
        } else {
          setLoginError(data.errors[0].msg);
        }
        console.log(data);
      } catch (e) {
        setLoading(false);
        if (e instanceof TypeError) {
          if (e.message === 'Failed to fetch') {
            setSubmitError(
              'Unable to connect to server. Please try again later.',
            );
          }
        }
      }
    }
  };
  return (
    <>
      {loading && <LoadingOverlay color={'white'} />}
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        {loginError !== '' && (
          <p className={'input-error text-red-800 text-sm'}>{loginError}</p>
        )}
        <LabelWithInput
          id={'email_username'}
          name={'email_username'}
          type={'text'}
          innerRef={emailUsernameRef}
          inputError={''}
        />

        <LabelWithInput
          id={'password'}
          name={'Password'}
          type={'password'}
          innerRef={passwordRef}
          inputError={''}
        />

        {submitError !== '' && (
          <p className={'input-error text-red-800 text-sm'}>{submitError}</p>
        )}
        <button
          type={'submit'}
          className="py-1.5 rounded-sm text-sm font-bold bg-red-800 hover:bg-red-900"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
