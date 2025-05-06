import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Check, CreditCard, Building, Map, Phone, Mail, Users, ChevronRight, Loader2 } from 'lucide-react';

interface OnboardingFormData {
  businessType: string;
  businessCategory: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  taxId: string;
}

const Onboarding = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<OnboardingFormData>();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const totalSteps = 4;
  
  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, totalSteps));
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
    
    // Redirect to dashboard on success
    navigate('/dashboard');
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Business Information</h3>
            <p className="text-gray-600">Let's get to know your business better</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select
                  id="businessType"
                  {...register('businessType', { required: 'Business type is required' })}
                  className="input w-full"
                >
                  <option value="">Select business type</option>
                  <option value="sole-proprietor">Sole Proprietor</option>
                  <option value="llc">Limited Liability Company (LLC)</option>
                  <option value="partnership">Partnership</option>
                  <option value="corporation">Corporation</option>
                  <option value="non-profit">Non-profit</option>
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-sm text-error-600">{errors.businessType.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Category
                </label>
                <select
                  id="businessCategory"
                  {...register('businessCategory', { required: 'Business category is required' })}
                  className="input w-full"
                >
                  <option value="">Select business category</option>
                  <option value="retail">Retail</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="service">Professional Services</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessCategory && (
                  <p className="mt-1 text-sm text-error-600">{errors.businessCategory.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax ID (EIN)
                </label>
                <input
                  id="taxId"
                  type="text"
                  {...register('taxId', { required: 'Tax ID is required' })}
                  className="input w-full"
                  placeholder="XX-XXXXXXX"
                />
                {errors.taxId && (
                  <p className="mt-1 text-sm text-error-600">{errors.taxId.message}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Business Address</h3>
            <p className="text-gray-600">Where is your business located?</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register('address', { required: 'Address is required' })}
                  className="input w-full"
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-error-600">{errors.address.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register('city', { required: 'City is required' })}
                    className="input w-full"
                    placeholder="San Francisco"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-error-600">{errors.city.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    className="input w-full"
                    placeholder="CA"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-error-600">{errors.state.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  id="zip"
                  type="text"
                  {...register('zip', { required: 'ZIP code is required' })}
                  className="input w-full"
                  placeholder="94103"
                />
                {errors.zip && (
                  <p className="mt-1 text-sm text-error-600">{errors.zip.message}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            <p className="text-gray-600">How can customers reach your business?</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="input w-full"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Website
                </label>
                <input
                  id="website"
                  type="text"
                  {...register('website')}
                  className="input w-full"
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Choose Your Plan</h3>
            <p className="text-gray-600">Select the plan that works best for your business</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Starter</h4>
                      <p className="text-sm text-gray-500">For small businesses</p>
                    </div>
                    <input 
                      type="radio" 
                      name="plan" 
                      value="starter" 
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300"
                      defaultChecked
                    />
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">RWF 37,700</span>
                    <span className="text-gray-600 ml-1">/mo</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">2.9% + 30¢ per transaction</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Basic analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Up to 100 transactions/mo</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-2 border-primary-500 rounded-lg p-6 shadow-md relative">
                  <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Professional</h4>
                      <p className="text-sm text-gray-500">For growing businesses</p>
                    </div>
                    <input 
                      type="radio" 
                      name="plan" 
                      value="professional" 
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">RWF 102,700</span>
                    <span className="text-gray-600 ml-1">/mo</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">2.5% + 30¢ per transaction</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Up to 1,000 transactions/mo</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Enterprise</h4>
                      <p className="text-sm text-gray-500">For large businesses</p>
                    </div>
                    <input 
                      type="radio" 
                      name="plan" 
                      value="enterprise" 
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">RWF 258,700</span>
                    <span className="text-gray-600 ml-1">/mo</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">2.2% + 30¢ per transaction</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Premium analytics & reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Unlimited transactions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">24/7 dedicated support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-success-500 mr-2 shrink-0" />
                      <span className="text-sm">Custom integrations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Building className="h-5 w-5" />
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Map className="h-5 w-5" />
            </div>
            <div className={`h-1 w-12 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Phone className="h-5 w-5" />
            </div>
            <div className={`h-1 w-12 ${step >= 4 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="flex items-center justify-center w-10 h-10 rounded-full ${
            step >= 4 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }">
            <Users className="h-5 w-5" />
          </div>
        </div>
        
        <div className="flex justify-between mt-2 px-1 text-xs text-gray-600">
          <span>Business Info</span>
          <span>Address</span>
          <span>Contact</span>
          <span>Plan</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}
          
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Finishing setup...
                </>
              ) : step < totalSteps ? (
                <>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Complete Setup'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Need help? <a href="#" className="text-primary-600 hover:text-primary-700">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;