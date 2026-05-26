import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import FUNC2URL from "../../backend/func2url.json";

const ADD_URL = FUNC2URL["letters-add"];
const LIST_URL = FUNC2URL["letters-list"];
const DELETE_URL = FUNC2URL["letters-delete"];

interface Letter {
  id: number;
  title: string;
  subject: string | null;
  file_url: string;
}

export default function Admin() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const loadLetters = () => {
    fetch(LIST_URL)
      .then(r => r.json())
      .then(data => {
        const raw = typeof data === "string" ? JSON.parse(data) : data;
        setLetters(raw.letters || []);
      });
  };

  useEffect(() => { loadLetters(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch(ADD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subject, file_url: fileUrl }),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage({ text: "Письмо успешно добавлено!", ok: true });
      setTitle("");
      setSubject("");
      setFileUrl("");
      loadLetters();
    } else {
      setMessage({ text: data.error || "Ошибка сохранения", ok: false });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить это письмо?")) return;
    setDeletingId(id);
    await fetch(DELETE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    loadLetters();
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl">
          <button
            onClick={() => navigate("/")}
            className="text-neutral-400 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors"
          >
            ← На главную
          </button>
          <h1 className="text-white text-2xl font-bold mb-2 uppercase tracking-tight">Добавить письмо</h1>
          <p className="text-neutral-400 text-sm mb-8">Методические письма ГБОУ ДПО РК КРИППО</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-neutral-400 text-xs uppercase tracking-widest mb-2 block">Название *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Биология. Об особенностях преподавания 2025-2026 уч.г."
                required
                className="w-full bg-neutral-800 text-white rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-neutral-600"
              />
            </div>
            <div>
              <label className="text-neutral-400 text-xs uppercase tracking-widest mb-2 block">Предмет</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Биология"
                className="w-full bg-neutral-800 text-white rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-neutral-600"
              />
            </div>
            <div>
              <label className="text-neutral-400 text-xs uppercase tracking-widest mb-2 block">Ссылка на файл *</label>
              <input
                type="url"
                value={fileUrl}
                onChange={e => setFileUrl(e.target.value)}
                placeholder="https://disk.yandex.ru/..."
                required
                className="w-full bg-neutral-800 text-white rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-neutral-600"
              />
            </div>

            {message && (
              <div className={`rounded-lg px-4 py-3 text-sm ${message.ok ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !fileUrl || !title}
              className="bg-yellow-400 text-neutral-900 font-bold rounded-lg py-3 uppercase tracking-widest text-sm hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Сохранение..." : "Добавить письмо"}
            </button>
          </form>
        </div>

        {letters.length > 0 && (
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-xl">
            <h2 className="text-white text-lg font-bold uppercase tracking-tight mb-5">Добавленные письма</h2>
            <ul className="flex flex-col gap-3">
              {letters.map(letter => (
                <li key={letter.id} className="flex items-center gap-3 bg-neutral-800 rounded-xl px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{letter.title}</p>
                    {letter.subject && (
                      <p className="text-neutral-400 text-xs mt-0.5">{letter.subject}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(letter.id)}
                    disabled={deletingId === letter.id}
                    className="shrink-0 text-neutral-500 hover:text-red-400 transition-colors disabled:opacity-40"
                    title="Удалить"
                  >
                    <Icon name="Trash2" size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
