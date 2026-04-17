import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Image as ImageIcon, Edit3, Sparkles, X, AlertTriangle } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export function GuidePanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-primary/10 hover:border-primary/30 transition-all group"
          title="사용법 가이드"
        >
          <HelpCircle className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground whitespace-nowrap">가이드</span>
        </motion.button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-foreground">
                        사용법 가이드
                      </Dialog.Title>
                      <Dialog.Description className="sr-only">
                        화면설계서 디스크립션 생성기의 상세 사용 방법을 안내합니다
                      </Dialog.Description>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Content */}
                <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-80px)] space-y-6">
                  {/* 수동 입력 모드 (먼저 표시) */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Edit3 className="w-5 h-5 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">수동 입력 모드 (권장)</h3>
                    </div>
                    <ol className="space-y-2.5 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">1.</span>
                        <span>각 UI 요소의 <strong>기능명</strong>, <strong>타입</strong>, <strong>기능 설명</strong> 입력</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">2.</span>
                        <span>타입은 "(자동)"으로 두면 AI가 자동 판단 (또는 직접 선택)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">3.</span>
                        <span>"요소 추가"로 여러 항목 입력 가능</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">4.</span>
                        <span>"디스크립션 생성"으로 표준 포맷 디스크립션 생성</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">5.</span>
                        <span>(선택) "기획 전문가 제안"으로 놓친 부분 자동 검토</span>
                      </li>
                    </ol>
                  </div>

                  {/* 구분선 */}
                  <div className="border-t border-border" />

                  {/* 이미지 업로드 모드 */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="w-5 h-5 text-primary" />
                      <h3 className="text-base font-semibold text-foreground">이미지 업로드 모드</h3>
                    </div>

                    {/* 경고 */}
                    <div className="mb-4 flex items-start gap-3 px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                          주의사항
                        </p>
                        <p className="text-xs text-amber-700 dark:text-amber-300">
                          이미지 업로드 모드는 Vision AI를 사용하여 <strong>비용이 더 많이 발생</strong>할 수 있습니다.
                          또한 API 사용량 제한으로 인해 일시적으로 <strong>서비스가 제한</strong>될 수 있습니다.
                        </p>
                      </div>
                    </div>

                    <ol className="space-y-2.5 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">1.</span>
                        <span>와이어프레임, 스크린샷, 목업 이미지를 드래그하거나 클릭하여 업로드</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">2.</span>
                        <span>"디스크립션 생성" 버튼 클릭 (Vision AI가 이미지를 분석하여 디스크립션 생성)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">3.</span>
                        <span>생성된 디스크립션 검토</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-primary">4.</span>
                        <span>(선택) "기획 전문가 제안"으로 놓친 부분 자동 검토</span>
                      </li>
                    </ol>
                  </div>

                  {/* 팁 */}
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm mb-2">사용 팁</p>
                        <ul className="text-sm text-muted-foreground space-y-1.5">
                          <li>• 디스크립션 생성 후 "기획 전문가 제안"을 받으면 놓친 비즈니스 로직을 자동으로 제안받습니다</li>
                          <li>• 생성된 디스크립션은 복사 또는 Markdown 파일로 다운로드 가능합니다</li>
                          <li>• 수동 입력 시 기능 설명은 간결하게 핵심만 작성하세요 (AI가 확장합니다)</li>
                          <li>• <strong>비용 절감을 위해 가급적 수동 입력 모드를 사용하세요</strong></li>
                          <li>• "초기화" 버튼으로 모든 입력과 결과를 한 번에 초기화할 수 있습니다</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
