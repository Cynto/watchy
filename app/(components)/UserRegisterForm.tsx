'use client';
import {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from 'react';
import LabelWithInput from '@app/(components)/LabelWithInput';

import validateUserRegistration from '@app/(validators)/validateUserRegistration';
import LoadingOverlay from '@app/(components)/LoadingOverlay';
import DOBSection from '@app/(components)/DOBSection';

const initialFormErrors = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
  dob: '',
};
interface FormErrors {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  dob: string;
}

export default function UserRegisterForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (ref: MutableRefObject<HTMLInputElement>) => {
    let payload: { [key: string]: string } = {};
    if (formErrors.hasOwnProperty(ref.current.id)) {
      payload[ref.current.id as keyof FormErrors] = ref.current.value;
    }

    if (ref.current.id === 'passwordConfirm' || ref.current.id === 'password') {
      payload = {
        passwordConfirm: passwordConfirmRef.current
          ? passwordConfirmRef.current.value
          : '',
        password: passwordRef.current ? passwordRef.current.value : '',
      };
    }

    if (ref.current.value !== '' && Object.keys(payload).length > 0) {
      const errs = validateUserRegistration(payload, formErrors);
      const errVals = Object.values(errs);
      if (!errVals.every((val) => val === '')) {
        setFormErrors(errs);
      } else if (formErrors !== initialFormErrors) {
        setFormErrors(initialFormErrors);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userPayload = {
      email: emailRef.current ? emailRef.current.value : '',
      username: usernameRef.current ? usernameRef.current.value : '',
      password: passwordRef.current ? passwordRef.current.value : '',
      passwordConfirm: passwordConfirmRef.current
        ? passwordConfirmRef.current.value
        : '',
      dob: {
        day: dayRef.current ? dayRef.current.value : '',
        month: monthRef.current ? monthRef.current.value : '',
        year: yearRef.current ? yearRef.current.value : '',
      },
    };

    const errs = validateUserRegistration(userPayload, formErrors);
    const errVals = Object.values(errs);
    if (!errVals.every((val) => val === '')) {
      setFormErrors(errs);
    } else if (formErrors !== initialFormErrors) {
      setFormErrors(initialFormErrors);
    } else if (errVals.every((val) => val === '')) {
      const dobDate = new Date(
        Number(userPayload.dob.year),
        Number(userPayload.dob.month) - 1,
        Number(userPayload.dob.day),
      );
      const payloadToSend = {
        ...userPayload,
        dob: dobDate,
      };
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/users/add', {
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
          setFormErrors((oldObj) => {
            let newObj = { ...oldObj };
            data.errors.forEach(
              (err: {
                type: string;
                msg: string;
                path: string;
                value?: string;
                location: string;
              }) => {
                if (newObj.hasOwnProperty(err.path)) {
                  newObj[err.path as keyof FormErrors] = err.msg;
                }
              },
            );
            return newObj;
          });
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
        <LabelWithInput
          id={'email'}
          name={'Email'}
          type={'text'}
          innerRef={emailRef}
          inputError={formErrors.email}
          handleChange={handleChange}
        />
        <LabelWithInput
          id={'username'}
          name={'Username'}
          type={'text'}
          innerRef={usernameRef}
          inputError={formErrors.username}
          handleChange={handleChange}
        />
        <LabelWithInput
          id={'password'}
          name={'Password'}
          type={'password'}
          innerRef={passwordRef}
          inputError={formErrors.password}
          handleChange={handleChange}
        />
        <LabelWithInput
          id={'passwordConfirm'}
          name={'Confirm Password'}
          type={'password'}
          innerRef={passwordConfirmRef}
          inputError={formErrors.passwordConfirm}
          handleChange={handleChange}
        />

        <DOBSection dayRef={dayRef} monthRef={monthRef} yearRef={yearRef} />
        {formErrors.dob !== '' && (
          <p className={'input-error text-red-800 text-sm'}>{formErrors.dob}</p>
        )}
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
