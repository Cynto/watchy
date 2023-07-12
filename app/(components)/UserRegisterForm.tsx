'use client'
import {useRef} from "react";
import NormalFormInput from "@app/(components)/NormalFormInput";
import LabelWithInput from "@app/(components)/LabelWithInput";
import {FormEvent} from "react";
import validateUserRegistration from "@app/(validators)/validateUserRegistration";

export default function UserRegisterForm() {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null)
    const dayRef = useRef<HTMLInputElement | null>(null)
    const monthRef = useRef<HTMLSelectElement | null>(null)
    const yearRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const userPayload = {
            email: emailRef.current ? emailRef.current.value : '',
            username: usernameRef.current ? usernameRef.current.value : '',
            password: passwordRef.current ? passwordRef.current.value : '',
            passwordConfirm: passwordConfirmRef.current ? passwordConfirmRef.current.value : '',
            dob: {
                day: dayRef.current ? dayRef.current.value : '',
                month: monthRef.current ? monthRef.current.value : '',
                year: yearRef.current ? yearRef.current.value : ''
            }
        };

        const errs = validateUserRegistration(userPayload);
        console.log(errs)
    }

    return (<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <LabelWithInput id={"email"} name={"Email"} type={"email"} required innerRef={emailRef}/>
        <LabelWithInput id={"username"} name={"Username"} type={"text"} required innerRef={usernameRef}/>
        <LabelWithInput id={"password"} name={"Password"} type={"password"} required innerRef={passwordRef}/>
        <LabelWithInput id={"passwordConfirm"} name={"Confirm Password"} type={"password"}  required innerRef={passwordConfirmRef}/>

        <div className="text-gray-100  text-[0.81rem] grid grid-cols-3 grid-rows-2 gap-x-3">
            <legend className="col-span-full text-neutral-100 font-bold">Date of Birth</legend>
            <NormalFormInput type={"text"} required={true} defaultVal={""} id={"day"} name={"day"} placeholder={"Day"} width={"w-full"} innerRef={dayRef}/>
            <select ref={monthRef} defaultValue={0} name="month" id={"month"} className={"w-full h-8 py-1 px-3 text-gray-100 bg-zinc-900 rounded border-[1px] hover:border-[2px] border-zinc-600 focus:outline-none focus:border-[4px] focus:border-red-800"}>
                <option value={0}  disabled>Month</option>
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
            <NormalFormInput type={"text"} required={true} defaultVal={""} id={"year"} name={"year"} placeholder={"Year"} width={"w-full"} innerRef={yearRef}/>

        </div>
        <button type={"submit"} className="py-1.5 rounded-sm bg-zinc-800 text-sm" >
            Sign Up
        </button>
    </form>)
}