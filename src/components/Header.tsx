interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-white text-sm uppercase tracking-widest font-semibold">
          Методический центр
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a href="#materials" className="text-white hover:text-yellow-300 transition-colors duration-300 uppercase text-xs sm:text-sm tracking-wide">
            Методические материалы
          </a>
          <a href="#seminars" className="text-white hover:text-yellow-300 transition-colors duration-300 uppercase text-xs sm:text-sm tracking-wide">
            Семинары
          </a>
          <a href="#dpp" className="text-white hover:text-yellow-300 transition-colors duration-300 uppercase text-xs sm:text-sm tracking-wide">
            ДПП ПК
          </a>
          <a href="#letters" className="text-white hover:text-yellow-300 transition-colors duration-300 uppercase text-xs sm:text-sm tracking-wide">
            Методические письма
          </a>
          <a href="#contacts" className="text-white hover:text-yellow-300 transition-colors duration-300 uppercase text-xs sm:text-sm tracking-wide">
            Контакты
          </a>
        </nav>
      </div>
    </header>
  );
}