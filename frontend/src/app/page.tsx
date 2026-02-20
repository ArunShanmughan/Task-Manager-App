import Link from 'next/link';

export default function HomePage() {
  return (
     <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
        <p className="mt-3 text-slate-600">Organize your work with secure login and task tracking.</p>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/login" className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-md border border-slate-300 px-5 py-2 text-slate-700 hover:bg-slate-100"
          >
             Sign Up
          </Link>
        </div>
         </div>
    </main>
  );
}