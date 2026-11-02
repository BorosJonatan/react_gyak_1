import { Link } from 'react-router'

function HomePage() {

    return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
        <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl font-bold">
            Eseménykereső
            </h1>

            <p className="mt-2 text-slate-600">
            Találd meg a következő eseményedet!
            </p>

            <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">
                    Események
                </h2>

                <p className="mt-2 text-slate-600">
                    Hamarosan itt jelennek meg az események.
                </p>

                <Link to="/events" className="mt-4 inline-block bg-slate-900 text-white  px-4  py-2  rounded-lg  hover:bg-slate-700">Események megtekintése</Link>
            </section>
        </div>
    </main>
      )
  }
  
  export default HomePage