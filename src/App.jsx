import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import bcrypt from 'bcryptjs';

function App() {
  // Your existing states here ...
  const [file, setFile] = useState(null);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [expiry, setExpiry] = useState('');
  const [shareLink, setShareLink] = useState('');
  const passwordRef = useRef(null);

  // Password generator logic (same as before)
  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (number) str += '0123456789';
    if (characters) str += '!@#$%^&*(){}[]~';

    for (let i = 0; i < 8; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setGeneratedPassword(pass);
  }, [number, characters]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Copy password function
  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(generatedPassword);
  };

  // Handle upload (same as before)
  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');

    const fileExt = file.name.split('.').pop();
    const filePath = `${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) return alert('Upload error: ' + uploadError.message);

    const { data: urlData } = supabase
      .storage
      .from('uploads')
      .getPublicUrl(filePath);

    const hash = generatedPassword ? await bcrypt.hash(generatedPassword, 10) : null;

    const { data, error } = await supabase
      .from('files')
      .insert([{
        filename: file.name,
        storage_path: filePath,
        public_url: urlData.publicUrl,
        password: hash,
        expiry_time: expiry ? new Date(expiry).toISOString() : null,
      }])
      .select();

    if (error) return alert('DB error: ' + error.message);

    setShareLink(`${window.location.origin}/file/${data[0].id}`);
  };

  // Drag & Drop Handlers
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="p-6  mx-auto max-w-4xl flex flex-col gap-5">
      <h1 className="text-5xl font-bold mb-4 flex justify-center text-blue-600">ShareEZ</h1>

      {/* Drag and Drop Area */}
      <form
        onDragEnter={handleDrag}
        onSubmit={e => e.preventDefault()} // prevent submit on form enter key
        className={`mb-4 p-6 border-4 border-dashed rounded cursor-pointer
          ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}  h-50 flex items-center justify-center`}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={e => setFile(e.target.files[0])}
        />
        <label
          htmlFor="fileUpload"
          className="block text-center text-white"
        >
          {file ? (
            <>
              Selected file: <span className="text-yellow-400 font-semibold">{file.name}</span>
            </>
          ) : (
            'Drag & drop your file here or click to select'
          )}
        </label>
      </form>
      <div className="max-w-xl mx-auto flex flex-col gap-4">
        {/* Password Generator */}
        <div className="bg-gray-100 p-4 rounded flex flex-col gap-2 mx-auto max-w-xl">
          <label className="font-bold text-2xl text-center">Generated Password</label>
          <p className='text-red-500'>Please share this password to grant access to the file</p>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              readOnly
              value={generatedPassword}
              ref={passwordRef}
              className="flex-1 border px-2 py-1 rounded text-center"
            />
            <button
              onClick={copyPassword}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <div className="flex gap-6 justify-center">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={number}
                onChange={() => setNumber(prev => !prev)}
              />
              Include Numbers
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={characters}
                onChange={() => setCharacters(prev => !prev)}
              />
              Include Special Characters
            </label>
          </div>
        </div>

        {/* Expiry */}
        <input
          type="datetime-local"
          onChange={e => setExpiry(e.target.value)}
          className="w-full border px-2 py-1 rounded text-white max-w-xl mx-auto"
        />

        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Upload & Share
        </button>
      </div>

      {shareLink && (
          <div className='text-center bg-blue-600 rounded-xl'>
            <p className='text-black-400 font-bold'>Share this link:</p>
            <a
              href={shareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline break-all hover:text-gray-300"
            >
              {shareLink}
            </a>
          </div>
      )}
    </div>
  );
}

export default App;
