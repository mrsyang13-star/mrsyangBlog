# mrsyangBlog

정적 HTML/CSS/JavaScript로 구성한 1페이지 블로그입니다.

## 구조

- `index.html` — 메인 페이지
- `styles.css` — 반응형 스타일
- `script.js` — 글 목록/검색/카테고리 렌더링
- `posts.json` — 글 목록 관리 파일
- `posts/` — 개별 글 HTML
- `sitemap.xml` — 검색엔진 사이트맵
- `robots.txt` — 크롤러 정책 및 사이트맵 안내

## 글 추가

1. `posts/새글이름.html`을 만듭니다.
2. `posts.json`에 제목, 날짜, 카테고리, 요약, URL을 추가합니다.
3. `sitemap.xml`에 새 글 URL을 추가합니다.
4. GitHub에 커밋/푸시하면 배포 환경에서 새 글이 반영됩니다.

## 배포

GitHub Pages, Vercel, Netlify 같은 정적 호스팅에 연결할 수 있습니다.

> 현재 `sitemap.xml`, canonical URL, 구조화 데이터의 URL은 임시 GitHub Pages 주소를 기준으로 작성했습니다. 실제 Vercel/Netlify 도메인이 정해지면 해당 URL로 한 번에 변경해야 합니다.

## 네이버 서치어드바이저

- 실제 배포 URL을 확정합니다.
- `index.html`의 네이버 사이트 소유확인 메타 태그를 발급 코드로 교체합니다.
- 실제 도메인 기준으로 `sitemap.xml`과 `robots.txt`의 URL을 수정합니다.
- 네이버 서치어드바이저에서 사이트 등록 및 사이트맵 제출을 진행합니다.
