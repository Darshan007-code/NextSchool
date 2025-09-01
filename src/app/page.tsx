import Link from 'next/link';

export default function Home() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4 mb-4">Welcome to NEXTSCHOOL</h1>
        <p className="lead mb-4">The modern solution for school management.</p>
        <div className="d-grid gap-2 col-6 mx-auto">
          <Link href="/addSchool" className="btn btn-primary btn-lg">
            Add a School
          </Link>
          <Link href="/showSchools" className="btn btn-secondary btn-lg">
            View All Schools
          </Link>
        </div>
      </div>
    </main>
  );
}
