import AuthForm from '@/components/auth-form';

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
      </div>
      <AuthForm />
    </main>
  );
}