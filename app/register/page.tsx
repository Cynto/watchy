import UserRegisterForm from '@app/(components)/UserRegisterForm';
export default function Register() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-1/2 min-w-[280px] max-w-[480px]  min-h-fit flex-col flex gap-y-5  px-7 py-10 rounded-sm bg-zinc-900">
        <header className="w-full grid gap-2">
          <h1 className="text-gray-100 text-2xl font-semibold justify-self-center">
            Join <span className={'text-red-800'}>Watchy</span> today!
          </h1>
          <span className=" border-b-[2px] border-zinc-700 rounded-3xl"></span>
          <p className="text-gray-100 text-sm">
            Creating an account allows you to follow your favourite rooms and
            create your own permanent room for you and your friends, or
            community!
          </p>
        </header>
        <UserRegisterForm />
      </div>
    </main>
  );
}
