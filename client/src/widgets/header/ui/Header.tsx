import { LanguageSwitcher } from "widgets/language-switcher";

export const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-3 relative">
          <svg
            className="w-full h-full text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path
              d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
              fill="white"
            />
            <path
              d="M12 11c-0.55 0-1 0.45-1 1s0.45 1 1 1 1-0.45 1-1-0.45-1-1-1z"
              fill="#1E40AF"
            />
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          TrackFlow
        </h1>
      </div>
      <LanguageSwitcher />
    </div>
  </header>
);
