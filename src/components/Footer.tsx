export default function Footer() {
  return (
    <div
      id="contacts"
      className="relative h-[400px] sm:h-[600px] lg:h-[800px] max-h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+600px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[400px] sm:h-[600px] lg:h-[800px] sticky top-[calc(100vh-400px)] sm:top-[calc(100vh-600px)] lg:top-[calc(100vh-800px)]">
          <div className="bg-neutral-900 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 h-full w-full flex flex-col justify-between">
            <div className="flex shrink-0 gap-8 sm:gap-12 lg:gap-20 flex-wrap">
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-neutral-400 text-xs sm:text-sm tracking-widest">Материалы</h3>
                <a href="#materials" className="text-white hover:text-yellow-300 transition-colors duration-300 text-sm sm:text-base">
                  Методические материалы
                </a>
                <a href="#letters" className="text-white hover:text-yellow-300 transition-colors duration-300 text-sm sm:text-base">
                  Методические письма
                </a>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-neutral-400 text-xs sm:text-sm tracking-widest">Мероприятия</h3>
                <a href="#seminars" className="text-white hover:text-yellow-300 transition-colors duration-300 text-sm sm:text-base">
                  Семинары
                </a>
                <a href="#dpp" className="text-white hover:text-yellow-300 transition-colors duration-300 text-sm sm:text-base">
                  ДПП ПК
                </a>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-neutral-400 text-xs sm:text-sm tracking-widest">Контакты</h3>
                <p className="text-neutral-300 text-sm sm:text-base">295001, Российская Федерация,</p>
                <p className="text-neutral-300 text-sm sm:text-base">Республика Крым, г. Симферополь,</p>
                <p className="text-neutral-300 text-sm sm:text-base">ул. Ленина, д. 15</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
              <h1 className="text-[10vw] sm:text-[9vw] lg:text-[7vw] leading-[0.85] mt-4 sm:mt-6 lg:mt-10 text-white font-bold tracking-tight uppercase">
                ГБОУ ДПО РК<br />КРИППО
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base">{new Date().getFullYear()} © ГБОУ ДПО РК КРИППО</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}