import LoginForm from '../components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-var(--header-height))] h-full'>
      <LoginForm />
    </div>
  );
}
