export default function Header({ onMenuOpen }) {
  return (
    <header className="">
      <div className="mx-auto px-6 py-4 flex items-center gap-6">
        <div className="flex-1 min-w-0">
          <a href="#">
            <img
              src="././media/logo.svg"
              alt="Lightshift Labs Logo"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <button
          className="px-3 text-xl pt-1 pb-2 rounded-md border border-border-600 hover:border-border-500 focus-visible:focus-ring"
          aria-label="Menü öffnen"
          onClick={(e) => onMenuOpen?.(e.currentTarget)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
