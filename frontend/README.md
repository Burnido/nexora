# Frontend - Nexora

Next.js + Tailwind CSS frontend for the ADHD support platform.

## 📦 Install Dependencies

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Directory Structure

- **pages/** - Next.js page components (routes)
- **components/** - Reusable React components
- **styles/** - Global CSS and Tailwind utilities
- **public/** - Static assets
- **tailwind.config.js** - Tailwind CSS configuration with custom colors

## 🎨 Design System

### Colors
- Navy: Primary dark color (#1a1e26)
- Cream: Background and light color (#fdfbf7)
- Sage: Accent color (#8fb899)

### Typography
- Display - For large headings
- Heading - For section headings
- Subheading - For subsections
- Body - For regular text
- Caption - For small text

### Components
- Header - Navigation bar
- Hero - Landing page hero section
- Features - Feature showcase
- Solutions - Solutions overview
- Footer - Footer with links

## 🔗 API Integration

The frontend connects to the backend API at:
```
http://localhost:5000/api
```

Update in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🛣️ Routes

- `/` - Home page
- `/signin` - Sign in
- `/signup` - Sign up (to be created)
- `/dashboard` - Dashboard (to be created)
- `/ai` - AI Studio (to be created)

## 📝 Notes

- No rounded corners used - all edges are sharp for clean, brutalist design
- Minimal animations for better ADHD focus
- High contrast for accessibility
- Mobile-first responsive design

## 🚀 Deployment

Ready for deployment to Vercel, Netlify, or any static host.

```bash
npm run build
# Deploy the .next folder
```
