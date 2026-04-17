import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { COMPONENT_TYPE_CATEGORIES } from '../constants';
import type { ManualInputRow, ComponentType } from '../types';

interface ManualInputModeProps {
  inputs: ManualInputRow[];
  onInputsChange: (inputs: ManualInputRow[]) => void;
}

export function ManualInputMode({
  inputs,
  onInputsChange
}: ManualInputModeProps) {
  const addRow = () => {
    const newRow: ManualInputRow = {
      id: Date.now().toString(),
      functionName: '',
      type: '(자동)',
      description: ''
    };
    onInputsChange([...inputs, newRow]);
  };

  const removeRow = (id: string) => {
    onInputsChange(inputs.filter(row => row.id !== id));
  };

  const updateRow = (id: string, field: keyof ManualInputRow, value: string) => {
    onInputsChange(
      inputs.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  // 초기 행이 없으면 1개 추가
  if (inputs.length === 0) {
    setTimeout(addRow, 0);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Cards Container */}
      <div className="max-h-96 overflow-y-auto overflow-x-hidden space-y-4 pr-1">
        {inputs.map((row, index) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                요소 {index + 1}
              </h3>
              <button
                onClick={() => removeRow(row.id)}
                className="w-7 h-7 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-colors group"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
              </button>
            </div>

            {/* 기능명 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                기능명
              </label>
              <input
                type="text"
                value={row.functionName}
                onChange={(e) => updateRow(row.id, 'functionName', e.target.value)}
                placeholder="예: 특이사항 입력"
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* 타입 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                타입
              </label>
              <select
                value={row.type}
                onChange={(e) => updateRow(row.id, 'type', e.target.value as ComponentType)}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              >
                {COMPONENT_TYPE_CATEGORIES.map((category) => (
                  <optgroup key={category.label} label={category.label}>
                    {category.types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* 기능 설명 */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                기능 설명
              </label>
              <textarea
                value={row.description}
                onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                placeholder="예: 최대 400자, 초과 시 안내 팝업 노출 등 기능 설명"
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Card Button */}
      <button
        onClick={addRow}
        className="w-full h-11 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center gap-2 transition-all text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <Plus className="w-4 h-4" />
        <span>요소 추가</span>
      </button>
    </div>
  );
}
