import { Header } from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { AuthTabs } from './components/auth/AuthTabs';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { UniversityDashboard } from './components/dashboard/UniversityDashboard';
import { VerifierDashboard } from './components/dashboard/VerifierDashboard';
import { useAuth } from './context/AuthContext';

function MainContent() {
  const { user } = useAuth();

  return (
    <main className="bg-white">
      {!user ? (
        <div className="container mx-auto py-12 px-6">
          <section id="hero" className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Secure Academic Credentials on the Blockchain
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Effortlessly issue, manage, and verify academic certificates with blockchain technology.
            </p>
          </section>
          <div className="bg-gray-50 shadow-lg rounded-lg p-8">
            <AuthTabs />
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-12 px-6">
          {user.role === 'student' && <StudentDashboard />}
          {user.role === 'university' && <UniversityDashboard />}
          {user.role === 'verifier' && <VerifierDashboard />}
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <MainContent />
        <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} CertChain. All rights reserved.</p>
            <p className="text-xs mt-2">
              Designed for professionals and institutions seeking reliable academic credential solutions.
            </p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
