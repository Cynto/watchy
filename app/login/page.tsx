import LoginForm from '@app/(components)/LoginForm';

export default function Login() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-1/2 min-w-[280px] max-w-[480px]  min-h-fit flex-col flex gap-y-5  px-7 py-10 rounded-sm bg-zinc-900">
        <header className="w-full grid gap-2">
          <h1 className="text-gray-100 text-2xl font-semibold justify-self-center">
            Log in to <span className={'text-red-800'}>Watchy</span>
          </h1>
          <span className=" border-b-[2px] border-zinc-700 rounded-3xl"></span>
        </header>
        <LoginForm />
      </div>
    </main>
  );
}
