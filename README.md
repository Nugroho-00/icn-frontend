# 📋 Task Board Frontend

A modern, feature-rich task management application built with Next.js 16, React 19, and TypeScript. This application provides a clean and intuitive interface for managing tasks with AI-powered suggestions, real-time updates, and comprehensive task tracking features.

## ✨ Features

- **Task Management**: Create, read, update, and delete tasks with ease
- **Task Status Tracking**: Organize tasks by status (To Do, In Progress, Done)
- **AI-Powered Suggestions**: Get intelligent task suggestions powered by AI
- **Real-time Updates**: Instant UI updates with React Query
- **Advanced Filtering**: Filter tasks by status, title, and due date
- **Task Summary Dashboard**: Visual overview of task statistics by status
- **Overdue Task Alerts**: Automatic highlighting of overdue tasks
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Authentication**: Secure user authentication with sign-in/sign-up
- **Data Table**: Advanced table with sorting, pagination, and column visibility
- **Dark Mode Support**: Theme switching capability

## 🛠️ Tech Stack

### Core

- **Next.js 16**: React framework with App Router
- **React 19**: Latest React features
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework

### UI Components

- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Beautiful and customizable components
- **Lucide React & Tabler Icons**: Icon libraries
- **Reablocks**: Advanced UI components
- **Reachat**: Chat interface components

### State Management & Data Fetching

- **TanStack React Query**: Server state management
- **Zustand**: Client state management
- **Axios**: HTTP client

### Form Management

- **React Hook Form**: Performant form handling
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation integration

### Additional Libraries

- **Moment.js**: Date manipulation
- **Sonner**: Toast notifications
- **Class Variance Authority**: Component variants
- **clsx & tailwind-merge**: Conditional class names

## 📁 Project Structure

```
taskboard-frontend/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── ai/              # AI suggestions endpoint
│   │   ├── auth/            # Authentication endpoints
│   │   └── task/            # Task CRUD endpoints
│   ├── auth/                # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/           # Main dashboard
│   │   └── components/      # Dashboard-specific components
│   └── providers/           # React Query provider
├── components/              # Reusable UI components
│   ├── ui/                  # shadcn/ui components
│   └── sidebar.tsx
├── config/                  # Configuration files
│   ├── api-paths.ts         # API endpoint definitions
│   ├── env.ts               # Environment variables
│   └── index.ts
├── hooks/                   # Custom React hooks
│   ├── use-ai.ts            # AI suggestions hook
│   ├── use-auth.ts          # Authentication hooks
│   ├── use-task.ts          # Task management hooks
│   └── use-mobile.ts        # Mobile detection hook
├── lib/                     # Library code
│   ├── api/                 # API client functions
│   ├── axios/               # Axios instances
│   ├── services/            # Service layer
│   └── utils.ts             # Utility functions
├── store/                   # Zustand stores
│   └── sidebar.ts
├── types/                   # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   ├── task.ts
│   └── index.ts
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm 10 or higher (or yarn, pnpm, bun)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Nugroho-00/icn-frontend.git
cd icn-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🐳 Docker Deployment

The project includes a production-ready multi-stage Dockerfile optimized for deployment.

### Quick Start

**Using Docker Compose (Recommended):**

```bash
# Start application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop application
docker-compose down
```

**Using PowerShell Scripts:**

```powershell
# Build image
.\scripts\build.ps1

# Deploy container
.\scripts\deploy.ps1 -Port 3000
```

**Manual Docker Commands:**

```bash
# Build image
docker build -t taskboard-frontend:latest -f dockerfile .

# Run container
docker run -d \
  --name taskboard-frontend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  taskboard-frontend:latest
```

**Using Makefile (Linux/Mac):**

```bash
# Build
make build

# Run
make run

# View logs
make logs

# Check health
make health

# See all commands
make help
```

### Docker Features

- ✅ **Multi-stage build** - Minimal image size (~150-200MB)
- ✅ **Alpine Linux base** - Lightweight and secure
- ✅ **Next.js standalone** - Optimized production output
- ✅ **Non-root user** - Enhanced security
- ✅ **Health checks** - Auto-restart on failures
- ✅ **Build caching** - Faster rebuilds
- ✅ **Production optimized** - Environment variables support

### Environment Configuration

Copy `.env.example` to `.env.production` and configure:

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=http://your-backend-api
NEXT_PUBLIC_APP_URL=http://your-domain.com
```

### Health Check

Access health endpoint at: `http://localhost:3000/api/health`

```json
{
  "status": "ok",
  "timestamp": "2025-10-28T10:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### Available Scripts

| Script                   | Description               |
| ------------------------ | ------------------------- |
| `.\scripts\build.ps1`    | Build Docker image        |
| `.\scripts\deploy.ps1`   | Deploy container          |
| `docker-compose up -d`   | Start with Docker Compose |
| `docker-compose logs -f` | View logs                 |
| `docker-compose down`    | Stop services             |
| `make build`             | Build (Linux/Mac)         |
| `make run`               | Run (Linux/Mac)           |
| `make logs`              | View logs (Linux/Mac)     |

### Deployment Files

- `dockerfile` - Multi-stage production Dockerfile
- `docker-compose.yml` - Docker Compose configuration
- `.dockerignore` - Files excluded from build context
- `.env.example` - Environment variables template
- `scripts/build.ps1` - PowerShell build script
- `scripts/deploy.ps1` - PowerShell deployment script
- `scripts/build.sh` - Bash build script
- `Makefile` - Make commands for Docker operations
- `DOCKER-README.md` - Complete Docker documentation

📖 **For detailed Docker deployment guide**, see [DOCKER-README.md](./DOCKER-README.md)

## 🎯 Key Features Explained

### Task Management

- **CRUD Operations**: Full create, read, update, delete functionality
- **Status Workflow**: Todo → In Progress → Done
- **Due Date Tracking**: Visual indicators for overdue tasks
- **Bulk Actions**: Select multiple tasks for batch operations

### AI Integration

- **Smart Suggestions**: AI-powered task title and description suggestions
- **Context-Aware**: Suggestions based on your task history
- **One-Click Apply**: Apply AI suggestions directly to task forms

### Data Table

- **Column Sorting**: Sort by any column
- **Advanced Filtering**: Multiple filter criteria
- **Column Visibility**: Show/hide columns as needed
- **Pagination**: Navigate through large datasets
- **Responsive**: Adapts to different screen sizes

### Authentication

- **Secure Sign-In/Sign-Up**: User authentication
- **Session Management**: Persistent login sessions
- **Protected Routes**: Middleware-based route protection

## 🔌 API Integration

The frontend communicates with a backend API for all data operations:

- **Authentication**: `/api/auth/sign-in`, `/api/auth/sign-up`, `/api/auth/sign-out`
- **Tasks**: `/api/task` (GET, POST, PUT, DELETE)
- **Task Summary**: `/api/task/status-summary`
- **AI Suggestions**: `/api/ai`

## 🎨 Styling

The project uses:

- **Tailwind CSS 4**: Utility-first styling
- **CSS Variables**: For theming
- **Dark Mode**: Built-in theme support
- **Custom Components**: Styled with shadcn/ui

## 📦 State Management

- **Server State**: TanStack React Query for API data caching and synchronization
- **Client State**: Zustand for UI state (sidebar, modals, etc.)
- **Form State**: React Hook Form for form handling

## 🧪 Testing

The project includes comprehensive testing setup with Jest and React Testing Library:

### Test Structure

```
__tests__/
├── components/          # Component tests
│   ├── button.test.tsx
│   └── input.test.tsx
├── hooks/              # Custom hooks tests
│   └── use-task.test.tsx
└── lib/                # Service and utility tests
    ├── ai.service.test.ts
    ├── auth.service.test.ts
    ├── task.service.test.ts
    └── utils.test.ts
```

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode - re-run tests on file changes
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

Coverage reports are generated in the `coverage/` directory and include:

- HTML report: `coverage/lcov-report/index.html`
- JSON summary: `coverage/coverage-final.json`
- LCOV format: `coverage/lcov.info`

### Testing Technologies

- **Jest 30**: Testing framework
- **@testing-library/react**: React component testing
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation
- **ts-jest**: TypeScript support for Jest
- **jest-environment-jsdom**: DOM environment for tests

## 🔍 Code Quality & Linting

### ESLint Configuration

The project uses ESLint 9 with flat config format for code quality:

- **TypeScript ESLint**: Type-aware linting rules
- **React Plugin**: React-specific linting rules
- **React Hooks Plugin**: Hooks rules enforcement
- **JSX A11y Plugin**: Accessibility linting

### Running Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Linting Technologies

- **ESLint 9**: Modern flat config format
- **@typescript-eslint/parser**: TypeScript support
- **@typescript-eslint/eslint-plugin**: TypeScript rules
- **eslint-plugin-react**: React best practices
- **eslint-plugin-react-hooks**: React Hooks rules
- **eslint-plugin-jsx-a11y**: Accessibility rules
- **globals**: Global variables definitions

## 🔐 Environment Variables

| Variable              | Description      | Default                   |
| --------------------- | ---------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL  | `https://api.example.com` |
| `NEXT_PUBLIC_APP_URL` | Frontend app URL | `http://localhost:3000`   |
| `NODE_ENV`            | Environment mode | `development`             |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

For support, open an issue in the [GitHub repository](https://github.com/Nugroho-00/icn-frontend/issues).

## 👤 Author

**Satrio Nugroho**

- GitHub: [@Nugroho-00](https://github.com/Nugroho-00)
- Repository: [taskboard-frontend](https://github.com/Nugroho-00/icn-frontend)

---

Built with ❤️ using Next.js 16 and React 19
