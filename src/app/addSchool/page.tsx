'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  contact: z.string().min(1, 'Contact is required').regex(/^\d+$/, 'Contact must be a number'),
  email_id: z.string().email('Invalid email address'),
  image: z.any().refine((files) => files?.length == 1, 'Image is required.'),
});

type FormData = z.infer<typeof schema>;

function AddSchool() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]);

    const response = await fetch('/api/addSchool', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      router.push('/showSchools');
    } else {
      // Handle error
      console.error('Form submission failed');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">Add New School</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    {...register('address')}
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register('city')}
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    {...register('state')}
                    className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                  />
                  {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input
                    id="contact"
                    type="text"
                    {...register('contact')}
                    className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                  />
                  {errors.contact && <div className="invalid-feedback">{errors.contact.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email_id" className="form-label">
                    Email
                  </label>
                  <input
                    id="email_id"
                    type="email"
                    {...register('email_id')}
                    className={`form-control ${errors.email_id ? 'is-invalid' : ''}`}
                  />
                  {errors.email_id && <div className="invalid-feedback">{errors.email_id.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  {errors.image && <div className="invalid-feedback">{errors.image.message as string}</div>}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Add School
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AddSchool);
