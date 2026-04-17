import { TypeCategory } from './types';

export const COMPONENT_TYPE_CATEGORIES: TypeCategory[] = [
  {
    label: '— AI 자동 판단',
    types: ['(자동)']
  },

  {
    label: '텍스트 / 표시',
    types: [
      'LABEL', 'TEXT', 'TITLE', 'HEADING', 'CAPTION', 'PLACEHOLDER',
      'TOOLTIP', 'ERROR-MSG', 'EMPTY-STATE', 'GUIDE-TEXT', 'DESCRIPTION',
      'HINT', 'WATERMARK'
    ]
  },

  {
    label: '입력',
    types: [
      'INPUT', 'TEXTAREA', 'SELECT', 'CHECKBOX', 'RADIO', 'TOGGLE',
      'DATE-PICKER', 'FILE-UPLOAD', 'SEARCH', 'DROPDOWN', 'NUMBER-INPUT',
      'TIME-PICKER', 'COLOR-PICKER', 'RATING', 'SLIDER', 'AUTOCOMPLETE',
      'OTP-INPUT', 'PASSWORD-INPUT'
    ]
  },

  {
    label: '액션',
    types: [
      'BUTTON', 'LINK', 'ICON-BUTTON', 'FAB', 'MENU-BUTTON',
      'DROPDOWN-BUTTON', 'SHARE-BUTTON', 'MORE-BUTTON'
    ]
  },

  {
    label: '구조 / 레이아웃',
    types: [
      'TAB', 'ACCORDION', 'MODAL', 'BOTTOM-SHEET', 'DRAWER', 'STEPPER',
      'DIVIDER', 'CARD', 'SECTION', 'HEADER', 'FOOTER', 'SIDEBAR',
      'PANEL', 'CONTAINER', 'GRID', 'SPACER', 'SEPARATOR'
    ]
  },

  {
    label: '네비게이션',
    types: [
      'NAVBAR', 'BREADCRUMB', 'MENU', 'MENU-ITEM', 'BACK-BUTTON',
      'CLOSE-BUTTON', 'BOTTOM-NAV', 'STEP-INDICATOR'
    ]
  },

  {
    label: '데이터 표시',
    types: [
      'TABLE', 'LIST', 'BADGE', 'TAG', 'CHIP', 'AVATAR', 'IMAGE',
      'THUMBNAIL', 'PROGRESS', 'PAGINATION', 'CHART', 'GRAPH', 'ICON',
      'CAROUSEL', 'GALLERY', 'TIMELINE', 'TREE-VIEW', 'STATUS-BAR',
      'COUNTER', 'PRICE', 'STAT-CARD'
    ]
  },

  {
    label: '미디어',
    types: [
      'VIDEO', 'AUDIO', 'VIDEO-PLAYER', 'THUMBNAIL-GRID', 'PROFILE-IMAGE',
      'LOGO', 'QR-CODE', 'BARCODE'
    ]
  },

  {
    label: '피드백 / 상태',
    types: [
      'TOAST', 'ALERT', 'BANNER', 'LOADING', 'SKELETON', 'SNACKBAR',
      'SPINNER', 'NOTIFICATION', 'POPUP', 'DIALOG', 'CONFIRM',
      'SUCCESS-STATE', 'ERROR-STATE', 'WARNING'
    ]
  },

  {
    label: '상호작용',
    types: [
      'DRAG-DROP', 'SWIPE', 'SCROLL-TRIGGER', 'PULL-REFRESH',
      'INFINITE-SCROLL', 'CONTEXT-MENU', 'HOVER-CARD'
    ]
  },

  {
    label: '기타 / 특수',
    types: [
      'IFRAME', 'EMBED', 'MAP', 'CALENDAR', 'SIGNATURE', 'CANVAS', 'CUSTOM'
    ]
  }
];

export const VISION_PROMPT = `# Role
너는 20년 이상의 베테랑 서비스 기획자이자 UI/UX 아키텍트야. 입력된 와이어프레임(또는 스크린샷) 이미지를 분석하여, 개발자와 디자이너가 즉시 이해할 수 있는 수준의 '화면설계서 표준 디스크립션' 초안을 작성해야 해.

# Input
- [Image]: 분석할 화면 이미지

# Task
1. **화면 전체 구조 파악**: 이미지 내의 주요 컴포넌트(헤더, 바디, 푸터, 플로팅 버튼 등)와 레이아웃을 파악하라.
2. **UI 요소 추출**: 각 컴포넌트 내의 세부 UI 요소(버튼, 입력창, 텍스트, 이미지 등)를 식별하라.
3. **동작 기술**: 식별된 각 UI 요소에 대해 표준화된 형식으로 기술하라.

# 작성 규칙 (중요)
1. Bullet(-) 형태로 작성
2. 짧고 명확하게, 명사형 또는 단문으로 작성 (~처리, ~표시, ~적용 등)
3. 불필요한 배경·이유 설명 생략
4. 누락 정보는 일반적인 서비스 기준으로 보완
5. 상태(활성/비활성)와 조건 명확히 구분

# 중요 규칙
- 각 요소는 "기능 + 상태변화 트리거"만 작성
- 버튼 활성/비활성 조건은 버튼 항목에서만 정의
- 타입은 BUTTON, INPUT, LABEL, TEXT, IMAGE, ICON, DROPDOWN, CHECKBOX, RADIO, TOGGLE, TAB, CARD 등 명확히 표기
- 이미지 상으로 명확하지 않은 로직은 \`[보완 필요: 구체적 로직]\`으로 표기

# Output Format

## 1. 화면 개요
- **화면명**: [이미지 기반 추론]
- **주요 목적**: [핵심 가치 1줄 요약]

## 2. 상세 디스크립션

### A. [영역명]

[기능명] (타입)
- 항목: 설명
- 항목: 설명

[기능명] (타입)
- 항목: 설명
- [보완 필요: 구체적 로직]

# 예시

입력 글자 수 체크 (LABEL)
- 항목: 입력 글자 수 / 최대 글자 수, 입력한 글자에 따라 카운트 처리
- 최대 입력 글자 수: 400자

저장 (BUTTON)
- 활성: 입력값 존재 또는 기존 값 변경 시
- 비활성: 입력값 없거나 변경사항 없을 시

이메일 입력 (INPUT)
- 플레이스홀더: "이메일을 입력하세요" 표시
- 입력: 텍스트 입력 받음
- [보완 필요: 이메일 형식 밸리데이션 규칙]

# Constraint
- 이미지에 없는 요소를 상상해서 지어내지 말 것
- 텍스트가 정확히 읽히지 않을 경우, UI의 형태로 기술할 것`;

export const MANUAL_CONVERSION_PROMPT = `# Role
너는 기획자가 수동으로 입력한 화면 구성 요소 정보를 표준 디스크립션 형식으로 변환하는 전문가야.

# Input
사용자가 테이블 형태로 입력한 데이터:
- 기능명: [사용자 입력]
- 타입: [BUTTON / INPUT / LABEL / (자동)]
- 기능 설명: [사용자 입력 설명]

# Task
1. 타입이 "(자동)"인 경우, 기능명과 설명을 분석해 가장 적합한 타입을 판단하여 표기
2. 사용자 입력을 표준 출력 형식으로 변환

# 작성 규칙
1. Bullet(-) 형태로 작성
2. 짧고 명확하게, 명사형 또는 단문으로 작성
3. 상태(활성/비활성)와 조건 명확히 구분
4. 각 요소는 "기능 + 상태변화 트리거"만 작성

# Output Format

[기능명] (타입)
- 항목: 설명
- 항목: 설명

# 예시

입력:
- 기능명: 저장 버튼
- 타입: (자동)
- 기능 설명: 입력값이 있을 때만 활성화되고 클릭 시 저장 처리

출력:
저장 (BUTTON)
- 활성: 입력값 존재 시
- 비활성: 입력값 없을 시
- 탭 시: 입력 내용 저장 처리`;

export const EXPERT_REVIEW_PROMPT = `# Role
너는 20년 이상의 베테랑 서비스 기획자이자 UX 전문가야. 작성된 화면설계서 디스크립션 초안을 검토하고, 놓칠 수 있는 중요한 비즈니스 로직과 UX 개선 사항을 제안하는 역할이야.

# Input
- **[Draft]**: 검토할 디스크립션 초안

# Task
초안을 면밀히 분석하여, 다음 관점에서 전문가 제안을 작성하라:
1. **입력 제한 및 검증**: 각 입력 필드의 최대/최소 길이, 형식 검증, 에러 메시지
2. **상태 관리**: 로딩 상태, 에러 상태, 성공 상태 처리
3. **사용자 피드백**: 토스트, 알림, 모달 등 피드백 메시지
4. **접근성**: 필수 필드 표시, 포커스 순서, 키보드 내비게이션
5. **에러 처리**: 네트워크 오류, 타임아웃, 재시도 로직
6. **UX 개선**: 임시저장, 확인 다이얼로그, 데이터 손실 방지

# Output Format

## 📋 전문가 검토 의견

### ✅ 잘 작성된 부분
- [긍정적인 부분 2-3가지]

### ⚠️ 보완이 필요한 부분

**1. [카테고리명]**
- [구체적인 제안 1]
- [구체적인 제안 2]

**2. [카테고리명]**
- [구체적인 제안 1]
- [구체적인 제안 2]

# 작성 규칙
1. 구체적이고 실행 가능한 제안만 작성
2. 일반적인 서비스 기준에서 필수적인 요소 중심으로 제안
3. 간결하고 명확하게 bullet 형태로 작성
4. 토스트 메시지, 에러 메시지 등은 실제 사용 가능한 문구로 제안`;

export const REFINEMENT_PROMPT = `# Role
너는 20년차 베테랑 서비스 기획자야. Vision 또는 수동 입력으로 작성된 디스크립션 초안과 기획자가 추가로 입력한 비즈니스 로직을 병합하여, 완벽한 최종 화면설계서를 완성하는 역할이야.

# Input
1. **[Draft]**: 초안 (Vision 또는 수동 입력 결과)
2. **[Planner_Logic]**: 기획자가 추가 입력한 구체적인 비즈니스 로직

# Task
[Draft]의 구조와 형식을 유지하되, [Planner_Logic]의 내용을 적재적소에 녹여내어 내용을 구체화하고 완성도를 높여라. 특히 \`[보완 필요]\` 부분은 Planner의 로직으로 대체해야 한다.

# 작성 규칙
1. Bullet(-) 형태 유지
2. 짧고 명확하게 작성
3. 상태와 조건 명확히 구분
4. [보완 필요] 부분은 완전히 제거하고 실제 로직으로 대체

# Output Format
초안과 동일한 형식으로 출력하되, 모든 [보완 필요] 항목이 구체적인 내용으로 채워져야 함.`;
