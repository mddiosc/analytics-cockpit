import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Analytics Cockpit</p>
          <h1>Growth Command Center</h1>
        </div>
        <p className="header-copy">
          Monitor channel performance, conversion health, and revenue velocity.
        </p>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
