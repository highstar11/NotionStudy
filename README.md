<div align="center">

# 📝 My Study In Notion

**노션에 쓰면 자동으로 발행되는 개발 기록 사이트**

![status](https://img.shields.io/badge/status-in%20development-orange)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Notion](https://img.shields.io/badge/Notion%20API-000000?logo=notion&logoColor=white)

</div>

---

## 🚧 개발 중입니다

현재 기본 구조를 만들고 있는 초기 단계예요.
노션에서 공부 기록을 쓰고, 상태를 **공개**로 바꾸기만 하면 사이트에 올라가는 것을 목표로 해요.

## ✨ 만들고 싶은 기능

- [x] 프로젝트 세팅 (Next.js + TypeScript)
- [ ] 노션 DB 연결 (공개 글 목록 가져오기)
- [ ] 노션 본문 → 마크다운 변환 및 상세 페이지
- [ ] 이미지 저장 처리
- [ ] 자동 갱신 및 배포 (Vercel)
- [ ] 댓글 (giscus)
- [ ] 공부 기록 레벨업 시스템 (XP, 스트릭, 뱃지) 🎮

## 🛠 Tech Stack

| 구분 | 사용 기술 |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Notion API |
| Deploy | Vercel (예정) |

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