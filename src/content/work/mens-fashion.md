---
title: 남성 패션 커뮤니티 트렌드 분석 플랫폼
summary: 5개 커뮤니티 27만 건의 게시글로 트렌드를 분석하고, 누구나 탐색할 수 있는 플랫폼으로 배포했습니다.
period: 2025.08 – 2025.09
kind: 개인 프로젝트
team: 단독
role: 수집 · 전처리 · 분석 · 시각화 · 배포 전 과정
domain: 패션
order: { all: 5, ax: 5, da: 1, dae: 5 }
metrics:
  - { value: "272,066", countTo: 272066, suffix: "건", label: 수집·분석한 게시글 }
  - { value: "약 620만", label: 구조화한 토큰 }
  - { value: "454", countTo: 454, suffix: "개", label: 키워드 탐색기 키워드 }
tldr:
  - 마케터·MD가 커뮤니티를 손으로 훑어보던 일을 데이터로 대신하는 것이 목표였습니다.
  - 5개 커뮤니티를 직접 크롤링해 패션 도메인 사전으로 정제하고, 통계 검정과 네트워크 분석으로 트렌드를 확인했습니다.
  - '"헤리티지 소비로의 전환" 등 4가지 발견을 Tableau 대시보드 2개와 Streamlit 탐색기로 공개했습니다.'
flow: [Selenium 크롤러 5종, Kiwi 형태소 + 도메인 사전, 통계 · 네트워크 분석, Tableau · Streamlit 배포]
stack: [Python, Selenium, kiwipiepy, scipy, NetworkX, PyVis, Tableau, Streamlit]
askMe:
  - 커뮤니티마다 다른 게시글 구조를 어떻게 파싱했는지
  - ChatGPT와 Claude의 정제 결과가 다를 때 판단한 기준
  - Tableau와 Streamlit에 역할을 나눈 이유
links:
  - { label: 플랫폼 바로가기, href: "https://mfdaplatform.streamlit.app/" }
  - { label: 분석 보고서, href: "https://bramble-trick-355.notion.site/23225f83d9298064a815ec2a3698ca10" }
  - { label: LMC 브랜드 분석 보고서 (PDF), href: "https://github.com/sumlnsu/mfda-project/blob/main/reports/lmc_trend_analysis_report.pdf" }
  - { label: GitHub, href: "https://github.com/sumlnsu/mfda-project" }
---

## 배경

패션 브랜드 마케터와 MD는 트렌드를 파악하려고 커뮤니티를 직접 돌아다니며 글을 읽습니다. 이 일을 데이터로 자동화하고, 결과를 실무자가 직접 탐색할 수 있게 만드는 것이 목표였습니다.

- 분석 대상: 5개 남성 패션 커뮤니티 (자유글 · 질문 · 후기 · 데일리룩 · 룩북)
- 기간: 2022년 3월 ~ 2025년 8월, 게시글 **272,066건**

## 내가 한 일

- **수집** — 커뮤니티마다 게시글 구조가 달라, Selenium 크롤러의 파싱 로직을 5개 각각 따로 만들었습니다.
- **정제** — Kiwi 형태소 분석에 패션 도메인 동의어·노이즈어 사전을 직접 만들어 적용했습니다. 정제 후보는 ChatGPT와 Claude의 결과를 비교하고, 다르게 나온 항목은 원문을 다시 확인해 기준을 정했습니다. 그 결과 브랜드·아이템·스타일 토큰 약 620만 개로 구조화했습니다.
- **분석** — 시즌별 트렌드는 Kruskal-Wallis 검정, 커뮤니티 간 차이는 Jaccard 유사도, 키워드 관계는 공출현 네트워크(NetworkX)로 분석했습니다.
- **배포** — 정형 집계는 Tableau 대시보드 2개(트렌드·세그먼트), 네트워크와 키워드 검색은 Streamlit으로 역할을 나눠 공개했습니다.

## 핵심 발견

1. **헤리티지 소비로의 구조적 전환** — RRL 언급 비중 0.26% → 7.41%, 보세 8.40% → 0.70%
2. **가을에 시작해 여름으로 번지는 트렌드** — 계절 전환 구간별 관심도 차이가 통계적으로 유의 (Kruskal-Wallis p = 0.001)
3. **5개 커뮤니티는 서로 다른 세그먼트** — 커뮤니티 간 Jaccard 유사도가 대부분 0.5 미만
4. **빈티지의 중개자 역할** — 키워드 네트워크에서 빈티지의 매개 중심성 0.111

## 배운 점

분석 결과는 보고서로 끝나면 한 번 읽히고 사라집니다. **사용자가 직접 질문하고 답을 찾을 수 있는 도구**로 만들어야 계속 쓰인다는 것을 배웠습니다. 또 AI를 정제에 쓸 때는 결과를 그대로 믿지 않고 검증 기준을 먼저 세워야 한다는 원칙도 이때 생겼습니다.
