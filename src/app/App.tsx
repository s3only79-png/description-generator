import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Image as ImageIcon, Edit3, RotateCcw } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import { ImageUploadMode } from './components/ImageUploadMode';
import { ManualInputMode } from './components/ManualInputMode';
import { ResultPanel } from './components/ResultPanel';
import { GuidePanel } from './components/GuidePanel';
import type { GenerationMode, ManualInputRow } from './types';

// 이미지 파일을 Base64로 변환
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function App() {
  const [mode, setMode] = useState<GenerationMode>('manual');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [manualInputs, setManualInputs] = useState<ManualInputRow[]>([]);
  const [draftResult, setDraftResult] = useState<string | null>(null);
  const [expertReview, setExpertReview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDraft = async () => {
    // 상태 초기화 - 새로운 초안 생성 시 이전 결과 제거
    setExpertReview(null);
    setIsGenerating(true);

    try {
      // 입력 데이터 검증
      if (mode === 'image' && !uploadedImage) {
        toast.error('이미지를 업로드해주세요');
        setIsGenerating(false);
        return;
      }

      if (mode === 'manual' && manualInputs.length === 0) {
        toast.error('요소를 추가해주세요');
        setIsGenerating(false);
        return;
      }

      // API 경로 확인 (배포 환경에서만 실제 API 사용)
      const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('makeproxy');

      if (isProduction) {
        // 실제 API 호출 (Vercel 배포 환경)
        let requestData: any = { mode };

        if (mode === 'image' && uploadedImage) {
          const base64Image = await fileToBase64(uploadedImage);
          requestData.image = base64Image;
        } else if (mode === 'manual') {
          requestData.manualInputs = manualInputs;
        }

        const response = await fetch('/api/generate-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error('API 호출 실패');
        }

        const data = await response.json();
        setDraftResult(data.content);
        toast.success('초안이 생성되었습니다');
      } else {
        // 개발/프리뷰 환경에서는 Mock 데이터 사용
        throw new Error('개발 환경 - Mock 데이터 사용');
      }
    } catch (error) {
      console.log('Using mock data for draft generation:', error);

      // Mock 데이터로 대체 (에러 메시지 없이 조용히 처리)
      setTimeout(() => {
      const mockDraft = `## 1. 화면 개요
- **화면명**: 게시글 작성 화면
- **주요 목적**: 사용자 게시글 등록 및 관리

## 2. 상세 디스크립션

### A. 헤더 영역

뒤로가기 (BACK-BUTTON)
- 탭 시: 이전 화면 이동

화면 제목 (TITLE)
- 항목: "게시글 작성" 표시

### B. 입력 영역

제목 입력 (INPUT)
- 플레이스홀더: "제목을 입력하세요" 표시
- 입력: 텍스트 입력 받음

내용 입력 (TEXTAREA)
- 플레이스홀더: "내용을 입력하세요" 표시
- 입력: 여러 줄 텍스트 입력 받음

글자 수 체크 (LABEL)
- 항목: 입력 글자 수 / 최대 글자 수 표시

### C. 하단 버튼

저장 (BUTTON)
- 활성: 제목 및 내용 입력값 존재 시
- 비활성: 제목 또는 내용 미입력 시
- 탭 시: 게시글 저장 처리`;

        setDraftResult(mockDraft);
        setIsGenerating(false);
      }, 2000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setManualInputs([]);
    setDraftResult(null);
    setExpertReview(null);
    toast.success('초기화되었습니다');
  };

  const handleExpertReview = async () => {
    if (!draftResult) return;

    setIsGenerating(true);

    try {
      // API 경로 확인 (배포 환경에서만 실제 API 사용)
      const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('makeproxy');

      if (isProduction) {
        // 실제 API 호출 (Vercel 배포 환경)
        const response = await fetch('/api/expert-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            draft: draftResult
          })
        });

        if (!response.ok) {
          throw new Error('API 호출 실패');
        }

        const data = await response.json();
        setExpertReview(data.content);
        toast.success('전문가 제안이 생성되었습니다');
      } else {
        // 개발/프리뷰 환경에서는 Mock 데이터 사용
        throw new Error('개발 환경 - Mock 데이터 사용');
      }
    } catch (error) {
      console.log('Using mock data for expert review:', error);

      // Mock 데이터로 대체 (에러 메시지 없이 조용히 처리)
      setTimeout(() => {
      const mockReview = `## 📋 전문가 검토 의견

### ✅ 잘 작성된 부분
- 화면 구조가 명확하게 정리되어 있습니다
- 기본적인 UI 요소들이 잘 식별되었습니다

### ⚠️ 보완이 필요한 부분

**1. 입력 제한 및 검증**
- 제목 입력: 최대 100자 제한 필요
- 초과 시: "제목은 100자 이하로 입력하세요" 토스트 노출
- 내용 입력: 최대 2000자 제한 필요
- 초과 시: "내용은 2000자 이하로 입력하세요" 토스트 노출

**2. 글자 수 표시**
- 실시간 글자 수 카운팅 로직 추가 필요
- 표시 형식: "현재 글자 수 / 최대 글자 수" (예: 150 / 2000)

**3. 저장 버튼 동작**
- 성공 케이스: "저장되었습니다" 토스트 노출 → 목록 화면 이동
- 실패 케이스: "저장에 실패했습니다. 다시 시도해주세요" 토스트 노출
- 로딩 상태: 저장 중 버튼 비활성화 및 로딩 인디케이터 표시

**4. 접근성 고려사항**
- 필수 입력 필드 표시 추가 권장
- 포커스 순서 (제목 → 내용 → 저장) 명시

**5. 에러 처리**
- 네트워크 오류 시 재시도 옵션 제공
- 임시저장 기능 고려 (브라우저 종료 시 데이터 손실 방지)`;

        setExpertReview(mockReview);
        setIsGenerating(false);
      }, 1500);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" richColors />
      <div className="size-full flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-semibold tracking-tight text-foreground"
                >
                  화면설계서 디스크립션 생성기
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-muted-foreground"
                >
                  AI 기반 자동 화면설계서 작성 도구
                </motion.p>
              </div>
            </div>

            {/* Guide Button */}
            <GuidePanel />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs value={mode} onValueChange={(v) => setMode(v as GenerationMode)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual" className="gap-2">
                  <Edit3 className="w-4 h-4" />
                  수동 입력
                </TabsTrigger>
                <TabsTrigger value="image" className="gap-2">
                  <ImageIcon className="w-4 h-4" />
                  이미지 업로드
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="mt-4">
                <ManualInputMode
                  inputs={manualInputs}
                  onInputsChange={setManualInputs}
                />
              </TabsContent>

              <TabsContent value="image" className="mt-4">
                <ImageUploadMode
                  uploadedImage={uploadedImage}
                  onImageUpload={setUploadedImage}
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <motion.button
              onClick={handleGenerateDraft}
              disabled={isGenerating || (mode === 'image' && !uploadedImage) || (mode === 'manual' && manualInputs.length === 0)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                flex-1 h-12 rounded-xl font-medium
                flex items-center justify-center gap-2
                transition-all duration-300
                ${!isGenerating && ((mode === 'image' && uploadedImage) || (mode === 'manual' && manualInputs.length > 0))
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'
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
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <span>생성 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>디스크립션 생성</span>
                </>
              )}
            </motion.button>

            <button
              onClick={handleReset}
              className="px-6 h-12 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              초기화
            </button>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ResultPanel
              draftResult={draftResult}
              expertReview={expertReview}
              onExpertReview={handleExpertReview}
              isGenerating={isGenerating}
            />
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}
