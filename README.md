<div align="center">

# 📝 Highstar's Log

**노션에 쓰면 자동으로 발행되는 개발 기록 사이트**

![status](https://img.shields.io/badge/status-in%20development-orange)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Notion](https://img.shields.io/badge/Notion%20API-000000?logo=notion&logoColor=white)

</div>

---

## 🚧 개발 진행 중!

현재 기본 구조를 만들고 있는 중이고, 현재 자동 빌드와 배포는 Vercel로 완료했어요.
이제는 블로그처럼 댓글과 기타 기능 구현이 목적이에요.

추가로 AI를 활용한 시험 기능도 추가해 볼 생각입니다.

## ✨ 만들고 싶은 기능

- [x] 프로젝트 세팅 (Next.js + TypeScript)
- [x] 노션 DB 연결 (공개 글 목록 가져오기)
- [x] 노션 본문 → 마크다운 변환 및 상세 페이지
- [ ] 이미지 저장 처리
- [x] 자동 갱신 및 배포 (Vercel)
- [ ] 댓글 (giscus)
- [ ] AI의 시험 출제와 풀이

## 🛠 Tech Stack

| 구분 | 사용 기술 |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Notion API |
| Deploy | Vercel (완료) |

## 🚀 Getting Started

```bash
git clone <this-repo-url>
cd <project-folder>
npm install
```

`.env.local` 파일을 만들고 아래 값을 채워 주세요.

```bash
NOTION_TOKEN=
NOTION_DATA_SOURCE_ID=
```

```bash
npm run dev
```

## 📌 License

MIT

## 🔗 Link

https://highstar-notion-study.vercel.app/