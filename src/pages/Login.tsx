import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Loader2, Globe } from 'lucide-react';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
const BKPayLogo = '/assets/BKPAY.svg';

interface LoginFormData {
  email: string;
  password: string;
}

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome back',
      signInToAccount: 'Sign in to your merchant account',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      signIn: 'Sign in',
      signingIn: 'Signing in...',
      becomeMerchant: 'Become a merchant?',
      signUp: 'Sign up',
      emailRequired: 'Email is required',
      invalidEmail: 'Invalid email address',
      passwordRequired: 'Password is required',
      passwordMin: 'Password must be at least 6 characters',
    },
    auth: {
      loginFailed: 'Login failed. Please check your credentials and try again.',
      registrationFailed: 'Registration failed. Please try again.',
    },
  },
  rw: {
    translation: {
      welcome: 'Murakaza neza',
      signInToAccount: "Injira muri konti yawe y'ubucuruzi",
      email: 'Imeyili',
      password: "Ijambo ry'ibanga",
      rememberMe: 'Munyibuke',
      forgotPassword: "Wibagiwe ijambo ry'ibanga?",
      signIn: 'Injira',
      signingIn: 'Injira...',
      becomeMerchant: 'Wifuza kuba umucuruzi?',
      signUp: 'Iyandikishe',
      emailRequired: 'Imeyili irakenewe',
      invalidEmail: 'Imeyili siyo',
      passwordRequired: "Ijambo ry'ibanga rirakenewe",
      passwordMin: "Ijambo ry'ibanga rigomba kuba nibura inyuguti 6",
    },
    auth: {
      loginFailed: 'Kwinjira byanze. Nyamuneka reba amakuru winjije wongere ugerageze.',
      registrationFailed: 'Kwiyandikisha byanze. Ongera ugerageze.',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      signInToAccount: 'Connectez-vous à votre compte marchand',
      email: 'E-mail',
      password: 'Mot de passe',
      rememberMe: 'Souviens-toi de moi',
      forgotPassword: 'Mot de passe oublié ?',
      signIn: 'Se connecter',
      signingIn: 'Connexion...',
      becomeMerchant: 'Devenir marchand ?',
      signUp: "S'inscrire",
      emailRequired: "L'e-mail est requis",
      invalidEmail: 'Adresse e-mail invalide',
      passwordRequired: 'Le mot de passe est requis',
      passwordMin: 'Le mot de passe doit comporter au moins 6 caractères',
    },
    auth: {
      loginFailed: 'Échec de la connexion. Veuillez vérifier vos identifiants et réessayer.',
      registrationFailed: 	"Échec de l\'inscription. Veuillez réessayer.",
    },
  },
  sw: {
    translation: {
      welcome: 'Karibu tena',
      signInToAccount: 'Ingia kwenye akaunti yako ya mfanyabiashara',
      email: 'Barua pepe',
      password: 'Nenosiri',
      rememberMe: 'Nikumbuke',
      forgotPassword: 'Umesahau nenosiri?',
      signIn: 'Ingia',
      signingIn: 'Inaingia...',
      becomeMerchant: 'Unataka kuwa mfanyabiashara?',
      signUp: 'Jisajili',
      emailRequired: 'Barua pepe inahitajika',
      invalidEmail: 'Barua pepe si sahihi',
      passwordRequired: 'Nenosiri linahitajika',
      passwordMin: 'Nenosiri lazima liwe na angalau herufi 6',
    },
    auth: {
      loginFailed: 'Kuingia imeshindikana. Tafadhali angalia taarifa zako na ujaribu tena.',
      registrationFailed: 'Usajili umeshindikana. Tafadhali jaribu tena.',
    },
  },
};

// Initialize i18n only once
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'sw', name: 'Swahili', flag: '🇹🇿' }
  ];

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
    }
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Language Selector */}
      <div className="fixed top-16 right-16">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors duration-200"
          >
            <span className="text-sm font-medium flex items-center gap-2">
              <span>{languages.find(lang => lang.code === language)?.flag}</span>
              <span>{languages.find(lang => lang.code === language)?.name}</span>
            </span>
          </button>
          
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageDropdown(false);
                    }}
                    className={`${
                      language === lang.code ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2`}
                    role="menuitem"
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6 w-full">
          <span className=" text-primary-600 font-bold rounded-full px-3 py-1 text-2xl ">
            <img src={BKPayLogo} alt="BKPay Logo" className="h-32 w-auto" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t('welcome')}</h2>
        <p className="mt-2 text-gray-600">{t('signInToAccount')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('email')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: t('emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalidEmail')
                }
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.email ? 'border-error-300 text-error-900 placeholder-error-300 focus:outline-none focus:ring-error-500 focus:border-error-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              } rounded-md shadow-sm focus:outline-none sm:text-sm`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-error-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('password')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register('password', { 
                required: t('passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('passwordMin')
                }
              })}
              className={`block w-full pl-10 pr-10 py-2 border ${
                errors.password ? 'border-error-300 text-error-900 placeholder-error-300 focus:outline-none focus:ring-error-500 focus:border-error-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              } rounded-md shadow-sm focus:outline-none sm:text-sm`}
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
            <p className="mt-2 text-sm text-error-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              {t('rememberMe')}
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              {t('forgotPassword')}
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                {t('signingIn')}
              </>
            ) : (
              t('signIn')
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t('becomeMerchant')}{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            {t('signUp')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;