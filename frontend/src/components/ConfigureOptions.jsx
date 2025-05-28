import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import useConfigureStore from '../store/configureStore';

const smallTalkOptions = [
  { key: 'continuity', labelKey: 'configureOptions.smallTalk.continuity', icon: 'pi pi-refresh' },
  { key: 'motivational', labelKey: 'configureOptions.smallTalk.motivational', icon: 'pi pi-star' },
  { key: 'seasonal', labelKey: 'configureOptions.smallTalk.seasonal', icon: 'pi pi-calendar' },
  { key: 'tech_fact', labelKey: 'configureOptions.smallTalk.tech_fact', icon: 'pi pi-lightbulb' },
];

const difficultyOptions = [
  {
    key: 'moderate',
    labelKey: 'configureOptions.difficulty.level1',
    descKey: 'configureOptions.difficulty.level1Desc',
  },
  {
    key: 'challenging',
    labelKey: 'configureOptions.difficulty.level2',
    descKey: 'configureOptions.difficulty.level2Desc',
  },
  {
    key: 'difficult',
    labelKey: 'configureOptions.difficulty.level3',
    descKey: 'configureOptions.difficulty.level3Desc',
  },
];

const ConfigureOptions = ({ onPrevStep, onNextStep }) => {
  const { t } = useTranslation();
  const { selectedSmallTalk, selectedDifficulty, setSelectedSmallTalk, setSelectedDifficulty } =
    useConfigureStore();

  return (
    <div className="container" style={{ height: '100%' }}>
      <div
        className="p-3 mb-4 border-round bg-pink-100 text-pink-900 flex align-items-center gap-2"
        style={{ border: '1px solid #e57373' }}
      >
        <i className="pi pi-exclamation-triangle mr-2" />
        <span>
          <b>{t('configureOptions.forInternalTesting')}</b>
        </span>
      </div>

      <div className="grid">
        {/* Small Talk Section */}
        <div className="col-12 md:col-6">
          <h2 className="mb-2">{t('configureOptions.selectSmallTalk')}</h2>
          <p className="mb-4">{t('configureOptions.chooseSmallTalk')}</p>
          <div className="grid">
            {smallTalkOptions.map(option => (
              <div key={option.key} className="col-12 sm:col-6 mb-3">
                <Card
                  className={classNames(
                    'cursor-pointer transition-colors',
                    selectedSmallTalk === option.key
                      ? 'border-red-500 bg-pink-50'
                      : 'border-gray-200'
                  )}
                  style={{ minHeight: '70px', borderWidth: 2 }}
                  onClick={() => setSelectedSmallTalk(option.key)}
                >
                  <div className="flex align-items-center gap-2">
                    <i className={option.icon} style={{ fontSize: '1.5rem' }} />
                    <span className="font-medium">{t(option.labelKey)}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Section */}
        <div className="col-12 md:col-6">
          <h2 className="mb-2">{t('configureOptions.selectDifficulty')}</h2>
          <p className="mb-4">{t('configureOptions.chooseDifficulty')}</p>
          <div className="flex flex-column gap-3">
            {difficultyOptions.map(option => (
              <Card
                key={option.key}
                className={classNames(
                  'cursor-pointer transition-colors',
                  selectedDifficulty === option.key
                    ? 'border-red-500 bg-pink-50'
                    : 'border-gray-200'
                )}
                style={{ minHeight: '70px', borderWidth: 2 }}
                onClick={() => setSelectedDifficulty(option.key)}
              >
                <div className="flex flex-column">
                  <span className="font-medium mb-1">{t(option.labelKey)}</span>
                  <span className="text-sm text-gray-600">{t(option.descKey)}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-content-center align-items-center px-4 py-5 mt-4">
        <div className="flex w-full" style={{ maxWidth: '600px' }}>
          <Button
            label={t('common.previous')}
            icon="pi pi-arrow-left"
            onClick={onPrevStep}
            className="p-button-outlined p-button-secondary flex-1 border-round-left"
            style={{
              height: '48px',
              fontSize: '16px',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          />
          <Button
            label={t('common.next')}
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={onNextStep}
            className="p-button flex-1 border-round-right bg-red-600"
            style={{
              height: '48px',
              fontSize: '16px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderColor: '#e57373',
            }}
            disabled={!selectedSmallTalk || !selectedDifficulty}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigureOptions;
