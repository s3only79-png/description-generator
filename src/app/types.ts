// 컴포넌트 타입 정의
export type ComponentType =
  | '(자동)'
  | 'LABEL' | 'TEXT' | 'TITLE' | 'HEADING' | 'CAPTION' | 'PLACEHOLDER' | 'TOOLTIP' | 'ERROR-MSG' | 'EMPTY-STATE' | 'GUIDE-TEXT' | 'DESCRIPTION' | 'HINT' | 'WATERMARK'
  | 'INPUT' | 'TEXTAREA' | 'SELECT' | 'CHECKBOX' | 'RADIO' | 'TOGGLE' | 'DATE-PICKER' | 'FILE-UPLOAD' | 'SEARCH' | 'DROPDOWN' | 'NUMBER-INPUT' | 'TIME-PICKER' | 'COLOR-PICKER' | 'RATING' | 'SLIDER' | 'AUTOCOMPLETE' | 'OTP-INPUT' | 'PASSWORD-INPUT'
  | 'BUTTON' | 'LINK' | 'ICON-BUTTON' | 'FAB' | 'MENU-BUTTON' | 'DROPDOWN-BUTTON' | 'SHARE-BUTTON' | 'MORE-BUTTON'
  | 'TAB' | 'ACCORDION' | 'MODAL' | 'BOTTOM-SHEET' | 'DRAWER' | 'STEPPER' | 'DIVIDER' | 'CARD' | 'SECTION' | 'HEADER' | 'FOOTER' | 'SIDEBAR' | 'PANEL' | 'CONTAINER' | 'GRID' | 'SPACER' | 'SEPARATOR'
  | 'NAVBAR' | 'BREADCRUMB' | 'MENU' | 'MENU-ITEM' | 'BACK-BUTTON' | 'CLOSE-BUTTON' | 'BOTTOM-NAV' | 'STEP-INDICATOR'
  | 'TABLE' | 'LIST' | 'BADGE' | 'TAG' | 'CHIP' | 'AVATAR' | 'IMAGE' | 'THUMBNAIL' | 'PROGRESS' | 'PAGINATION' | 'CHART' | 'GRAPH' | 'ICON' | 'CAROUSEL' | 'GALLERY' | 'TIMELINE' | 'TREE-VIEW' | 'STATUS-BAR' | 'COUNTER' | 'PRICE' | 'STAT-CARD'
  | 'VIDEO' | 'AUDIO' | 'VIDEO-PLAYER' | 'THUMBNAIL-GRID' | 'PROFILE-IMAGE' | 'LOGO' | 'QR-CODE' | 'BARCODE'
  | 'TOAST' | 'ALERT' | 'BANNER' | 'LOADING' | 'SKELETON' | 'SNACKBAR' | 'SPINNER' | 'NOTIFICATION' | 'POPUP' | 'DIALOG' | 'CONFIRM' | 'SUCCESS-STATE' | 'ERROR-STATE' | 'WARNING'
  | 'DRAG-DROP' | 'SWIPE' | 'SCROLL-TRIGGER' | 'PULL-REFRESH' | 'INFINITE-SCROLL' | 'CONTEXT-MENU' | 'HOVER-CARD'
  | 'IFRAME' | 'EMBED' | 'MAP' | 'CALENDAR' | 'SIGNATURE' | 'CANVAS' | 'CUSTOM';

// 타입 카테고리
export interface TypeCategory {
  label: string;
  types: ComponentType[];
}

// 수동 입력 항목
export interface ManualInputRow {
  id: string;
  functionName: string;
  type: ComponentType;
  description: string;
}

// 생성 모드
export type GenerationMode = 'image' | 'manual';

// 처리 단계
export type ProcessingStage = 'idle' | 'draft' | 'refinement' | 'final';

// 생성 결과
export interface GenerationResult {
  stage: ProcessingStage;
  content: string;
  gaps?: string[]; // [보완 필요] 항목들
}

// 히스토리 항목
export interface HistoryItem {
  id: string;
  timestamp: number;
  mode: GenerationMode;
  imageName?: string;
  manualInputs?: ManualInputRow[];
  draft: string;
  final?: string;
  plannerLogic?: string;
}
