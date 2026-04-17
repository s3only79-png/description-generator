# 화면설계서 디스크립션 생성기

AI 기반 화면설계서 자동 작성 도구

## 기능

- **수동 입력 모드**: UI 요소를 직접 입력하여 표준 디스크립션 생성
- **이미지 업로드 모드**: 와이어프레임/스크린샷을 Vision AI로 분석하여 디스크립션 생성
- **기획 전문가 제안**: AI가 자동으로 비즈니스 로직 검토 및 개선 사항 제안

## 배포 방법

### 1. GitHub에 업로드

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com) 접속 → GitHub 계정으로 로그인
2. "New Project" 클릭
3. GitHub 리포지토리 선택
4. Framework Preset: **Vite** 선택
5. Deploy 클릭

### 3. 환경 변수 설정

Vercel 프로젝트 → Settings → Environment Variables

```
OPENAI_API_KEY=sk-proj-your-api-key-here
```

### 4. OpenAI API 키 발급

1. https://platform.openai.com/api-keys 접속
2. "Create new secret key" 클릭
3. 키 복사 후 Vercel 환경 변수에 추가

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (프로덕션 환경 변수 필요)
pnpm dev

# 빌드
pnpm build
```

## 기술 스택

- **Frontend**: React 18, TypeScript, Tailwind CSS v4
- **Backend**: Vercel Serverless Functions
- **AI**: OpenAI GPT-4o-mini, Vision API
- **UI Components**: Radix UI, Motion (Framer Motion)

## 주의사항

- `.env` 파일은 절대 커밋하지 마세요
- OpenAI API 사용량을 모니터링하세요 (https://platform.openai.com/usage)
- 이미지 업로드 모드는 비용이 더 많이 발생할 수 있습니다

## 라이센스

MIT
