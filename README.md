# AQbar 공식 웹사이트 (v4)

**운영 중인 실제 서비스 사이트입니다.** 이 레포의 `main` 에 푸시하면 `https://aqbar.ai` 에 그대로 반영됩니다. (2026-10-14 v3 → v4 도메인 전환 완료)

- 서비스 주소: **https://aqbar.ai**
- 배포 방식: GitHub Pages (`main` 브랜치 기준 자동 배포)
- 연결 도메인: `CNAME` 파일에 `aqbar.ai` (지우지 마세요. 지우면 도메인 연결이 끊깁니다)

> ⚠️ `main` 에 푸시하는 순간 운영 사이트가 바뀝니다.
> 작업은 항상 별도 브랜치에서 하고, 로컬에서 눈으로 확인한 뒤 합치세요.

---

## 기술 구성

빌드 도구가 **없습니다.** HTML·CSS·JavaScript 파일이 그대로 서비스됩니다.

- 프레임워크 없음, `package.json` 없음, `npm install` 필요 없음
- **한 페이지짜리 사이트**입니다. 메인 페이지(`index.html`) 안에 `<style>` 과 `<script>` 를 함께 담고 있습니다
- 디자인 도구에서 내보낸 묶음 파일을 일반 HTML 로 옮긴 것이라, 스타일이 각 태그의 `style="..."` 에 직접 적혀 있습니다
- 화면 폭에 따라 달라지는 값(여백, 메뉴 표시 등)은 `index.html` 상단 `<style>` 의 `:root` 변수(`--m-...`)에 모여 있습니다. **760px 미만이 모바일**입니다
- 글꼴은 직접 포함(self-host)합니다 — 외부 CDN 에 의존하지 않습니다
  - 본문: Pretendard Variable (조각 파일 방식이라 화면에 쓰인 글자가 든 파일만 내려받음)
  - 제목: Paperlogy
- `.nojekyll` : GitHub Pages 의 Jekyll 처리를 끄는 빈 파일 (지우지 마세요)

---

## 폴더 구조

```
.
├── index.html                  메인 페이지 (/) — 사이트 전체
├── privacy/index.html          개인정보 처리방침 (/privacy/)
├── privacy/v1-1/index.html     이전 버전 처리방침 보관본 (/privacy/v1-1/, 검색 제외)
├── hiring/index.html           옛 주소 → 메인으로 자동 이동
├── diagnosis/index.html        옛 주소 → 메인으로 자동 이동
│
├── contact-config.js           문의 폼 전송 주소 설정
├── contact-form.js             문의 폼 동작 로직
├── google-apps-script/
│   └── contact-handler.gs      문의 접수 서버 코드 백업본
│
├── assets/
│   ├── aqbar-logo.svg          로고 (밝은 배경용, 검정 글자)
│   ├── aqbar-logo-white.svg    로고 (어두운 배경용, 흰 글자)
│   ├── aqbar-symbol.svg        심볼 (점 16개)
│   └── og-main.png             카카오톡·링크 공유 미리보기 이미지 (1200×630)
├── media/
│   ├── film-1080.mp4           서비스 영상 (PC용)
│   ├── film-720.mp4            서비스 영상 (모바일용)
│   └── film-poster.jpg         영상 로딩 전 보이는 대표 이미지
├── fonts/
│   ├── pretendard-variable/    Pretendard 글꼴
│   └── paperlogy/              Paperlogy 글꼴
│
├── favicon.ico / favicon.svg / favicon-32.png / apple-touch-icon.png
├── robots.txt                  검색엔진 수집 규칙
├── sitemap.xml                 검색엔진용 페이지 목록
├── CNAME                       연결 도메인 (aqbar.ai)
└── .nojekyll                   GitHub Pages 설정용 빈 파일
```

---

## 메인 페이지 구성

메뉴 순서: 평가 과정 → AQbar 리포트 → 도입 → One Standard → FAQ → 문의하기

| 순서 | 섹션 | `id` |
|---|---|---|
| 1 | 히어로 (타이핑 문구 + 평가 화면 예시) | `top` |
| 2 | Beyond the Answer | – |
| 3 | 서비스 영상 | `film` |
| 4 | AQbar 리포트 | `report` |
| 5 | 7개 지표 | – |
| 6 | Why AQbar | – |
| 7 | 도입 효과 + Free Trial 안내 | `trust` |
| 8 | One Standard (채용 평가 · 조직 진단 · 역량 트래킹) | `standard` |
| 9 | 자주 묻는 질문 | `faq` |
| 10 | 문의하기 | `contact` |

`/hiring/`, `/diagnosis/` 는 v3 까지 있던 별도 페이지 주소입니다. 검색 결과나 예전에 공유된 링크로
들어오는 방문자를 위해 **홈페이지 맨 위(첫 화면)로 자동 이동**시키는 작은 안내 페이지만 남겨 두었습니다.

---

## 서비스 영상

- 원본 영상(74초)에서 인트로를 잘라 **평가 세션 입장 화면(17.75초)부터** 시작하도록 만든 파일입니다
- 방문자가 영상 근처로 스크롤했을 때만 내려받고, 화면에 60% 이상 보일 때만 소리 없이 재생됩니다
- 화면 폭 760px 미만이면 `film-720.mp4`, 그 이상이면 `film-1080.mp4` 를 씁니다
- 영상을 바꾸려면 같은 이름으로 세 파일(`film-1080.mp4`, `film-720.mp4`, `film-poster.jpg`)을 교체합니다

---

## 로컬에서 미리보기

파일을 브라우저로 직접 여는 것(`file://`)은 **권장하지 않습니다.**
`/contact-form.js` 같은 절대경로 링크가 깨져서 실제와 다르게 보입니다.

프로젝트 폴더에서 아래 명령어를 실행하세요.

```
python3 -m http.server 8000
```

그다음 브라우저에서 접속합니다.

```
http://localhost:8000
```

끄고 싶을 때는 터미널에서 `Ctrl + C` 를 누르면 됩니다.

---

## 문의 폼이 동작하는 구조

```
방문자가 관심 항목을 고르고 이름·이메일·회사명 입력 후 [문의하기]
      ↓
contact-form.js  ← 입력값 확인 후 전송
      ↓
contact-config.js 에 적힌 Google Apps Script 주소로 POST
      ↓
Google 스프레드시트에 한 줄 기록 + 담당자 이메일 알림 발송
```

- 관심 항목: `Free Trial` / `채용 평가` / `조직 진단` / `샘플 리포트` (여러 개 선택 가능)
- 스프레드시트의 `문의 유형` 칸에 선택한 관심 항목이 `Free Trial, 채용 평가` 처럼 기록됩니다
- 전송 주소를 바꾸려면 `contact-config.js` 의 `webAppUrl` 을 수정합니다
- 서버 쪽 코드는 `google-apps-script/contact-handler.gs` 에 백업되어 있습니다.
  이 파일은 **백업본일 뿐이라 여기서 고쳐도 반영되지 않습니다.**
  실제 수정은 Google Apps Script 콘솔에서 하고, 반드시 **새 버전으로 재배포**해야 적용됩니다
- 문의가 접수되면 Google Analytics 4 에 `generate_lead` 이벤트가 기록됩니다

> 테스트로 폼을 제출하면 실제 스프레드시트에 쌓이고 알림 메일도 갑니다.
> 테스트할 때는 이름 칸에 **"테스트"** 라고 적어 주세요.

---

## 자주 하는 수정 작업

| 하고 싶은 것 | 고칠 곳 |
|---|---|
| 페이지 문구 수정 | `index.html` |
| FAQ 질문·답변 | `index.html` 의 `id="faq"` 섹션 (`class="aq-faq"` 묶음 하나가 질문 하나) |
| 문의 폼 전송 주소 변경 | `contact-config.js` |
| 카카오톡 공유 시 나오는 이미지 | `assets/og-main.png` (1200×630) |
| 브라우저 탭 아이콘 | `favicon.svg`, `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png` |
| 검색 결과 제목·설명 | `index.html` `<head>` 의 `<title>`, `meta description` |

---

## 검색엔진(SEO) 관련

- `robots.txt` : 모든 검색로봇 수집 허용. 네이버(`Yeti`) 규칙도 포함
- `sitemap.xml` : 메인과 개인정보 처리방침 2개 등록. **페이지를 추가하면 여기에도 추가해야 합니다**
- `canonical`, `og:` 태그가 `https://aqbar.ai/` 기준으로 설정되어 있습니다
- 페이지 글자가 HTML 에 그대로 들어 있어 검색로봇이 내용을 읽을 수 있습니다

---

## 개인정보 처리방침 개정 절차

1. 현재 `privacy/index.html` 을 `privacy/vX-Y/index.html` 로 복사해 보관합니다.
   본문은 그대로 두고 `noindex`, 제목의 버전 표기, 상단 안내(적용 기간과 현행 방침 링크)만 추가합니다
2. `privacy/index.html` 을 새 버전으로 수정하고 버전·고지일·시행일, 제14조 변경 이력을 갱신합니다
3. 실질적인 변경은 **시행 7일 전**에 게시하고, 시행일 전까지 상단에 "시행 예정" 안내를 둡니다
4. 시행일이 지나면 "시행 예정" 안내만 삭제합니다
5. `sitemap.xml` 의 `/privacy/` `lastmod` 를 게시일로 바꿉니다

---

## 방문자 분석

Google Analytics 4 가 모든 페이지에 설치되어 있습니다. (측정 ID: `G-YD8F18L7QG`)

---

## 레포 이력

- `aqbar-website-v4` — **현재 버전 (이 레포)**
- `aqbar-website-v3` — 이전 버전 (2026-10-14 까지 운영). private 으로 전환해 보관
- `aqbar-website-v2`, `aqbar-website-v1` — 이전 버전. private 으로 보관 중

---

## 주의할 점

- **헤더·푸터가 메인(`index.html`)과 개인정보 처리방침 두 페이지(`privacy/`, `privacy/v1-1/`)에 각각 따로 있습니다.** 메뉴·푸터를 바꾸면 세 파일을 모두 고쳐야 합니다
- **메인 페이지의 `z-index` 는 현재 최대 20** (상단 고정 메뉴). 그 위에 무언가를 띄우려면 30 이상을 쓰세요
