# 👑 Gondor Chic

Application web full-stack.

## Stack

- **Frontend** — Next.js 15, React 19, Tailwind CSS
- **Backend** — Spring Boot (Java)

## Structure

```
gondor-chic/
├── frontend/    # Next.js
├── backend/     # Spring Boot
└── README.md
```

## Lancer le projet

**Frontend**
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

**Backend**
```bash
cd backend
./mvnw spring-boot:run
# → http://localhost:8080
```

## Variables d'environnement

`frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```