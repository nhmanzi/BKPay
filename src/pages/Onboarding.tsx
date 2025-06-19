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
  merchantCode: string;
}

const steps = [
  'Business Name',
  'Link Account',
  'Merchant Code',
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
  const [merchantCodeStatus, setMerchantCodeStatus] = useState<'available' | 'taken' | null>(null);
  const [isCheckingMerchantCode, setIsCheckingMerchantCode] = useState(false);
  const navigate = useNavigate();
  const totalSteps = 5;
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Watch ID number for Step 2
  const idNumber = watch('idNumber');

  // Watch merchant code for validation
  const merchantCode = watch('merchantCode');

  // Simulate fetching accounts when ID number is 8 digits
  React.useEffect(() => {
    if (step === 2 && idNumber && idNumber.length === 16 && /^\d{16}$/.test(idNumber)) {
      setIsLoadingAccounts(true);
      setAccounts([]);
      setSelectedAccount('');
      setValue('accountNumber', '');
      setTimeout(() => {
        // Simulate fetched accounts
        setAccounts([
          '1001123456 (Individual Current Account)',
          '1006543821 (Special Savings Account)',
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

  // Validate merchant code
  React.useEffect(() => {
    if (step === 3 && merchantCode && merchantCode.length >= 6 && merchantCode.length <= 8) {
      setIsCheckingMerchantCode(true);
      setMerchantCodeStatus(null);
      
      // Simulate API call to check merchant code
      setTimeout(() => {
        if (merchantCode === '11333356') {
          setMerchantCodeStatus('taken');
        } else {
          setMerchantCodeStatus('available');
        }
        setIsCheckingMerchantCode(false);
      }, 500);
    } else if (step === 3) {
      setMerchantCodeStatus(null);
    }
  }, [merchantCode, step]);

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
        valid = await trigger('merchantCode') && merchantCodeStatus === 'available';
        break;
      case 4:
        valid = await trigger(['email', 'password', 'confirmPassword']);
        break;
      case 5:
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
        setValue('merchantCode', '');
        setMerchantCodeStatus(null);
      } else if (step === 3) {
        setValue('email', '');
        setValue('password', '');
        setValue('confirmPassword', '');
      } else if (step === 4) {
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
        name: 'Kevin Rutayisire',
        email: 'kevinrutayisire@gmail.com',
        role: 'merchant',
        businessName: 'Profit Prophets',
        merchantCode: data.merchantCode,
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
                maxLength={40}
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
                maxLength={16}
                {...register('idNumber', {
                  required: 'ID number is required',
                  pattern: { value: /^\d{16}$/, message: 'ID number must be 16 digits' },
                })}
                className="input w-full"
                placeholder="16 digit ID Number"
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
            <h3 className="text-2xl font-semibold text-gray-900">Enter your merchant code</h3>
            <div>
              <label htmlFor="merchantCode" className="block text-sm font-medium text-gray-700 mb-1">
                Merchant Code (6-8 characters)
              </label>
              <div className="relative flex items-center gap-2">
                <input
                  id="merchantCode"
                  type="text"
                  maxLength={8}
                  {...register('merchantCode', {
                    required: 'Merchant code is required',
                    minLength: { value: 6, message: 'Merchant code must be at least 6 characters' },
                    maxLength: { value: 8, message: 'Merchant code must not exceed 8 characters' },
                    pattern: {
                      value: /^[A-Z0-9]*$/,
                      message: 'Merchant code must contain only uppercase letters and numbers',
                    },
                    validate: value => {
                      if (value === '11333356') {
                        return 'This merchant code is already taken';
                      }
                      return true;
                    }
                  })}
                  className={`input w-full ${merchantCode === '11333356' ? 'border-error-300' : merchantCode?.length >= 6 && merchantCode?.length <= 8 ? 'border-success-300' : ''}`}
                  placeholder="Enter merchant code (6-8 characters)"
                />
                <button
                  type="button"
                  className="btn btn-outline px-2 py-1 text-xs whitespace-nowrap"
                  onClick={() => {
                    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
                    setValue('merchantCode', randomCode, { shouldValidate: true });
                  }}
                >
                  Generate
                </button>
                {isCheckingMerchantCode && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
                  </div>
                )}
              </div>
              {errors.merchantCode && (
                <p className="mt-1 text-sm text-error-600">{errors.merchantCode.message}</p>
              )}
              {!errors.merchantCode && merchantCode?.length >= 6 && merchantCode?.length <= 8 && (
                <p className={`mt-1 text-sm ${merchantCode === '11333356' ? 'text-error-600' : 'text-success-600'}`}>
                  {merchantCode === '11333356' ? 'This merchant code is already taken' : 'Merchant code is available'}
                </p>
              )}
            </div>
          </div>
        );
      case 4:
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
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  })}
                  className="input w-full pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match',
                  })}
                  className="input w-full pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Enter OTP sent on your email</h3>
            <div>
           
              <div className="flex space-x-2 lg:space-x-8 justify-left mt-2">
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
      {/* Desktop Progress */}
      <div className="hidden md:flex justify-between items-center">
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

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">Step {step} of {totalSteps}</span>
          </div>
          <span className="text-sm font-medium text-primary-600">{steps[step - 1]}</span>
        </div>
        <div className="relative">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div 
              style={{ width: `${(step / totalSteps) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx + 1 <= step ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between w-full max-w-[40rem] mx-auto px-4 sm:px-6">
      {/* Top logo and title */}
      <div className="w-full flex flex-col items-center pt-6 sm:pt-12">
        <div className="flex items-center mb-4 sm:mb-6">
          <span className="text-primary-600 font-bold rounded-full px-3 py-1 text-2xl mr-2">
            <img src={BKPayLogo} alt="BKPay Logo" className="h-10 sm:h-12 w-auto" />
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-2 text-center">Become a merchant</h1>
        {renderProgress()}
      </div>
      {/* Form section */}
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        <div className="w-full">
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
                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-md bg-primary-600 text-white font-medium text-base hover:bg-primary-700 transition-colors shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="w-full text-center py-6 sm:py-10">
        <p className="text-gray-500 text-sm sm:text-base">
          Already a merchant ?{' '}
          <a href="/login" className="text-primary-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;