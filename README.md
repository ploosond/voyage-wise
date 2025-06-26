# 🌍 Voyage Wise - Travel Planner

A modern, full-stack travel planning application built with Next.js 15 that helps you create, organize, and visualize your travel itineraries with an interactive globe and maps integration.

![Landing Page](.images/LandingPage.png)

## ✨ Features

- **Trip Management**: Create, edit, and organize multiple trips with dates and descriptions
- **Location Management**: Add destinations to your trips with precise geocoding
- **Drag & Drop Itinerary**: Reorder locations in your trip with intuitive drag-and-drop functionality
- **Interactive Maps**: View your trip locations on Google Maps integration
- **3D Globe Visualization**: Explore all your visited locations on a beautiful 3D globe

- **NextAuth.js Integration**: Secure authentication system

## 📸 Screenshots

### 🗺️ Trips Dashboard

![Trips Page](.images/TripsPage.png)

### 📋 Trip Details & Itinerary

![Trip Page 1](.images/TripPag1.png)
![Trip Page 2](.images/TripPage2.png)
![Trip Page 3](.images/TripPage3.png)
![Trip Page 4](.images/TripPage4.png)

### 🌍 Interactive Globe View

![Globe Page](.images/GlobePage.png)

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Globe.GL](https://github.com/vasturiano/react-globe.gl)** - 3D globe visualization
- **[@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)** - Google Maps integration

- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Maps API key
- UploadThing API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/voyage-wise.git
   cd voyage-wise
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/travel_planner"

   # NextAuth
   AUTH_SECRET="your-secret-key"

   # OAuth Providers (optional)
   AUTH_GITHUB_ID="your-github-client-id"
   AUTH_GITHUB_SECRET="your-github-client-secret"

   # Google Maps API
   GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

   # UploadThing
   UPLOADTHING_TOKEN="your-uploadthing-secret"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🙏 Acknowledgments

- [Next.js team](https://nextjs.org/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Vercel](https://vercel.com/) for hosting and deployment
- [Three.js](https://threejs.org/) and Globe.GL for 3D visualizations

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
