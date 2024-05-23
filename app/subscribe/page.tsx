'use client'
import { useState } from 'react';
import Header from '@/componets/navbar';
import Footer from '@/componets/footer';
import { CalendarIcon, AddIcon } from '@chakra-ui/icons';

export default function Example() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<string | null>(null); // Change alert type to string

  const handleSubscribe = () => {
    if (email.includes('@') && email.includes('.com')) {
      // Perform subscription logic
      console.log('Subscribed with email:', email);
      setAlert('you have successfully subscribed to our newsfeed ✅');
    } else {
      setAlert('Invalid email format. Please enter a valid email address ❌.'); // Set error message directly
    }
  };

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="bg-gray-400 w-full h-400 justify-center py-24 sm:py-32"></div>
      </div>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Subscribe to Liwonde Private Hospital Newsletter
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Stay updated with the latest news, events, and health tips from Liwonde Private Hospital.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="flex-none rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
              {alert && (
                <p className={`mt-2 text-sm ${alert.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                  {alert}
                </p>
              )}
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">Weekly Health Articles</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Get insightful articles on healthcare, wellness, and medical advancements delivered weekly.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <AddIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">No Spam Policy</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  We respect your privacy. You will only receive relevant information and updates from us.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
