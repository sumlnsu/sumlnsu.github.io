// 사이트 전체에서 쓰는 사람·트랙 정보. 원본은 career/resume/00_경험자산_마스터.md
// 새 경험이 생기면 마스터 → 이 파일 / src/content/work 순서로 반영한다.

export type Track = 'all' | 'ax' | 'da' | 'dae';

export const person = {
  name: '김수민',
  nameEn: 'Sumin Kim',
  email: 'smo1621@naver.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/sumlnsu' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sumin-kim-382ba1280/' },
    { label: 'Blog', href: 'https://velog.io/@smo1621/posts' },
  ],
};

type Metric = { value: string; countTo?: number; suffix?: string; label: string };

export const tracks: Record<Track, {
  path: string;
  tab: string;          // 전환 탭 라벨
  role: string;         // 직무명
  lines: string[];      // 히어로 헤드라인 (줄 단위)
  lead: string;         // '\n'에서 줄바꿈 (모바일 포함)
  metrics: Metric[];
  title: string;        // <title>
}> = {
  all: {
    path: '/',
    tab: '전체',
    role: 'Data · Automation · AX',
    lines: ['반복되는 일의 원인을 찾고,', '데이터와 자동화로', '일하는 방식을 바꿉니다.'],
    lead: '에듀테크 스타트업에서 데이터 파이프라인과 KPI 기준을 만들었고,\n지금은 베이직스에서 전사 AX를 맡고 있습니다.',
    metrics: [
      { value: '12초 → 1~2초', label: '사내 데이터 조회 시간' },
      { value: '30%', countTo: 30, suffix: '%', label: '데이터 운영 리소스 절감' },
      { value: '272,066', countTo: 272066, label: '직접 수집·분석한 게시글' },
      { value: '3건', countTo: 3, suffix: '건', label: '제거한 레거시 프로세스' },
    ],
    title: '김수민 — 데이터 · 자동화 · AX',
  },
  ax: {
    path: '/ax/',
    tab: 'AX',
    role: 'AX · 업무 자동화',
    lines: ['반복 업무를 찾아내고,', '자동화와 AI로', '일하는 방식을 바꿉니다.'],
    lead: '현업 인터뷰로 반복 업무를 정의하고, 도구 도입 설득 → 구축 → 사내 내재화 → 가이드 배포까지 직접 해 왔습니다. 만드는 것보다 계속 쓰이게 하는 것을 더 중요하게 생각합니다.',
    metrics: [
      { value: '12초 → 1~2초', label: '조회 플랫폼 전환 후 조회 시간' },
      { value: '30%', countTo: 30, suffix: '%', label: '데이터 운영 리소스 절감' },
      { value: '1.5배', label: '고객서비스팀 응대 속도' },
      { value: '5건', countTo: 5, suffix: '건', label: '첫 직장에서 만든 자동화' },
    ],
    title: '김수민 — AX · 업무 자동화',
  },
  da: {
    path: '/da/',
    tab: 'DA',
    role: 'Data Analyst',
    lines: ['믿을 수 있는 지표를 세우고,', '행동의 차이를', '실행할 과제로 바꿉니다.'],
    lead: '부서마다 달랐던 이탈 KPI의 원인을 데이터 흐름에서 찾아 전사 기준으로 정비했습니다. 세그먼트와 통계 검정으로 "느낌"이 아닌 근거를 만들고, 비전문가도 읽을 수 있게 전달합니다.',
    metrics: [
      { value: '272,066', countTo: 272066, label: '패션 커뮤니티 게시글 분석' },
      { value: '6,260', countTo: 6260, suffix: '명', label: '게임 유저 행동 분석' },
      { value: '4 / 5', label: '통계적으로 유의했던 가설' },
      { value: '3건', countTo: 3, suffix: '건', label: 'KPI 정비 중 제거한 레거시' },
    ],
    title: '김수민 — Data Analyst',
  },
  dae: {
    path: '/dae/',
    tab: 'DAE',
    role: 'Data Analytics Engineer',
    lines: ['흩어진 데이터를 모아', '현업이 직접 꺼내 쓰는', '구조를 만듭니다.'],
    lead: '스프레드시트 수기 운영을 Python ETL · MySQL · 조회 UI로 전환했고, Slack 메시지 같은 비정형 데이터도 스키마로 정의해 적재했습니다. 데이터가 믿을 수 있게, 쉽게 쓰이게 만드는 일을 합니다.',
    metrics: [
      { value: '12초 → 1~2초', label: '조회 시간' },
      { value: '3 → 1', label: '결제 데이터 소스 통합' },
      { value: '5분', label: '자동 갱신 주기' },
      { value: '6개', countTo: 6, suffix: '개', label: '목적별 데이터셋 설계' },
    ],
    title: '김수민 — Data Analytics Engineer',
  },
};

export const trackOrder: Track[] = ['all', 'ax', 'da', 'dae'];

export const principles = [
  {
    no: '01',
    title: '결과보다 원인부터',
    body: '같은 문제가 왜 반복되는지부터 봅니다. 부서마다 다르게 나오던 KPI도 숫자를 맞추는 대신 데이터가 만들어지는 흐름을 거슬러 올라가 원인을 찾았습니다.',
  },
  {
    no: '02',
    title: '쓰이기까지가 완성',
    body: '시스템을 만드는 것보다 사람들이 계속 쓰게 만드는 것까지가 제 일이라고 생각합니다. 그래서 매뉴얼, 유지보수 가이드, 오류 대응 문서까지 함께 만듭니다.',
  },
  {
    no: '03',
    title: 'AI는 검증과 함께',
    body: 'AI가 낸 결과를 그대로 쓰지 않습니다. 두 모델의 결과를 비교하고, 다르게 나온 항목은 원문을 다시 확인하는 기준을 먼저 세운 뒤 업무에 적용합니다.',
  },
];

export const experience = [
  {
    period: '2026.08 — 현재',
    org: '베이직스',
    role: '고객지원팀 AXCX파트',
    body: '전사 각 팀의 데이터 연결 · 시스템 구축 · 자동화 요청을 받아 Claude 기반으로 구축하고 배포·공유합니다.',
    note: '성과 정리 중',
  },
  {
    period: '2025.03 — 2026.07',
    org: '개인 프로젝트 & 학습',
    role: '',
    body: '패션 커뮤니티 트렌드 분석 플랫폼, 게임 유저 행동 분석을 단독으로 진행하고 BigQuery · Airflow 등 데이터 엔지니어링 도구를 학습했습니다.',
  },
  {
    period: '2024.01 — 2025.03',
    org: '아이헤이트플라잉버그스',
    role: '경영데이터팀 데이터매니저',
    body: 'AI 에듀테크 스타트업(예비 유니콘)에서 CRM · 결제 · 매출 · 환불 데이터를 관리하며 조회 플랫폼, 업무 요청 파이프라인, KPI 기준 정비를 맡았습니다.',
  },
  {
    period: '2023.11 — 2024.01',
    org: '프로그래머스 데브코스',
    role: '데이터분석 과정',
    body: '이커머스 고객 분석 팀 프로젝트를 리드했고, 취업으로 과정을 조기 종료했습니다.',
  },
  {
    period: '2017 — 2023',
    org: '세종대학교',
    role: '데이터사이언스학과',
    body: 'ADsP(데이터분석준전문가) 취득 · 교내 SW경시대회 장려상 2회',
  },
];

// 스킬 그룹. order는 트랙별 노출 순서 (없으면 숨김)
export const toolkit: { group: string; items: string[]; order: Partial<Record<Track, number>> }[] = [
  { group: '자동화 · 연동', items: ['Python (requests · schedule)', 'Slack API', 'Integrately', 'Redash'], order: { all: 2, ax: 1, dae: 2 } },
  { group: '파이프라인 · DB', items: ['Python ETL', 'MySQL 스키마 설계', 'SQL', 'AWS EC2', 'Git'], order: { all: 1, ax: 3, da: 3, dae: 1 } },
  { group: '분석 · 통계', items: ['pandas', 'scipy · statsmodels', 'ANOVA · Tukey HSD · T-test', 'Kruskal-Wallis · 카이제곱', 'RFM'], order: { all: 3, da: 1, dae: 5 } },
  { group: '시각화 · 내부 도구', items: ['Tableau', 'Streamlit', 'Appsmith', 'Plotly · matplotlib'], order: { all: 4, ax: 4, da: 2, dae: 3 } },
  { group: '수집 · 텍스트', items: ['Selenium', 'kiwipiepy · mecab', 'NetworkX'], order: { all: 5, da: 4, dae: 4 } },
  { group: '생성형 AI', items: ['Claude', 'ChatGPT', '결과 교차 검증 설계'], order: { all: 6, ax: 2, da: 5 } },
  { group: '학습 중', items: ['BigQuery', 'Airflow', 'Databricks', 'Amplitude · GA'], order: { all: 7, ax: 5, da: 6, dae: 6 } },
];
