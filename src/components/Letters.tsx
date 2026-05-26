import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import FUNC2URL from "../../backend/func2url.json";

const LIST_URL = FUNC2URL["letters-list"];

interface Letter {
  id: number;
  title: string;
  filename: string;
  file_url: string;
  subject: string | null;
  created_at: string | null;
}

export default function Letters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(LIST_URL)
      .then(r => r.json())
      .then(data => {
        const raw = typeof data === "string" ? JSON.parse(data) : data;
        setLetters(raw.letters || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="letters" className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-400 mb-3">ГБОУ ДПО РК КРИППО</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 uppercase tracking-tight mb-10">
          Методические письма
        </h2>

        {loading && (
          <div className="text-neutral-400 text-sm">Загрузка...</div>
        )}

        {!loading && letters.length === 0 && (
          <div className="text-neutral-400 text-sm">Письма пока не добавлены</div>
        )}

        {!loading && letters.length > 0 && (
          <ul className="flex flex-col gap-3">
            {letters.map(letter => (
              <li key={letter.id}>
                <a
                  href={letter.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-neutral-50 hover:bg-yellow-50 border border-neutral-200 hover:border-yellow-300 rounded-xl px-5 py-4 transition-all group"
                >
                  <div className="shrink-0 text-yellow-500 group-hover:text-yellow-600">
                    <Icon name="FileText" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-neutral-900 font-medium text-sm sm:text-base truncate">{letter.title}</p>
                    {letter.subject && (
                      <p className="text-neutral-400 text-xs mt-0.5">{letter.subject}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-neutral-300 group-hover:text-yellow-400 transition-colors">
                    <Icon name="Download" size={18} />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
