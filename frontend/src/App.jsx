import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import ProductSelection from './components/ProductSelection';
import PersonaCarousel from './components/PersonaCarousel';
import ProgressSteps from './components/ProgressSteps';
import { useWizard } from './hooks/useWizard';
import ConfigureOptions from './components/ConfigureOptions';
import Review from './components/Review';
import GeneratedPrompt from './components/GeneratedPrompt';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import useProductStore from './store/productStore';
import usePersonaStore from './store/personaStore';
import useConfigureStore from './store/configureStore';

// Set up axios with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000', // Explicitly set the base URL
  timeout: 5000, // 5 second timeout
});

function AppContent({ setGeneratedPrompt, generatedPrompt }) {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [smalltalks, setSmalltalks] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const { selectedProduct } = useProductStore();
  const { selectedPersona, setSelectedPersona } = usePersonaStore();
  const { selectedSmallTalk, selectedDifficulty } = useConfigureStore();
  const [outputFiles, setOutputFiles] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'online', 'offline', 'unknown'
  const navigate = useNavigate();

  const { currentStep, nextStep, prevStep, isFirstStep, isLastStep } = useWizard(4);

  const checkApiHealth = async () => {
    try {
      await api.get('/api/health');
      setApiStatus('online');
      return true;
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus('offline');
      setMessage({
        text: t('messages.backendError'),
        type: 'error',
      });
      return false;
    }
  };

  // Fetch available prompts
  const fetchPrompts = async () => {
    try {
      setLoading(true);

      // First check if API is available
      const isHealthy = await checkApiHealth();
      if (!isHealthy) {
        setLoading(false);
        setInitialLoading(false);
        return;
      }

      console.log('Fetching prompts from API...');
      const response = await api.get('/api/prompts');
      console.log('Received prompts data:', response.data);

      const { products, personas, smalltalks, difficulty } = response.data;

      setProducts(products);
      setPersonas(personas);
      setSmalltalks(smalltalks);
      setDifficulty(difficulty);

      // Clear any error messages
      setMessage({ text: '', type: '' });
    } catch (error) {
      console.error('Error fetching prompts:', error);

      // Extract the specific error message if available
      let errorMsg = t('messages.errorFetching');
      if (error.response && error.response.data && error.response.data.error) {
        errorMsg = `Error: ${error.response.data.error}`;
      }

      setMessage({
        text: errorMsg,
        type: 'error',
      });
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Fetch output files
  const fetchOutputs = async () => {
    try {
      const response = await api.get('/api/outputs');
      setOutputFiles(response.data.outputs);
    } catch (error) {
      console.error('Error fetching outputs:', error);
      // Don't show error message for this one to avoid UI clutter
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchPrompts();
    // Also fetch output files on initial load
    fetchOutputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate prompt
  const handleGeneratePrompt = async promptOrder => {
    if (!selectedProduct || !selectedPersona || !selectedSmallTalk || !selectedDifficulty) {
      setMessage({
        text: t('messages.selectAll'),
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      console.log('🚀 ~ AppContent ~ promptOrder:', promptOrder);
      console.log('🚀 ~ AppContent ~ selectedDifficulty:', selectedDifficulty);
      console.log('🚀 ~ AppContent ~ selectedSmallTalk:', selectedSmallTalk);
      console.log('🚀 ~ AppContent ~ selectedPersona:', selectedPersona.id);
      console.log('🚀 ~ AppContent ~ selectedProduct:', selectedProduct.id);
      const response = await api.post('/api/generate', {
        product: selectedProduct.id,
        persona: selectedPersona.id,
        smalltalk: selectedSmallTalk,
        difficulty: selectedDifficulty,
        promptOrder: promptOrder
          ? promptOrder.map(item => item.id)
          : ['product', 'persona', 'smalltalk', 'difficulty'],
      });

      console.log('🚀 ~ AppContent ~ response:', response);

      // First set the generated prompt
      setGeneratedPrompt(response.data.content);

      // Then show success message
      setMessage({
        text: `${t('messages.promptGenerated')} ${response.data.filename}`,
        type: 'success',
      });

      // Refresh the output files list
      await fetchOutputs();

      // Only navigate after everything is set
      setTimeout(() => {
        navigate('/generated');
      }, 100);
    } catch (error) {
      console.error('Error generating prompt:', error);

      let errorMsg = t('messages.errorGenerating');
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      }

      setMessage({
        text: errorMsg,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // View a specific output file
  const handleViewOutput = async filename => {
    try {
      setLoading(true);
      const response = await api.get(`/api/output/${filename}`);
      setGeneratedPrompt(response.data.content);
      setMessage({ text: `${t('messages.loaded')} ${filename}`, type: 'success' });
    } catch (error) {
      console.error('Error loading output file:', error);

      // Extract the specific error message if available
      let errorMsg = t('messages.errorLoading');
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      }

      setMessage({
        text: errorMsg,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ProductSelection onNextStep={nextStep} />;
      case 1:
        return (
          <PersonaCarousel
            onNextStep={nextStep}
            onPrevStep={prevStep}
            setSelectedPersona={setSelectedPersona}
          />
        );
      case 2:
        return <ConfigureOptions onNextStep={nextStep} onPrevStep={prevStep} />;
      case 3:
        return <Review onPrevStep={prevStep} onGeneratePrompt={handleGeneratePrompt} />;
      default:
        return <ProductSelection onNextStep={nextStep} />;
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ProgressSpinner style={{ width: '50px', height: '50px' }} />
        <div className="ml-3">{t('messages.loading')}</div>
      </div>
    );
  }

  // Update steps based on currentStep
  const steps = [
    { number: 1, label: t('steps.product'), active: currentStep === 0 },
    { number: 2, label: t('steps.persona'), active: currentStep === 1 },
    { number: 3, label: t('steps.options'), active: currentStep === 2 },
    { number: 4, label: t('steps.review'), active: currentStep === 3 },
  ];

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
      <Header />
      <div className="px-7 py-4 overflow-y-auto">
        <ProgressSteps steps={steps} />
        {renderStepContent()}
      </div>
    </div>
  );
}

function App() {
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppContent setGeneratedPrompt={setGeneratedPrompt} generatedPrompt={generatedPrompt} />
          }
        />
        <Route
          path="/generated"
          element={
            <GeneratedPrompt
              prompt={generatedPrompt}
              onStartOver={() => {
                setGeneratedPrompt('');
                window.location.href = '/';
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
