import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Reorder } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useProductStore from '../store/productStore';
import usePersonaStore from '../store/personaStore';
import useConfigureStore from '../store/configureStore';

const smallTalkOptions = [
  { key: 'continuity', label: 'configureOptions.smallTalk.continuity', icon: 'pi pi-refresh' },
  { key: 'motivational', label: 'configureOptions.smallTalk.motivational', icon: 'pi pi-star' },
  { key: 'seasonal', label: 'configureOptions.smallTalk.seasonal', icon: 'pi pi-calendar' },
  { key: 'tech_fact', label: 'configureOptions.smallTalk.tech_fact', icon: 'pi pi-lightbulb' },
];

const difficultyOptions = [
  {
    key: 'moderate',
    label: 'configureOptions.difficulty.level1',
    desc: 'configureOptions.difficulty.level1Desc',
  },
  {
    key: 'challenging',
    label: 'configureOptions.difficulty.level2',
    desc: 'configureOptions.difficulty.level2Desc',
  },
  {
    key: 'difficult',
    label: 'configureOptions.difficulty.level3',
    desc: 'configureOptions.difficulty.level3Desc',
  },
];

const defaultOrder = [
  { id: 'product', label: 'steps.product', icon: 'pi pi-shield' },
  { id: 'persona', label: 'steps.persona', icon: 'pi pi-user' },
  { id: 'difficulty', label: 'configureOptions.selectDifficulty', icon: 'pi pi-chart-bar' },
  { id: 'smalltalk', label: 'configureOptions.selectSmallTalk', icon: 'pi pi-comment' },
];

export default function Review({ onPrevStep, onGeneratePrompt }) {
  const [order, setOrder] = useState(defaultOrder);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Get data from stores
  const { selectedProduct } = useProductStore();
  const { selectedPersona } = usePersonaStore();
  const { selectedSmallTalk, selectedDifficulty } = useConfigureStore();

  // Map the stored data to display format
  const selections = {
    product: {
      name: selectedProduct?.name || t('common.notSelected'),
      icon: 'pi pi-shield',
    },
    persona: {
      name: selectedPersona?.name || t('common.notSelected'),
      icon: 'pi pi-user',
    },
    smallTalk: {
      name: selectedSmallTalk
        ? t(smallTalkOptions.find(opt => opt.key === selectedSmallTalk)?.label)
        : t('common.notSelected'),
      icon: 'pi pi-comment',
    },
    difficulty: {
      name: selectedDifficulty
        ? t(difficultyOptions.find(opt => opt.key === selectedDifficulty)?.label)
        : t('common.notSelected'),
      icon: 'pi pi-chart-bar',
    },
  };

  return (
    <div className="p-4" style={{ minHeight: '80vh' }}>
      <div
        className="p-3 mb-4 border-round bg-pink-100 text-pink-900 flex align-items-center gap-2"
        style={{ border: '1px solid #e57373' }}
      >
        <i className="pi pi-exclamation-triangle mr-2" />
        <span>
          <b>{t('configureOptions.forInternalTesting')}</b>
        </span>
      </div>

      <div className="flex flex-column md:flex-row gap-5">
        {/* Selections Summary */}
        <div className="flex-1">
          <h3 className="mb-3 font-bold">{t('pages.reviewAndGenerate')}:</h3>
          <Card className="mb-4 shadow-2">
            <div className="flex flex-column gap-4 p-3">
              <div className="flex align-items-center gap-3">
                <i className={`pi pi-shield text-2xl text-red-500`} />
                <div>
                  <div className="text-xs text-600">{t('steps.product')}</div>
                  <div className="font-medium text-lg">{selections.product.name}</div>
                </div>
              </div>
              <div className="flex align-items-center gap-3">
                <i className={`pi pi-user text-2xl text-red-500`} />
                <div>
                  <div className="text-xs text-600">{t('steps.persona')}</div>
                  <div className="font-medium text-lg">{selections.persona.name}</div>
                </div>
              </div>
              <div className="flex align-items-center gap-3">
                <i className={`pi pi-comment text-2xl text-red-500`} />
                <div>
                  <div className="text-xs text-600">{t('configureOptions.selectSmallTalk')}</div>
                  <div className="font-medium text-lg">{selections.smallTalk.name}</div>
                </div>
              </div>
              <div className="flex align-items-center gap-3">
                <i className={`pi pi-chart-bar text-2xl text-red-500`} />
                <div>
                  <div className="text-xs text-600">{t('configureOptions.selectDifficulty')}</div>
                  <div className="font-medium text-lg">{selections.difficulty.name}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1">
          <h3 className="mb-3 font-bold">{t('common.customizeOrder')}:</h3>
          <div className="text-sm mb-2 text-600">{t('common.dragToReorder')}:</div>
          <Reorder.Group
            axis="y"
            values={order}
            onReorder={setOrder}
            className="flex flex-column gap-3"
          >
            {order.map((item, idx) => (
              <Reorder.Item
                key={item.id}
                value={item}
                whileDrag={{ scale: 1.03, boxShadow: '0 8px 24px rgba(233, 30, 99, 0.15)' }}
                className="bg-white border-round shadow-1 p-3 flex align-items-center gap-3 cursor-move"
                style={{ border: '1px solid #e0e0e0' }}
              >
                <i className={`${item.icon} text-xl text-red-500`} />
                <span className="font-medium">
                  {idx + 1}. {t(item.label)}
                </span>
                <i className="pi pi-bars ml-auto text-gray-400" />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>

      <Divider className="my-5" />
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
            label={t('common.generate')}
            icon="pi pi-chevron-right"
            iconPos="right"
            onClick={() => {
              onGeneratePrompt(order);
            }}
            className="p-button flex-1 border-round-right bg-red-600"
            style={{
              height: '48px',
              fontSize: '16px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderColor: '#e57373',
            }}
          />
        </div>
      </div>
    </div>
  );
}
