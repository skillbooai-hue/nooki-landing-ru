import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, Calendar, Users, Bell, Heart, MessageCircle, Shield, Zap, Globe, Award } from "lucide-react";
import WaitlistModal from "@/components/WaitlistModal";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" data-testid="link-logo">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Nooki</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
          <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors" data-testid="link-features">Возможности</a>
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-blue-600 transition-colors" data-testid="link-how">Как это работает</a>
          <a href="#reviews" className="text-sm text-gray-600 hover:text-blue-600 transition-colors" data-testid="link-reviews">Отзывы</a>
          <a href="#faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors" data-testid="link-faq">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-3" data-testid="nav-cta">
          <button
            onClick={onOpenModal}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
            data-testid="button-cta-nav"
          >
            Вступить в Waitlist
          </button>
        </div>

        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-menu-toggle"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4" data-testid="nav-mobile">
          <a href="#features" className="text-sm text-gray-700" onClick={() => setMenuOpen(false)} data-testid="link-features-mobile">Возможности</a>
          <a href="#how-it-works" className="text-sm text-gray-700" onClick={() => setMenuOpen(false)} data-testid="link-how-mobile">Как это работает</a>
          <a href="#reviews" className="text-sm text-gray-700" onClick={() => setMenuOpen(false)} data-testid="link-reviews-mobile">Отзывы</a>
          <a href="#faq" className="text-sm text-gray-700" onClick={() => setMenuOpen(false)} data-testid="link-faq-mobile">FAQ</a>
          <button
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full text-center"
            onClick={() => { setMenuOpen(false); onOpenModal(); }}
            data-testid="button-cta-mobile"
          >
            Вступить в Waitlist
          </button>
        </div>
      )}
    </header>
  );
}

function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden bg-white" data-testid="section-hero">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-20 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
          Живите вместе,<br />
          <span className="text-blue-600">планируйте вместе</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Nooki — совместный календарь для пар, семей и команд. Делитесь расписанием, общайтесь и не пропускайте ни одного важного момента.
        </p>

        <p className="text-sm text-gray-400 mb-8 italic">
          Японские традиции минимализма. Скоро на русском языке.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" id="download" data-testid="hero-download-buttons">
          <button
            onClick={onOpenModal}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-semibold text-base shadow-lg"
            data-testid="button-waitlist-hero"
          >
            Вступить в Waitlist
          </button>
          <span className="text-sm text-gray-400">Бесплатно · Без кредитной карты</span>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto" style={{ maxWidth: 700 }}>
          <div className="flex items-end justify-center gap-6">
            {/* Left phone (smaller) */}
            <div className="hidden sm:block w-48 h-80 bg-gradient-to-b from-blue-50 to-blue-100 rounded-[2.5rem] border-4 border-white shadow-2xl relative overflow-hidden self-end mb-8">
              <div className="absolute top-4 left-0 right-0 flex justify-center">
                <div className="w-16 h-1.5 bg-blue-200 rounded-full" />
              </div>
              <div className="p-4 pt-8">
                <div className="text-xs font-semibold text-blue-700 mb-2">Апрель 2026</div>
                <div className="grid grid-cols-7 gap-0.5 text-[9px] text-center text-gray-500 mb-1">
                  {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-[9px] text-center">
                  {["","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","",""].map((d, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center rounded-full ${d === "2" ? "bg-blue-600 text-white font-semibold" : "text-gray-700"}`}>{d}</div>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="bg-blue-500 text-white rounded px-2 py-1 text-[8px]">Совещание команды</div>
                  <div className="bg-green-400 text-white rounded px-2 py-1 text-[8px]">День рождения мамы</div>
                  <div className="bg-purple-400 text-white rounded px-2 py-1 text-[8px]">Поход в кино</div>
                </div>
              </div>
            </div>

            {/* Center phone (main, larger) */}
            <div className="w-60 sm:w-72 h-[480px] sm:h-[520px] bg-gradient-to-b from-blue-600 to-blue-700 rounded-[3rem] border-4 border-white shadow-[0_40px_80px_rgba(37,99,235,0.35)] relative overflow-hidden">
              <div className="absolute top-4 left-0 right-0 flex justify-center">
                <div className="w-20 h-1.5 bg-blue-400 rounded-full opacity-60" />
              </div>
              {/* Status bar */}
              <div className="px-6 pt-8 pb-2 flex justify-between items-center text-blue-100 text-[10px]">
                <span>9:41</span>
                <span>●●● WiFi 🔋</span>
              </div>

              {/* Calendar header */}
              <div className="px-5 pb-3 flex justify-between items-center">
                <div>
                  <div className="text-white font-bold text-base">Апрель 2026</div>
                  <div className="text-blue-200 text-[10px]">2 события сегодня</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">А</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-pink-400 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">К</span>
                  </div>
                </div>
              </div>

              {/* Calendar grid */}
              <div className="px-5">
                <div className="grid grid-cols-7 gap-0.5 text-[9px] text-center text-blue-200 mb-1">
                  {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => <div key={d} className="py-0.5">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-[10px] text-center">
                  {["","","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","",""].map((d, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center rounded-full font-medium
                      ${d === "2" ? "bg-white text-blue-700 font-bold" : "text-blue-100 hover:bg-blue-500"}`}>
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div className="px-5 mt-4 space-y-2">
                <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-white text-[10px] font-semibold truncate">Ужин с семьёй</div>
                    <div className="text-blue-200 text-[8px]">19:00 — Алиса, Кирилл</div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-white text-[10px] font-semibold truncate">Совещание команды</div>
                    <div className="text-blue-200 text-[8px]">10:00 — Zoom</div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-white text-[10px] font-semibold truncate">День рождения мамы</div>
                    <div className="text-blue-200 text-[8px]">Весь день</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right phone (smaller) */}
            <div className="hidden sm:block w-48 h-80 bg-gradient-to-b from-gray-50 to-gray-100 rounded-[2.5rem] border-4 border-white shadow-2xl relative overflow-hidden self-end mb-8">
              <div className="absolute top-4 left-0 right-0 flex justify-center">
                <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
              </div>
              <div className="p-4 pt-8">
                <div className="text-xs font-semibold text-gray-700 mb-3">Сообщения</div>
                <div className="space-y-2.5">
                  {[
                    { name: "Алиса", msg: "Не забудь про ужин!", time: "18:42", color: "bg-blue-500" },
                    { name: "Кирилл", msg: "Добавил событие", time: "15:30", color: "bg-purple-500" },
                    { name: "Мама", msg: "Спасибо за напоминание ❤️", time: "12:10", color: "bg-pink-400" },
                  ].map(m => (
                    <div key={m.name} className="flex items-start gap-2">
                      <div className={`w-7 h-7 rounded-full ${m.color} flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white`}>
                        {m.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <span className="text-[9px] font-semibold text-gray-700">{m.name}</span>
                          <span className="text-[8px] text-gray-400">{m.time}</span>
                        </div>
                        <div className="text-[8px] text-gray-500 truncate">{m.msg}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


function FeaturesSection() {
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: "Общий календарь",
      desc: "Объедините расписания всей семьи или команды в одном месте. Видите события друг друга в реальном времени.",
      color: "bg-blue-50",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-indigo-600" />,
      title: "Встроенный чат",
      desc: "Общайтесь прямо в приложении. Обсуждайте события, делитесь фотографиями — всё в одном месте.",
      color: "bg-indigo-50",
    },
    {
      icon: <Bell className="w-6 h-6 text-purple-600" />,
      title: "Умные напоминания",
      desc: "Никогда не пропускайте важные события. Напоминания для всех участников и уведомления заранее.",
      color: "bg-purple-50",
    },
    {
      icon: <Users className="w-6 h-6 text-cyan-600" />,
      title: "Несколько календарей",
      desc: "Создавайте отдельные календари для семьи, работы, хобби. Всё структурировано и наглядно.",
      color: "bg-cyan-50",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      title: "Памятные даты",
      desc: "Автоматически отслеживайте дни рождения, годовщины и другие важные даты ваших близких.",
      color: "bg-pink-50",
    },
    {
      icon: <Globe className="w-6 h-6 text-green-600" />,
      title: "Праздники и события",
      desc: "Все государственные праздники страны уже встроены в приложение. Планируйте с учётом выходных.",
      color: "bg-green-50",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white" data-testid="section-features">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Возможности</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Всё что нужно<br />для совместного планирования</h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">Nooki объединяет календарь, мессенджер и напоминания в одном простом приложении</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 80}>
              <div className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300 h-full" data-testid={`card-feature-${i}`}>
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShareSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden" data-testid="section-share">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/20 mb-6">
              <Users className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">Совместное использование</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Поделитесь календарём с близкими</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Пригласите партнёра, членов семьи или коллег одним нажатием. Каждый участник видит актуальное расписание и получает уведомления о новых событиях.
            </p>
            <div className="space-y-4">
              {[
                "Совместный доступ для неограниченного числа участников",
                "Личные и общие события в одном виде",
                "Синхронизация в реальном времени на всех устройствах",
                "Интеграция с Google Calendar и Apple Calendar",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-100 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative flex justify-center">
              <div className="w-64 h-[420px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white/30">
                <div className="bg-blue-50 h-full p-4">
                  <div className="text-center py-3 mb-3">
                    <div className="text-xs font-bold text-gray-700 mb-1">Семейный календарь</div>
                    <div className="flex -space-x-2 justify-center">
                      {[["А", "bg-blue-500"], ["К", "bg-green-500"], ["М", "bg-pink-500"], ["П", "bg-purple-500"]].map(([l, c], i) => (
                        <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}>{l}</div>
                      ))}
                    </div>
                  </div>
                  {/* Invite card */}
                  <div className="bg-white rounded-2xl p-3 shadow-sm mb-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Пригласить участника</div>
                    <div className="bg-gray-50 rounded-lg px-3 py-2 text-[10px] text-gray-400 mb-2">Введите email или ссылку</div>
                    <button className="w-full py-1.5 text-[10px] font-semibold text-white bg-blue-600 rounded-lg">Отправить приглашение</button>
                  </div>
                  {/* Members */}
                  <div className="bg-white rounded-2xl p-3 shadow-sm">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Участники (4)</div>
                    {[
                      { name: "Алиса (вы)", role: "Владелец", color: "bg-blue-500" },
                      { name: "Кирилл", role: "Редактор", color: "bg-green-500" },
                      { name: "Мама", role: "Просмотр", color: "bg-pink-500" },
                      { name: "Папа", role: "Просмотр", color: "bg-purple-500" },
                    ].map(m => (
                      <div key={m.name} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                        <div className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0`}>{m.name[0]}</div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[9px] font-medium text-gray-800 truncate">{m.name}</div>
                        </div>
                        <span className="text-[8px] text-gray-400">{m.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Создайте аккаунт",
      desc: "Зарегистрируйтесь за 30 секунд. Никаких лишних вопросов — только имя и email.",
    },
    {
      num: "02",
      title: "Создайте календарь",
      desc: "Создайте семейный, рабочий или любой другой совместный календарь и настройте его под себя.",
    },
    {
      num: "03",
      title: "Пригласите близких",
      desc: "Отправьте ссылку-приглашение друзьям и родственникам. Они получат доступ мгновенно.",
    },
    {
      num: "04",
      title: "Планируйте вместе",
      desc: "Добавляйте события, получайте напоминания и общайтесь прямо в приложении.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50" data-testid="section-how-it-works">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Как это работает</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Начните за 4 простых шага</h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">Nooki работает без сложной настройки — просто скачайте и начните</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 z-0" />

          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 100}>
              <div className="relative z-10 text-center" data-testid={`card-step-${i}`}>
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-100 flex flex-col items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-[10px] font-medium text-blue-400 uppercase tracking-widest">Шаг</span>
                  <span className="text-2xl font-extrabold text-blue-600">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  return (
    <section className="py-24 bg-white" data-testid="section-chat">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={200}>
            <div className="relative flex justify-center">
              <div className="w-64 h-[420px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-100">
                {/* Chat header */}
                <div className="bg-blue-600 px-4 py-3 flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[["А", "bg-yellow-400"], ["К", "bg-green-400"]].map(([l, c], i) => (
                      <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-blue-600 flex items-center justify-center text-[9px] font-bold text-white`}>{l}</div>
                    ))}
                  </div>
                  <div>
                    <div className="text-white text-[10px] font-semibold">Семейный чат</div>
                    <div className="text-blue-200 text-[8px]">3 участника • онлайн</div>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-3 space-y-2 bg-blue-50 h-full">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">А</div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-3 py-1.5 max-w-[80%] shadow-sm">
                      <div className="text-[8px] font-medium text-blue-600 mb-0.5">Алиса</div>
                      <div className="text-[9px] text-gray-700">Кто идёт на ужин в пятницу? 🍕</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">К</div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-3 py-1.5 max-w-[80%] shadow-sm">
                      <div className="text-[8px] font-medium text-green-600 mb-0.5">Кирилл</div>
                      <div className="text-[9px] text-gray-700">Я иду! Уже добавил в Nooki ✅</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 rounded-2xl rounded-tr-none px-3 py-1.5 max-w-[80%]">
      <div className="text-[9px] text-white">Отлично! Напомни мне за час</div>
                    </div>
                  </div>
                  <div className="bg-blue-100 rounded-xl p-2 border border-blue-200">
                    <div className="text-[8px] font-semibold text-blue-700 mb-1">📅 Событие добавлено</div>
                    <div className="text-[8px] text-blue-600">Ужин в пятницу • 19:00 • 3 участника</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">М</div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-3 py-1.5 max-w-[80%] shadow-sm">
                      <div className="text-[8px] font-medium text-pink-600 mb-0.5">Мама</div>
                      <div className="text-[9px] text-gray-700">Буду там! ❤️</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Встроенный чат</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Общайтесь прямо в приложении</h2>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed">
              Больше не нужно переключаться между мессенджером и календарём. Обсуждайте события, присылайте фото и договаривайтесь — всё в Nooki.
            </p>
            <div className="space-y-4">
              {[
                { icon: <MessageCircle className="w-4 h-4 text-blue-600" />, title: "Групповые чаты для каждого календаря", desc: "Автоматически создаётся для каждого совместного календаря" },
                { icon: <Bell className="w-4 h-4 text-blue-600" />, title: "Уведомления о событиях", desc: "Обсуждение события прямо в чате с участниками" },
                { icon: <Heart className="w-4 h-4 text-blue-600" />, title: "Реакции и стикеры", desc: "Выражайте эмоции реакциями на сообщения" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}


function PlansSection({ onOpenModal }: { onOpenModal: () => void }) {
  const plans = [
    {
      name: "Basic",
      price: "0₽",
      period: "/месяц",
      desc: "Для личного использования",
      features: [
        "15 ИИ-событий в неделю",
        "До 3 Пространств",
        "Интеграция с Google Calendar",
        "Базовые напоминания",
        "Встроенный чат",
      ],
      cta: "Вступить в Waitlist",
      highlight: false,
    },
    {
      name: "Premium",
      price: "499₽",
      period: "/месяц",
      desc: "Для активных пользователей",
      features: [
        "150 ИИ-событий в месяц",
        "До 10 Пространств",
        "Приоритетная поддержка",
        "Умные напоминания",
        "Чат с фото и видео",
        "Синхронизация на всех устройствах",
        "Повторяющиеся события",
      ],
      cta: "Вступить в Waitlist",
      highlight: true,
    },
  ];

  return (
    <section className="py-24 bg-white" data-testid="section-plans">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Тарифы</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Выберите подходящий план</h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">Начните бесплатно — улучшайте по мере необходимости</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 100}>
              <div
                className={`rounded-2xl p-6 border-2 transition-shadow hover:shadow-xl duration-300 ${
                  plan.highlight
                    ? "border-blue-600 bg-blue-600 text-white shadow-xl relative"
                    : "border-gray-100 bg-white"
                }`}
                data-testid={`card-plan-${i}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                    Популярный
                  </div>
                )}
                <div className="mb-4">
                  <div className={`text-xs font-medium uppercase tracking-widest mb-1 ${plan.highlight ? "text-blue-200" : "text-blue-600"}`}>{plan.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>{plan.period}</span>
                  </div>
                  <div className={`text-sm mt-1 ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>{plan.desc}</div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2">
                      <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-blue-200" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? "text-blue-100" : "text-gray-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onOpenModal}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  data-testid={`button-plan-${i}`}
                >
                  {plan.cta}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Nooki бесплатный?",
      a: "Да, базовый план Nooki бесплатен. Он включает 15 ИИ-событий в неделю и до 3 Пространств. Для тех, кому нужно больше, доступен план Premium с 150 ИИ-событиями в месяц и расширенными функциями.",
    },
    {
      q: "Как пригласить членов семьи?",
      a: "Откройте раздел «Совместный доступ» в настройках календаря и отправьте приглашение по email или поделитесь ссылкой. Участник получит уведомление и сможет принять приглашение в пару нажатий.",
    },
    {
      q: "На каких устройствах работает Nooki?",
      a: "Nooki доступен на iOS (iPhone, iPad), Android-смартфонах и планшетах, а также в веб-браузере. Все данные синхронизируются автоматически между всеми вашими устройствами.",
    },
    {
      q: "Можно ли интегрировать с Google Calendar или Apple Calendar?",
      a: "Да, Nooki поддерживает интеграцию с Google Calendar, Apple Calendar и другими популярными сервисами. События синхронизируются в обе стороны.",
    },
    {
      q: "Мои данные в безопасности?",
      a: "Безопасность ваших данных — наш главный приоритет. Все данные зашифрованы при передаче и хранении. Мы никогда не передаём вашу личную информацию третьим лицам.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50" data-testid="section-faq">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Частые вопросы</h2>
          <p className="text-xl text-gray-500">Ответы на самые популярные вопросы о Nooki</p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 60}>
              <div
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                data-testid={`faq-item-${i}`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-blue-500 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="waitlist" className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden" data-testid="section-download-cta">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/20 mb-6">
            <span className="text-xs font-medium text-white">Доступно бесплатно</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Станьте одним из первых<br />пользователей Nooki
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto">
            Запишитесь в лист ожидания и получите уведомление о запуске русской версии
          </p>

          <div className="flex items-center justify-center mb-10">
            <button
              onClick={onOpenModal}
              className="px-10 py-4 bg-white text-blue-600 rounded-2xl hover:bg-blue-50 transition-colors font-bold text-base shadow-lg"
              data-testid="button-waitlist-cta"
            >
              Вступить в Waitlist
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Бесплатно навсегда</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Без рекламы</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Ваши данные защищены</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    "Приложение": ["Возможности", "Тарифы"],
    "Поддержка": ["Политика конфиденциальности", "Связаться с нами"],
  };

  return (
    <footer className="bg-gray-900 text-gray-400" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Nooki</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Совместный календарь для семей, пар и команд. Планируйте жизнь вместе.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors" data-testid="link-social-twitter">
                <span className="text-xs font-bold text-white">X</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors" data-testid="link-social-instagram">
                <span className="text-xs font-bold text-white">In</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors" data-testid="link-social-fb">
                <span className="text-xs font-bold text-white">FB</span>
              </a>
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors" data-testid={`link-footer-${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© 2026 Nooki. Все права защищены.</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Language: English (Russian version coming soon)</span>
            <span>•</span>
            <span>Сделано с ❤️ для вас</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div className="min-h-screen" data-testid="landing-page">
      <Navbar onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <FeaturesSection />
      <ShareSection />
      <HowItWorksSection />
      <ChatSection />
      <PlansSection onOpenModal={openModal} />
      <FaqSection />
      <DownloadCTA onOpenModal={openModal} />
      <Footer />
      <WaitlistModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
