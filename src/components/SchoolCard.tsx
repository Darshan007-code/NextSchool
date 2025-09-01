'use client';

import Image from 'next/image';

interface School {
  name: string;
  address: string;
  city: string;
  image: string;
}

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  return (
    <div className="card h-100">
      <Image
        src={school.image}
        alt={school.name}
        className="card-img-top"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{school.name}</h5>
        <p className="card-text">{school.address}</p>
        <p className="card-text text-muted">{school.city}</p>
        <div className="d-grid mt-3">
          <button className="btn btn-primary">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}