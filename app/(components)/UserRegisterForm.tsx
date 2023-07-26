'use client';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import NormalFormInput from '@app/(components)/NormalFormInput';
import LabelWithInput from '@app/(components)/LabelWithInput';
import { FormEvent } from 'react';
import validateUserRegistration from '@app/(validators)/validateUserRegistration';

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
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef<HTMLInputElement | null>(null);
  const monthRef = useRef<HTMLSelectElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);

  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

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
        const response = await fetch('http://localhost:8000/api/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadToSend),
        });
        const data = await response.json();

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
        console.log(e);
      }
    }
  };

  return (
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

      <div className="text-gray-100  text-[0.81rem] grid grid-cols-3 grid-rows-2 gap-x-3">
        <legend className="col-span-full text-neutral-100 font-bold">
          Date of Birth
        </legend>
        <NormalFormInput
          type={'text'}
          defaultVal={''}
          id={'day'}
          name={'day'}
          placeholder={'Day'}
          width={'w-full'}
          innerRef={dayRef}
        />
        <select
          ref={monthRef}
          defaultValue={0}
          name="month"
          id={'month'}
          className={
            'w-full h-8 py-1 px-3 text-gray-100 bg-zinc-900 rounded border-[1px] hover:border-[2px] border-zinc-600 focus:outline-none focus:border-[4px] focus:border-red-800'
          }
        >
          <option value={0} disabled>
            Month
          </option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
        <NormalFormInput
          type={'text'}
          defaultVal={''}
          id={'year'}
          name={'year'}
          placeholder={'Year'}
          width={'w-full'}
          innerRef={yearRef}
        />
      </div>
      {formErrors.dob !== '' && (
        <p className={'text-red-800 text-sm'}>{formErrors.dob}</p>
      )}
      <button
        type={'submit'}
        className="py-1.5 rounded-sm text-sm font-bold bg-red-800 hover:bg-red-900"
      >
        Sign Up
      </button>
    </form>
  );
}
