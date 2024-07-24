# Portfolio

프론트엔드개발자로서의 포트폴리오 프로젝트입니다.
개발 기간: 2024-07-24 ~ 진행중

# Convention

커밋메시지 컨벤션은

# Architecture

# 개발환경

- NextJS
- Yarn
- ESlint & Prettier

# Skills

# Libraries

- TailwindCSS
- Supabase ?

# flowchart
```mermaid
---
title: 🔥 jngmnj portfolio website 🔥
---
flowchart LR
	Home[메인화면]
    Sidebar(사이드바)
    Header(헤더)
    Footer(푸터)
    PostList(블로그글 목록)
    ProjectList(프로젝트 리스트)
    
    Home --- Header
	Home --- Footer
    
    Create[글 작성화면]
    Admin[어드민 화면]
    Chatbot[챗봇 화면]
    About[About Me]
    Projects[Projects]
    Contact[Contact]
    Blog[Blog]
    ChatbotResult(챗봇 답변)
    ProjectDetail[프로젝트 상세 화면]
    PostDetail[글 상세 화면]
    
    Athorize{인증여부}


    TagList[태그 목록 화면]
    Tag(태그별 글 목록)
    Category(카테고리 별 글 목록)
    
    Header -.-> About
    Header -.-> Projects --- ProjectList -.-> ProjectDetail 
    Header -.-> Contact
    Header -.-> Blog --- PostList -.-> PostDetail --- Sidebar
    Header -.-> Chatbot --- ChatbotResult
    ChatbotResult -.-> PostDetail
    ChatbotResult -.-> ProjectList
    PostList -.-> TagList -.-> Tag -.-> Detail
    Sidebar -.-> Category -.-> Detail
    Footer --> Athorize -.->|Yes| Create -.-> Detail
    Athorize -.->|No|Admin
    Footer -.-> Admin -.-> Create
```