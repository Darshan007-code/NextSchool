'use client';

import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth';
import SchoolCard from '@/components/SchoolCard';

interface School {
  name: string;
  address: string;
  city: string;
  image: string;
}

function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/showSchools');
        const data = await response.json();
        if (data.success) {
          setSchools(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch schools', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Our Schools</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {schools.map((school, index) => (
          <div className="col" key={index}>
            <SchoolCard school={school} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(ShowSchools);