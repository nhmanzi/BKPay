import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Check, CreditCard, Building, Map, Phone, Mail, Users, ChevronRight, Loader2, Lock, Key } from 'lucide-react';
const BKPayLogo = '/assets/BKPAY.svg';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingFormData {
  businessName: string;
  idNumber: string;
  accountNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

const steps = [
  'Business Name',
  'Link Account',
  'Set Password',
  'OTP Verification',
];

const Onboarding = () => {
  const { register, handleSubmit, formState: { errors }, watch, trigger, setValue } = useForm<OnboardingFormData>();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const navigate = useNavigate();
  const totalSteps = 4;
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { register: registerUser } = useAuth();

  // Watch ID number for Step 2
  const idNumber = watch('idNumber');

  // Simulate fetching accounts when ID number is 8 digits
  React.useEffect(() => {
    if (step === 2 && idNumber && idNumber.length === 8 && /^\d{8}$/.test(idNumber)) {
      setIsLoadingAccounts(true);
      setAccounts([]);
      setSelectedAccount('');
      setValue('accountNumber', '');
      setTimeout(() => {
        // Simulate fetched accounts
        setAccounts([
          'BK-001-123456',
          'BK-002-654321',
          'BK-003-789012',
        ]);
        setIsLoadingAccounts(false);
      }, 1500);
    } else if (step === 2) {
      setAccounts([]);
      setSelectedAccount('');
      setValue('accountNumber', '');
    }
  }, [idNumber, step, setValue]);

  // When step changes, reset OTP digits if not on step 4
  React.useEffect(() => {
    if (step !== 4) setOtpDigits(['', '', '', '', '', '']);
  }, [step]);

  // Combine OTP digits for validation and submission
  React.useEffect(() => {
    if (step === 4) {
      setValue('otp', otpDigits.join(''));
    }
  }, [otpDigits, setValue, step]);

  const nextStep = async () => {
    // Validate current step before proceeding
    let valid = false;
    switch (step) {
      case 1:
        valid = await trigger('businessName');
        break;
      case 2:
        valid = await trigger(['idNumber', 'accountNumber']);
        break;
      case 3:
        valid = await trigger(['email', 'password', 'confirmPassword']);
        break;
      case 4:
        valid = await trigger('otp');
        break;
      default:
        valid = true;
    }
    if (valid && step < totalSteps) {
      // Clear state/fields for next step
      if (step === 1) {
        setValue('idNumber', '');
        setValue('accountNumber', '');
        setAccounts([]);
        setSelectedAccount('');
      } else if (step === 2) {
        setValue('email', '');
        setValue('password', '');
        setValue('confirmPassword', '');
      } else if (step === 3) {
        setOtpDigits(['', '', '', '', '', '']);
        setValue('otp', '');
      }
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: OnboardingFormData) => {
    if (step < totalSteps) {
      nextStep();
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Register/authenticate the user
    await registerUser({
        name: 'Ngabo Bright',
        email: 'ngabo@gmail.com',
        role: 'merchant',
        businessName: 'KGL fits store',
        password: data.password
    });
    // Redirect to dashboard on success
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Tell us about your company name</h3>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                {...register('businessName', { required: 'Business name is required' })}
                className="input w-full"
                placeholder="Eg. Manzi Shop"
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-error-600">{errors.businessName.message}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Let's help you to link up your account</h3>
      
            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                id="idNumber"
                type="text"
                maxLength={8}
                {...register('idNumber', {
                  required: 'ID number is required',
                  pattern: { value: /^\d{8}$/, message: 'ID number must be 8 digits' },
                })}
                className="input w-full"
                placeholder="8 digit ID Number"
                autoComplete="off"
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-error-600">{errors.idNumber.message}</p>
              )}
            </div>
            {/* Loader and Account Selection */}
            {isLoadingAccounts && (
              <div className="flex items-center space-x-2 mt-4 text-primary-600">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Fetching accounts...</span>
              </div>
            )}
            {!isLoadingAccounts && accounts.length > 0 && (
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Account</label>
                {accounts.map(acc => (
                  <label key={acc} className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer mb-2 transition-colors ${selectedAccount === acc ? 'border-primary-600 bg-primary-50' : 'border-gray-200 bg-white hover:border-primary-300'}`}>
                    <input
                      type="radio"
                      name="accountNumber"
                      value={acc}
                      checked={selectedAccount === acc}
                      onChange={() => {
                        setSelectedAccount(acc);
                        setValue('accountNumber', acc, { shouldValidate: true });
                      }}
                      className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-900">{acc}</span>
                  </label>
                ))}
                {errors.accountNumber && (
                  <p className="mt-1 text-sm text-error-600">{errors.accountNumber.message}</p>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Set and confirm your password</h3>
          
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="input w-full"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
                className="input w-full"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === watch('password') || 'Passwords do not match',
                })}
                className="input w-full"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Enter OTP sent on your email</h3>
            <div>
           
              <div className="flex space-x-8 justify-left mt-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => (otpRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={`w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.otp ? 'border-error-300' : 'border-gray-300'}`}
                    value={digit}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (!val) return;
                      const newDigits = [...otpDigits];
                      newDigits[idx] = val;
                      setOtpDigits(newDigits);
                      if (val && idx < 5) {
                        otpRefs.current[idx + 1]?.focus();
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Backspace') {
                        if (otpDigits[idx]) {
                          const newDigits = [...otpDigits];
                          newDigits[idx] = '';
                          setOtpDigits(newDigits);
                        } else if (idx > 0) {
                          otpRefs.current[idx - 1]?.focus();
                        }
                      } else if (e.key.match(/^[0-9]$/)) {
                        // Allow only numeric
                      } else if (e.key.length === 1) {
                        e.preventDefault();
                      }
                    }}
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="mt-2 text-sm text-error-600 text-center">{errors.otp.message}</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Progress indicator
  const renderProgress = () => (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-10">
      <div className="flex justify-between items-center">
        {steps.map((label, idx) => {
          const isActive = step === idx + 1;
          const isCompleted = step > idx + 1;
          return (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className="relative flex flex-col items-center w-full">
                <span className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 text-base font-semibold
                  ${isActive ? 'border-primary-600 bg-primary-600 text-white' : isCompleted ? 'border-primary-200 bg-primary-100 text-primary-600' : 'border-gray-300 bg-white text-gray-400'}`}
                >
                  {idx + 1}
                </span>
                <span className={`mt-2 text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-400'}`}>{label}</span>
                {/* Progress bar */}
                {idx < steps.length - 1 && (
                  <div className="absolute top-4 left-full w-full h-1 flex items-center">
                    <div className={`h-1 w-full ml-[-50%] ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between w-[30rem]">
      {/* Top logo and title */}
      <div className="w-full flex flex-col items-center pt-12">
        <div className="flex items-center mb-6">
          <span className=" text-primary-600 font-bold rounded-full px-3 py-1 text-2xl mr-2">
            <img src={BKPayLogo} alt="BKPay Logo" className="h-12 w-auto" />
          </span>

        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">Become a merchant</h1>
        {renderProgress()}
      </div>
      {/* Form section */}
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            {renderStep()}
            <div className="mt-8 flex justify-end">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline mr-4"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="px-8 py-3 rounded-md bg-primary-600 text-white font-medium text-base hover:bg-primary-700 transition-colors shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || (step === 2 && (!selectedAccount || isLoadingAccounts))}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Finishing setup...
                  </>
                ) : step < totalSteps ? (
                  <>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'Complete Setup'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Bottom link */}
      <div className="w-full text-center pb-10">
        <p className="text-gray-500 text-base">
          Already a merchant ?{' '}
          <a href="/login" className="text-primary-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;