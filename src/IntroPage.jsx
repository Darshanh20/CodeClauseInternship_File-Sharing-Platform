import { useNavigate } from 'react-router-dom';

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-5xl font-bold mb-4 flex justify-center text-blue-600">ShareEZ</h1>
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Anonymous File Share</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl">
        Share your files securely and anonymously. Just upload a file, generate a password, and get a secure link you can share with anyone.
        No sign-up, no fuss — simply upload, protect, and share.
      </p>
      <button
        onClick={() => navigate('/app')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Upload & Share
      </button>
    </div>
  );
}
