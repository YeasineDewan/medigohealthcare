import { useState } from 'react';
import FileUpload from './FileUpload';
import { Button } from './Button';

export default function ImageUploadTest() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleTest = () => {
    console.log('Single file:', singleFile);
    console.log('Multiple files:', multipleFiles);
    setShowResults(true);
  };

  const handleReset = () => {
    setSingleFile(null);
    setMultipleFiles([]);
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">File Upload Test</h1>
        <p className="text-gray-600">Test the file upload functionality with different file types</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Single File Upload */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Single File Upload</h2>
          <FileUpload
            value={singleFile}
            onChange={setSingleFile}
            accept="image/*,.pdf,.doc,.docx"
            maxSize={5 * 1024 * 1024}
            placeholder="Upload a single file"
          />
        </div>

        {/* Multiple Files Upload */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Multiple Files Upload</h2>
          <FileUpload
            value={multipleFiles}
            onChange={setMultipleFiles}
            accept="image/*,.pdf"
            maxSize={10 * 1024 * 1024}
            multiple={true}
            placeholder="Upload multiple files"
          />
        </div>
      </div>

      {/* Test Controls */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleTest} disabled={!singleFile && multipleFiles.length === 0}>
          Test Upload
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Single File:</h4>
              <pre className="bg-white p-3 rounded border text-sm overflow-auto">
                {singleFile ? JSON.stringify({
                  name: singleFile.name,
                  size: singleFile.size,
                  type: singleFile.type,
                  lastModified: singleFile.lastModified
                }, null, 2) : 'No file uploaded'}
              </pre>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Multiple Files:</h4>
              <pre className="bg-white p-3 rounded border text-sm overflow-auto max-h-48">
                {multipleFiles.length > 0 
                  ? JSON.stringify(multipleFiles.map(f => ({
                      name: f.name,
                      size: f.size,
                      type: f.type
                    })), null, 2)
                  : 'No files uploaded'
                }
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">How to Test:</h3>
        <ol className="text-blue-800 space-y-2 text-sm">
          <li>1. Try uploading different file types (images, PDFs, documents)</li>
          <li>2. Test file size validation by uploading large files</li>
          <li>3. Test drag and drop functionality</li>
          <li>4. Test multiple file selection</li>
          <li>5. Verify file previews work correctly</li>
          <li>6. Test removing files after upload</li>
        </ol>
      </div>
    </div>
  );
}
