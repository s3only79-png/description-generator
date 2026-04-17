import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Download, FileText, Lightbulb, Sparkles, Check, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import * as Accordion from '@radix-ui/react-accordion';

interface ResultPanelProps {
  draftResult: string | null;
  expertReview: string | null;
  onExpertReview: () => void;
  isGenerating: boolean;
}

export function ResultPanel({
  draftResult,
  expertReview,
  onExpertReview,
  isGenerating
}: ResultPanelProps) {
  const [copiedType, setCopiedType] = useState<'draft' | 'expert' | null>(null);
  const [openValue, setOpenValue] = useState<string>('draft');

  // 초안이나 전문가 제안이 생성되면 자동으로 해당 아코디언 열기
  useEffect(() => {
    if (expertReview) {
      setOpenValue('expert');
    } else if (draftResult) {
      setOpenValue('draft');
    }
  }, [draftResult, expertReview]);

  const handleCopy = (content: string, type: 'draft' | 'expert') => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    toast.success('클립보드에 복사되었습니다');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = (content: string, type: 'draft' | 'expert') => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `화면설계서_${type === 'expert' ? '전문가제안' : '초안'}_${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('다운로드되었습니다');
  };

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        {draftResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Results Accordion */}
            <div className="flex flex-col">
              <Accordion.Root
                type="single"
                collapsible
                value={openValue}
                onValueChange={setOpenValue}
                className="flex flex-col gap-3"
              >
                {/* Draft */}
                <Accordion.Item
                  value="draft"
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <div className="flex items-center bg-muted/30">
                    <Accordion.Header className="flex-1">
                      <Accordion.Trigger className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted/20 transition-colors group">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-sm font-medium text-foreground">초안 디스크립션</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 ml-auto" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <div className="flex items-center gap-1 px-2 py-3">
                      <button
                        onClick={() => handleCopy(draftResult, 'draft')}
                        className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                        title="복사"
                      >
                        {copiedType === 'draft' ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDownload(draftResult, 'draft')}
                        className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                        title="다운로드"
                      >
                        <Download className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </div>

                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-4 pb-4 max-h-96 overflow-y-auto">
                      <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                        {draftResult}
                      </pre>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>

                {/* Expert Review */}
                {expertReview && (
                  <Accordion.Item
                    value="expert"
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <div className="flex items-center bg-muted/30">
                      <Accordion.Header className="flex-1">
                        <Accordion.Trigger className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted/20 transition-colors group">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-sm font-medium text-foreground">전문가 제안</span>
                          <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 ml-auto" />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <div className="flex items-center gap-1 px-2 py-3">
                        <button
                          onClick={() => handleCopy(expertReview, 'expert')}
                          className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                          title="복사"
                        >
                          {copiedType === 'expert' ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDownload(expertReview, 'expert')}
                          className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                          title="다운로드"
                        >
                          <Download className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    </div>

                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-4 pb-4 max-h-96 overflow-y-auto">
                        <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                          {expertReview}
                        </pre>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                )}
              </Accordion.Root>
            </div>

            {/* Expert Review Button */}
            {draftResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={onExpertReview}
                  disabled={isGenerating}
                  whileHover={{ scale: !isGenerating ? 1.01 : 1 }}
                  whileTap={{ scale: !isGenerating ? 0.99 : 1 }}
                  className={`
                    w-full h-12 rounded-xl font-medium
                    flex items-center justify-center gap-2
                    transition-all duration-300
                    ${!isGenerating
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }
                  `}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Lightbulb className="w-5 h-5" />
                      </motion.div>
                      <span>분석 중...</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-5 h-5" />
                      <span>{expertReview ? '전문가 제안 다시 받기' : '기획 전문가 제안'}</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
