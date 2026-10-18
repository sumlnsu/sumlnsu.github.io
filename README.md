# 김수민 포트폴리오 (sumlnsu.github.io)

Astro 7 정적 사이트. GitHub Pages로 배포.

## 주소
| 주소 | 용도 |
|---|---|
| `/` | 전체 |
| `/ax/` | AX 이력서에 거는 링크 |
| `/da/` | 데이터 분석가 이력서에 거는 링크 |
| `/dae/` | 데이터 분석 엔지니어 이력서에 거는 링크 |
| `/work/<id>/` | 프로젝트 상세 |

## 내용 고치는 곳
| 바꾸고 싶은 것 | 파일 |
|---|---|
| 히어로 문구, 핵심 지표, 일하는 방식, 경력, 스킬, 연락처 | `src/data/profile.ts` |
| 프로젝트 추가·수정 | `src/content/work/*.md` (새 파일 = 새 프로젝트) |
| 트랙별 프로젝트 순서·숨김 | 각 프로젝트 파일 위쪽 `order:` (숫자 작을수록 앞, `null`은 숨김) |
| 색·글꼴·간격·모션 | `src/styles/tokens.css` (규칙은 `DESIGN.md`) |

원본 경험 정리는 `career/resume/00_경험자산_마스터.md`. 마스터를 먼저 고치고 사이트에 반영한다.

## 명령어
```
npm run dev      # 개발 서버 (http://localhost:4321)
npm run build    # dist/ 에 빌드
npm run preview  # 빌드 결과 미리보기
```

## 배포
`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드·배포한다.
