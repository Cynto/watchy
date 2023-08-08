import NormalFormInput from '@app/(components)/NormalFormInput';
import { MutableRefObject, RefObject } from 'react';

export default function DOBSection({
  dayRef,
  monthRef,
  yearRef,
}: {
  dayRef: RefObject<HTMLInputElement>;
  monthRef: RefObject<HTMLSelectElement>;
  yearRef: RefObject<HTMLInputElement>;
}) {
  return (
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
  );
}
