# 🔌 API 연동 가이드

화면설계서 디스크립션 생성기를 실제 AI API와 연동하는 방법입니다.

## 📋 사전 준비

### 1. OpenAI API Key 발급

1. [OpenAI Platform](https://platform.openai.com/api-keys)에 접속
2. 계정 생성 또는 로그인
3. API Keys 메뉴에서 "Create new secret key" 클릭
4. 생성된 키를 안전한 곳에 복사 (한 번만 표시됨)

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일 생성:

\`\`\`bash
cp .env.example .env
\`\`\`

`.env` 파일 편집:

\`\`\`
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
\`\`\`

## 🚀 배포 방법

### Vercel에 배포

1. **Vercel 계정 생성**
   - [vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인

2. **프로젝트 연결**
   \`\`\`bash
   # Vercel CLI 설치 (선택사항)
   npm install -g vercel
   
   # 프로젝트 배포
   vercel
   \`\`\`

3. **환경변수 설정**
   - Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
   - `OPENAI_API_KEY` 추가
   - Production, Preview, Development 모두 체크

4. **재배포**
   - 환경변수 설정 후 자동으로 재배포됨
   - 또는 `vercel --prod` 실행

## 💰 예상 비용

### OpenAI GPT-4o-mini 가격 (2024년 기준)

- **입력**: $0.15 / 1M 토큰
- **출력**: $0.60 / 1M 토큰

### 월 사용량 예시 (내부 팀 10명)

| 사용량 | 비용 |
|--------|------|
| 일 50회 생성 (Vision) | ~$3/월 |
| 일 50회 생성 (Manual) | ~$1/월 |
| 일 30회 Refinement | ~$2/월 |
| **총 예상** | **$5-8/월** |

## 🧪 로컬 테스트

Vercel Serverless Functions는 배포 환경에서만 작동하지만, 로컬에서 테스트하려면:

\`\`\`bash
# Vercel CLI로 로컬 서버 실행
vercel dev
\`\`\`

## 🔒 보안 주의사항

⚠️ **절대 API Key를 Git에 커밋하지 마세요!**

- `.env` 파일은 `.gitignore`에 포함되어 있습니다
- 프론트엔드 코드에 직접 API Key를 넣지 마세요
- Vercel 환경변수로만 관리하세요

## 🛠️ 문제 해결

### API 호출 실패 시

현재 앱은 API 실패 시 자동으로 Mock 데이터로 대체됩니다.

**확인 사항:**
1. Vercel 환경변수에 `OPENAI_API_KEY`가 설정되어 있는지 확인
2. OpenAI API 키가 유효한지 확인
3. OpenAI 계정에 크레딧이 남아있는지 확인
4. 브라우저 콘솔에서 에러 메시지 확인

### CORS 에러

Vercel 배포 시 자동으로 CORS가 설정됩니다. 로컬 개발 시에는 `vercel dev` 사용을 권장합니다.

## 📊 사용량 모니터링

- [OpenAI Usage Dashboard](https://platform.openai.com/usage)에서 실시간 사용량 확인 가능
- 예산 설정 및 알림 기능 제공

## 🎯 최적화 팁

1. **캐싱**: 동일한 이미지/입력에 대해서는 결과를 로컬 스토리지에 저장
2. **Debouncing**: 연속된 요청을 방지
3. **모델 선택**: 
   - 초안 생성: `gpt-4o-mini` (저렴, 빠름)
   - 복잡한 분석: `gpt-4o` (정확, 비쌈)

## 📞 지원

문제가 발생하면:
1. 브라우저 개발자 도구 콘솔 확인
2. Vercel 대시보드 → Functions → Logs 확인
3. OpenAI Status 페이지 확인: https://status.openai.com
