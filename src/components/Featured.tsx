const sections = [
  {
    id: "materials",
    title: "Методические материалы",
    description:
      "Сборники, разработки уроков, рабочие программы и дидактические материалы для педагогов всех уровней образования. Документы доступны для скачивания и использования в работе.",
    icon: "📚",
    link: "#materials",
  },
  {
    id: "seminars",
    title: "Семинары",
    description:
      "Расписание и материалы очных и дистанционных семинаров для педагогических работников. Презентации, раздаточные материалы и записи прошедших мероприятий.",
    icon: "🎓",
    link: "#seminars",
  },
  {
    id: "dpp",
    title: "ДПП ПК",
    description:
      "Дополнительные профессиональные программы повышения квалификации. Учебные планы, расписание, информация о зачислении и итоговой аттестации.",
    icon: "📋",
    link: "#dpp",
  },
  {
    id: "letters",
    title: "Методические письма",
    description:
      "Официальные методические письма и рекомендации по организации учебного процесса, требованиям к документации и актуальным вопросам образования.",
    icon: "✉️",
    link: "#letters",
  },
];

export default function Featured() {
  return (
    <div id="materials" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-4 text-center">
          Разделы сайта
        </h2>
        <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 text-center mb-16 leading-tight">
          Всё необходимое<br />для педагога
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white p-10 flex flex-col gap-4 hover:bg-neutral-50 transition-colors duration-300"
            >
              <div className="text-4xl">{section.icon}</div>
              <h4 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">
                {section.title}
              </h4>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base flex-1">
                {section.description}
              </p>
              <a
                href={section.link}
                className="inline-block border border-black text-black px-6 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300 w-fit mt-2"
              >
                Открыть раздел
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
