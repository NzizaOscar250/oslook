import React, { useState, useRef } from 'react';

const FileUpload = ({handleFileChange,setFileBase64, handleHiddenInputClick}) => {
  const [fileBase64, setFileBase64] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // `reader.result` contains the base64-encoded file data
        setFileBase64(reader.result);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleHiddenInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Visible label */}
      <label onClick={handleHiddenInputClick} style={{ cursor: 'pointer' }}>
        Select File
      </label>

      {fileBase64 && (
        <div>
          <p>Base64 Encoded Data:</p>
          <textarea value={fileBase64} readOnly rows={10} cols={30} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
