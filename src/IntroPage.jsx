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

      {/* Steps for users */}
      <div className="bg-gray-900 p-6 rounded-lg max-w-xl mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center">How to use ShareEZ</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Select or drag & drop a file to upload.</li>
          <li>Customize your password by including numbers and/or special characters, or use the generated one.</li>
          <li>Set an optional expiry date and time to automatically delete the link after that.</li>
          <li>Click “Upload & Share” to get your secure shareable link.</li>
          <li>Copy the password and share it along with the link to keep your file safe.</li>
        </ol>
      </div>

      <button
        onClick={() => navigate('/app')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Upload & Share
      </button>
    </div>
  );
}
