import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import bcrypt from 'bcryptjs';

function FileAccess() {
  const { id } = useParams(); 
  const [fileData, setFileData] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setError("File not found.");
      } else {
        setFileData(data);
      }
    };

    fetchFile();
  }, [id]);

  const handleVerify = async () => {
    if (!fileData) return;

    if (fileData.expiry_time && new Date(fileData.expiry_time) < new Date()) {
      setError('This link has expired.');
      return;
    }

    if (fileData.password) {
      const match = await bcrypt.compare(passwordInput, fileData.password);
      if (!match) {
        setError('Incorrect password.');
        return;
      }
    }

    setIsUnlocked(true);
  };

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!fileData) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto text-white text-center flex flex-col gap-4">
      <h1 className="text-5xl font-bold mb-4 flex justify-center text-blue-600">ShareEZ</h1>

      <h1 className="text-xl font-bold text-amber-400">Access File</h1>
      <p>Enter the password you received to access and download the shared file securely</p>

      {!isUnlocked ? (
        <>
          {fileData.password && (
            <>
              <input
                type="password"
                placeholder="Enter password"
                onChange={e => setPasswordInput(e.target.value)}
                className="border px-2 py-1 w-full mb-2"
              />
            </>
          )}
          <button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Unlock File
          </button>
        </>
      ) : (
        <div className="mt-4">
          <p>Download your file:</p>
          <a
            href={fileData.public_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-400 transition-colors"
          >
            {fileData.filename}
          </a>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>  }
    </div>
  );
}

export default FileAccess;
