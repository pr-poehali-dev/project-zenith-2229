import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FUNC2URL from "../../backend/func2url.json";

const ADD_URL = FUNC2URL["letters-add"];

export default function Admin() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const navigate = useNavigate();

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
    } else {
      setMessage({ text: data.error || "Ошибка сохранения", ok: false });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-lg shadow-xl">
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
    </div>
  );
}
