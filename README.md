# Todo App - Medyanes Task

Bu proje **Next.js**, **Tailwind CSS**, **Prisma**, **MongoDB** ve **Zustand** ile yapılmış tam özellikli bir Todo uygulamasıdır.

## 🚀 Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Prisma** - ORM
- **MongoDB** - Database
- **Zustand** - State management

## 📋 Özellikler

- ✅ Todo ekleme (title + description)
- ✅ Todo düzenleme
- ✅ Todo tamamlama/geri alma
- ✅ Todo silme
- ✅ Responsive tasarım
- ✅ Modern UI/UX
- ✅ Real-time güncellemeler

## 🛠️ Kurulum

### 1. Repository'yi klonlayın

```bash
git clone <repo-url>
cd medyanes-task
```

### 2. Dependencies yükleyin

```bash
npm install
```

### 3. Environment variables ayarlayın

`.env.local` dosyasını oluşturun ve MongoDB connection string'inizi ekleyin:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 4. Prisma setup

```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Development server'ı başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

```
medyanes-task/
├── components/          # React komponentleri
│   ├── TodoForm.tsx    # Todo ekleme formu
│   ├── EditTodoForm.tsx # Todo düzenleme formu
│   ├── TodoItem.tsx    # Tekil todo item
│   ├── TodoList.tsx    # Todo listesi
│   └── types.ts        # TypeScript tipleri
├── pages/
│   ├── api/
│   │   └── todos/      # API endpoints
│   └── index.tsx       # Ana sayfa
├── services/
│   ├── fetchAPI/       # HTTP client
│   └── serviceOperations/ # Database işlemleri
├── store/
│   └── todoStore.ts    # Zustand store
├── lib/
│   └── prisma/         # Prisma client
└── prisma/
    └── schema.prisma   # Database schema
```

## 🔧 Available Scripts

- `npm run dev` - Development server başlatır
- `npm run build` - Production build oluşturur
- `npm run start` - Production server başlatır
- `npm run prisma:generate` - Prisma client oluşturur
- `npm run prisma:push` - Database schema'yı push eder
- `npm run prisma:studio` - Prisma Studio açar

## 🌐 API Endpoints

### GET /api/todos

Tüm todoları getirir.

### POST /api/todos

Yeni todo oluşturur.

```json
{
  "title": "Todo title",
  "content": "Todo description (optional)"
}
```

### GET /api/todos/[id]

Belirli bir todo getirir.

### PUT /api/todos/[id]

Todo günceller.

```json
{
  "title": "Updated title",
  "content": "Updated description",
  "completed": true
}
```

### DELETE /api/todos/[id]

Todo siler.

## 🎨 UI/UX Features

- **Dark theme** - Modern koyu tema
- **Gradient effects** - Güzel gradient efektleri
- **Hover animations** - Interaktif hover efektleri
- **Loading states** - Loading göstergeleri
- **Error handling** - Hata yönetimi
- **Responsive design** - Mobil uyumlu tasarım

## 🔄 State Management Architecture

```
Component → Zustand Store → FetchAPI → API Routes → ServiceOperations → Prisma → MongoDB
```

## 📱 Kullanım

1. **Todo Ekleme**: Ana sayfada title ve description girerek todo ekleyin
2. **Todo Tamamlama**: Todo'ya tıklayarak tamamlandı olarak işaretleyin
3. **Todo Düzenleme**: Edit butonuna tıklayarak todo'yu düzenleyin
4. **Todo Silme**: Delete butonuna tıklayarak todo'yu silin

## 🚧 Geliştirme Notları

- MongoDB Atlas kullanmanız önerilir
- `.env.local` dosyasını `.gitignore`'a eklemeyi unutmayın
- Production'da environment variables'ları doğru set ettiğinizden emin olun
