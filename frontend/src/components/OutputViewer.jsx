import React from 'react';

function OutputViewer({ generatedPrompt, outputFiles, onViewOutput }) {
  return (
    <div>
      <div className="card">
        <h2>Generated Prompt</h2>
        {generatedPrompt ? (
          <div className="prompt-preview">{generatedPrompt}</div>
        ) : (
          <p>No prompt generated yet. Select components and click "Generate Prompt".</p>
        )}
      </div>

      <div className="card">
        <h2>Saved Prompts</h2>
        {outputFiles.length > 0 ? (
          <ul className="output-list">
            {outputFiles.map(file => (
              <li key={file} onClick={() => onViewOutput(file)}>
                {file}
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved prompts found.</p>
        )}
      </div>
    </div>
  );
}

export default OutputViewer;
