import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FUNC2URL from "../../backend/func2url.json";

const UPLOAD_URL = FUNC2URL["letters-upload"];

export default function Admin() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setLoading(true);
    setMessage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subject, filename: file.name, file_data: base64 }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setMessage({ text: "Файл успешно загружен!", ok: true });
        setTitle("");
        setSubject("");
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setMessage({ text: data.error || "Ошибка загрузки", ok: false });
      }
    };
    reader.readAsDataURL(file);
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
        <h1 className="text-white text-2xl font-bold mb-2 uppercase tracking-tight">Загрузка письма</h1>
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
            <label className="text-neutral-400 text-xs uppercase tracking-widest mb-2 block">Файл (PDF) *</label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full bg-neutral-800 text-white rounded-lg px-4 py-3 text-sm outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-yellow-400 file:text-neutral-900 hover:file:bg-yellow-300 cursor-pointer"
            />
          </div>

          {message && (
            <div className={`rounded-lg px-4 py-3 text-sm ${message.ok ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file || !title}
            className="bg-yellow-400 text-neutral-900 font-bold rounded-lg py-3 uppercase tracking-widest text-sm hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Загрузка..." : "Загрузить файл"}
          </button>
        </form>
      </div>
    </div>
  );
}
