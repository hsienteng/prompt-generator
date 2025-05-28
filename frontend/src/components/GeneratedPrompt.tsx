import React, { useRef, useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Header from './Header';

interface GeneratedPromptProps {
  prompt: string;
  onStartOver?: () => void;
}

const GeneratedPrompt = ({ prompt, onStartOver }: GeneratedPromptProps) => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [editorValue, setEditorValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (prompt) {
      setEditorValue(prompt);
      setLoading(false);
    } else {
      // If no prompt is available, redirect back to home
      navigate('/');
    }
  }, [prompt, navigate]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      toast.current?.show({
        severity: 'success',
        summary: 'Copied',
        detail: 'Prompt copied to clipboard!',
        life: 2000,
      });
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: 'Copy Failed',
        detail: 'Could not copy to clipboard.',
        life: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ProgressSpinner style={{ width: '50px', height: '50px' }} />
        <div className="ml-3">Loading prompt...</div>
      </div>
    );
  }

  return (
    <div
      className="app-container"
      style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toast ref={toast} position="top-right" />
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <Header />
      </div>
      <div className="px-7 py-4 overflow-y-auto" style={{ flex: 1 }}>
        <Card className="mb-4 shadow-2">
          <div className="flex align-items-center gap-2 mb-3">
            <i className="pi pi-bolt text-2xl text-red-500" />
            <span className="font-bold text-xl">Generated Prompt</span>
          </div>
          <Editor
            height="60vh"
            defaultLanguage="markdown"
            value={editorValue}
            onChange={value => setEditorValue(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
            }}
          />
        </Card>
        <div
          className="flex justify-content-between mt-4"
          style={{ maxWidth: 600, margin: '0 auto' }}
        >
          <Button
            label="Start Over"
            icon="pi pi-refresh"
            className="p-button-outlined p-button-secondary"
            onClick={onStartOver}
          />
          <Button
            label="Copy"
            icon="pi pi-copy"
            className="p-button-success"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratedPrompt;
