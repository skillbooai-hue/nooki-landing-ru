import { useState, useEffect, useRef } from "react";
import { X, Mail, CheckCircle } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      setLoading(false);
    }, 300);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
      data-testid="modal-waitlist"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        style={{
          animation: "fadeIn 0.2s ease",
        }}
        onClick={handleClose}
        data-testid="modal-backdrop"
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md"
        style={{
          animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top gradient strip */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />

          <div className="px-8 pt-8 pb-8">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              data-testid="button-modal-close"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {!submitted ? (
              <>
                {/* Icon */}
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                  <Mail className="w-7 h-7 text-blue-600" />
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight" data-testid="modal-title">
                  Станьте первым пользователем Nooki
                </h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed" data-testid="modal-subtitle">
                  Оставьте свой email, чтобы первым узнать о выходе русской версии Nooki и получить ранний доступ.
                </p>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  data-netlify="true"
                  name="waitlist"
                  data-testid="form-waitlist"
                >
                  <input type="hidden" name="form-name" value="waitlist" />
                  <input type="hidden" name="source" value="promo_popup" />

                  <div className="mb-4">
                    <label htmlFor="waitlist-email" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      ref={inputRef}
                      id="waitlist-email"
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      data-testid="input-email"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all relative overflow-hidden"
                    style={{
                      background: loading || !email.trim()
                        ? "#93c5fd"
                        : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      boxShadow: loading || !email.trim() ? "none" : "0 4px 20px rgba(37,99,235,0.35)",
                    }}
                    data-testid="button-submit-waitlist"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Отправляем...
                      </span>
                    ) : (
                      "Получить доступ"
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Без спама. Только важное — обещаем.
                </p>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-4" data-testid="modal-success">
                <div
                  className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Спасибо!</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Проверьте почту в ближайшее время — мы пришлём приглашение, как только откроем доступ.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  data-testid="button-success-close"
                >
                  Отлично!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
