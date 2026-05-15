# 도와유 홈페이지 — 작업 가이드

정적 사이트(빌드 도구 없음). HTML/CSS/JS만 수정하면 바로 반영. 브라우저로 `index.html` 열어서 확인.

## 파일 구조

```
dowayou/
├── index.html        # 모든 페이지(섹션) + 인라인 스크립트
├── css/style.css     # 모든 스타일
├── js/nav.js         # 페이지 전환 함수 nav(pageId)
└── image/            # 이미지·동영상 자산
```

## 사이트 구조 (SPA 패턴)

`index.html`은 한 페이지지만, `<section id="..." class="page">` 7개를 두고 사이드바 클릭 시 `nav('id')`가 한 섹션만 `display:block`으로 바꿔 SPA처럼 동작함.

| ID | 화면 | 라인 위치 (대략) |
|---|---|---|
| `home` | 홈 | index.html:56 |
| `story` | 코치 스토리 | index.html:312 |
| `program` | 프로그램 (10X 부스터로이드) | index.html:506 |
| `portfolio` | 수강생 사례 | index.html:746 |
| `blog` | 블로그 | index.html:852 |
| `youtube` | 유튜브 | index.html:924 |
| `ebook` | 전자책 | index.html:1011 |
| `apply` | 코칭 신청 | index.html:1034 |

새 페이지 추가 시: `<section id="새이름" class="page">…</section>` 하나 더 만들고, 사이드바 `<nav>`에 `<a class="nav-a" data-page="새이름" onclick="nav('새이름')">` 추가.

## 디자인 토큰

`css/style.css:31` `:root`에 정의됨. 색을 바꿀 땐 여기만:

```css
--gold: #c8a96e;   /* 강조색 (CTA, em, 라벨) */
--bg: #0d0d0b;     /* 메인 배경 */
--sidebar: #1a1a1a;
--sdivider: #333333;
```

본문 텍스트는 거의 `#f0ede6`(연한 베이지) 또는 `rgba(240,237,230,0.5~0.8)` 톤. 새 다크 섹션 만들 때 이 톤 유지.

## CSS 네이밍 규칙

페이지별 prefix로 충돌 회피. 새 클래스 만들 땐 같은 규칙 따라가기.

- `home-*` — 홈
- `story-*`, `chN-*` (ch1~ch4) — 스토리
- `prog2-*` — 프로그램
- `pf-*` — 포트폴리오
- `blog-*`, `yt-*` — 블로그/유튜브
- `ebook-*`, `apply-*` — 전자책/신청

공용 유틸: `.btn-gold`, `.btn-back`, `.gold-bar`, `.wcard`, `.s-reveal`(스크롤 등장 애니메이션).

## 재사용되는 컴포넌트 — 두 곳을 같이 보세요

같은 컴포넌트가 여러 페이지에 복제돼 있음. **한 쪽 수정하면 다른 쪽도 같이 확인 필요.**

| 컴포넌트 | 위치 |
|---|---|
| Case 슬라이더 (수강생 사례 카드) | `index.html:678` (program) + `index.html:756` (portfolio) — `program-case1~7.png` 사용 |
| 후기 마퀴 (gallery 이미지) | `index.html:200` (home) + `index.html:820` (portfolio) — `gallery1~7.png` 사용 |
| 후기 텍스트 카드 (Naaa36 / 장새롬) | `index.html:165` (home, 텍스트 그대로) + `index.html:760-770` (portfolio, prog2-case-card 형태) |
| Hero 헤더 패턴 (`.{page}-hero`) | apply / blog / ebook / portfolio가 같은 구조. 새 페이지도 이 패턴 따라갈 것. |

## 슬라이더 (case studies) 추가하기

JS 함수 `initCaseSlider(trackId, dotsId, prevId, nextId)` ([index.html:1228](index.html#L1228))로 일반화돼 있음. 새 슬라이더 만들면:

1. HTML 클래스는 `prog2-slider-*` / `prog2-case-card` 그대로 재사용 (CSS 공유)
2. ID만 새로 부여 (예: `xxxSliderTrack`, `xxxDots`, `xxxPrev`, `xxxNext`)
3. 스크립트 끝에 `initCaseSlider('xxxSliderTrack', 'xxxDots', 'xxxPrev', 'xxxNext');` 추가

## 마퀴 (자동 스크롤 이미지 행)

CSS 애니메이션 기반 — JS 호출 불필요. HTML만 복제하면 자동 작동.
- `home-marquee-track--fwd` (왼쪽으로 흐름) / `--rev` (오른쪽으로 흐름)
- 자연스러운 무한 루프를 위해 같은 이미지 세트를 **2번 반복해서 넣어야 함** (예: review1~7을 두 번)
- 호버 시 일시 정지

## 이미지 자산 규칙

`image/` 폴더에 원본 그대로 두고 HTML에서 상대경로로 참조 (`image/xxx.png`). 한글/공백 파일명은 URL 인코딩 (`image/program-cta-bg%20(2).jpeg`).

자주 쓰는 묶음:
- `program-case1~7.png` — 수강생 사례 슬라이더
- `review1~7.png`, `gallery1~7.png` — 후기 마퀴
- `story-ch1~4*.jpg/png` — 스토리 챕터
- `hero5.jpg`, `1 (1).jpeg/jpg/png`, `1 (2).jpg` — 히어로/카드 배경
- `3.mp4`, `program-hero.mp4` — 비디오

## 인라인 스크립트 위치

대부분의 JS는 `index.html` 맨 아래 `<script>` 블록(약 1190~1260행):
- `nav()` 오버라이드 (블로그/유튜브 데이터 lazy load + 스크롤 reveal 재실행)
- `initAutoScroll()` — 마퀴용 (현재는 사용 안 됨, CSS 애니메이션이 대체)
- `IntersectionObserver` 기반 `s-reveal` 애니메이션
- `loadBlogPosts()` — 네이버 블로그 RSS 로드
- `loadYoutubeVideos()` — 유튜브 데이터 로드
- `initCaseSlider()` — 케이스 슬라이더

## 외부 링크 (자주 바뀜)

- 코칭 신청 카카오톡 채널: `https://pf.kakao.com/_xotYHn`
- 신청서 (Tally): `https://tally.so/r/68KDlA`
- 전자책: `https://geekus.kr/10xburopt/classroom`
- 유튜브 채널: `UCmd6ESuIOTy4MyGSCWnvZHA`
- 블로그: `blog.naver.com/diet-999`

URL 변경 시 `index.html`에서 grep으로 모두 찾아 일괄 교체.

## 작업 시 주의사항

1. **페이지별 prefix 지키기.** 다른 페이지 클래스명을 그대로 가져다 쓰면 의도치 않은 스타일 적용 위험.
2. **컴포넌트 복제 시 ID 충돌 주의.** 같은 ID는 한 DOM에 하나만 — slider 등 ID 의존 JS는 새 ID로 갈고 `initCaseSlider` 한 줄 추가.
3. **수강생/케이스 데이터는 여러 곳에 복제돼 있음.** 추가/수정 시 위 "재사용되는 컴포넌트" 표 참고해 같이 업데이트.
4. **이미지 추가 시 파일명 규칙 따라가기** (`review8.png`, `gallery8.png` 식).
5. **PowerShell 환경.** 셸 명령은 PowerShell 문법 (`$env:`, `;` chaining 등) 사용.

## 모바일 반응형

현재 부분적으로만 대응(ebook/apply hero 일부). 전반적인 모바일 최적화는 페이지별로 점진 작업 예정.

## 향후 개선 제안 (참고)

- 수강생 후기·케이스를 `data/cases.json` 등으로 분리하고 JS로 렌더링하면 한 곳만 수정해도 모든 페이지 반영 가능 (현재는 복붙 구조).
- `index.html`이 1300줄+ 이라 섹션별로 분리하려면 빌드 도구 도입 필요 (Vite, Astro 등). 지금 규모라면 정적 단일 파일 유지가 더 간단.
