import { useState } from 'react';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-6xl  mb-6 text-center ">--Email Reply Generator-- </h1>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Original Email Content</span>
        </label><br/>
        <textarea
          className="textarea textarea-bordered h-40 w-full "
          placeholder="Paste your email here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        ></textarea>
      </div>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text ">Tone (Optional)</span>
        </label><br/>
        <select
          className="select select-bordered w-full"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">None</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>

      <button
        className={`btn bg-blue-500 w-full ${loading && 'btn-disabled '}`}
        onClick={handleSubmit}
        disabled={!emailContent || loading}
      >
        {loading ? <span className="loading loading-spinner"></span> : "Generate Reply"}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      {generatedReply && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Reply:</h2>
          <textarea
            className="textarea textarea-bordered w-full h-40"
            readOnly
            value={generatedReply}
          ></textarea>
          <button
            className="btn btn-outline btn-secondary mt-3"
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
