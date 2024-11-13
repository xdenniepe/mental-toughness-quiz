/* eslint-disable react/prop-types */
import { useState } from 'react';
import { setLocalStorageItem } from '../services/helper';

const Home = (props) => {
  const { setUserInfo } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const userInfo = {
      firstName,
      lastName,
      email,
    };

    setLocalStorageItem('userInfo', userInfo);

    setUserInfo(userInfo);
    event.target.reset();
  };

  return (
    <div className="main-container">
      <p className="xs:text-3xl sm:text-4xl font-bold text-blue-600 text-center xs:pt-2 sm:py-4">Welcome to Mental Toughness Quiz!</p>
      <div className="sub-container mt-20">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className=" pb-8">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">Let&apos;s Get to Know You</h2>
              <p className="mt-1 sm:text-medium xs:text-sm font-medium leading-6 text-gray-600">Please fill in your details below so we can send you the results of your quiz. It won’t take long, and the insights will be super helpful!</p>

              <div className="flex flex-col mt-10 space-y-5">
                <div className="flex w-full flex-row space-x-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="first-name" className="block text-base font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input id="first-name" name="first-name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="last-name" className="block text-base font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input id="last-name" name="last-name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                    Confirm Email address
                  </label>
                  <div className="mt-2">
                    <input id="confirmEmail" name="confirmEmail" type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-2">
            <button type="submit" className="rounded-[9px] text-[18px] bg-gradient-to-r from-[#1a78c5] to-[#002f80] py-[10px] px-[42px] text-white cursor-pointer disabled:cursor-not-allowed disabled:text-white disabled:bg-gradient-to-r disabled:from-[#e7e8e9] disabled:to-[#e7e8e9]" disabled={email !== confirmEmail || email === '' || confirmEmail === '' || firstName === '' || lastName === ''}>
              <p>Start Quiz</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
