const initialTenants = [
  { id: 1, name: 'Nova Studio', plan: 'Pro', status: 'Activo', members: 12, revenue: 249, health: 96 },
  { id: 2, name: 'MarketFlow', plan: 'Starter', status: 'Prueba', members: 5, revenue: 49, health: 82 },
  { id: 3, name: 'DataBridge', plan: 'Business', status: 'Activo', members: 28, revenue: 599, health: 91 }
];

const initialTasks = [
  { id: 1, title: 'Configurar dominio personalizado', owner: 'Soporte', status: 'Pendiente' },
  { id: 2, title: 'Revisar webhook de facturación', owner: 'Backend', status: 'En proceso' },
  { id: 3, title: 'Enviar invitaciones al equipo', owner: 'Admin', status: 'Completado' }
];

const plans = [
  { name: 'Starter', price: 49, seats: 5, description: 'Para validar el producto con clientes iniciales.' },
  { name: 'Pro', price: 249, seats: 25, description: 'Para equipos que necesitan automatización y soporte.' },
  { name: 'Business', price: 599, seats: 100, description: 'Para empresas con más usuarios, auditoría y SLA.' }
];

const state = {
  session: readStorage('ssass-session', null),
  tenants: readStorage('ssass-tenants', initialTenants),
  tasks: readStorage('ssass-tasks', initialTasks),
  activeView: 'dashboard',
  billingCycle: 'monthly'
};

const root = document.getElementById('root');

function render() {
  root.innerHTML = state.session ? appTemplate() : authTemplate();
  bindEvents();
}

function authTemplate() {
  return `
    <main class="auth-page">
      <section class="auth-card">
        <div>
          <p class="eyebrow">Ssass Platform</p>
          <h1>Administra tu SaaS desde un panel rápido y profesional</h1>
          <p class="muted">Entra con tu nombre y correo para probar el dashboard interactivo con datos guardados en tu navegador.</p>
        </div>
        <form id="login-form" class="form-grid">
          <label>Nombre<input id="login-name" required placeholder="Tu nombre" /></label>
          <label>Correo<input id="login-email" required type="email" placeholder="correo@empresa.com" /></label>
          <button type="submit">Entrar al panel</button>
        </form>
      </section>
    </main>
  `;
}

function appTemplate() {
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div>
          <p class="eyebrow">Ssass</p>
          <h2>Panel SaaS</h2>
        </div>
        <nav>
          ${navButton('dashboard', 'Resumen')}
          ${navButton('tenants', 'Clientes')}
          ${navButton('tasks', 'Operaciones')}
          ${navButton('billing', 'Planes')}
        </nav>
        <button class="secondary" data-action="logout">Cerrar sesión</button>
      </aside>
      <main class="content">
        <header class="topbar">
          <div>
            <p class="eyebrow">Bienvenido, ${escapeHtml(state.session.name)}</p>
            <h1>${viewTitle(state.activeView)}</h1>
          </div>
          <div class="account-pill">${escapeHtml(state.session.email)}</div>
        </header>
        ${viewTemplate()}
      </main>
    </div>
  `;
}

function navButton(key, label) {
  return `<button class="${state.activeView === key ? 'active' : ''}" data-view="${key}">${label}</button>`;
}

function viewTemplate() {
  if (state.activeView === 'tenants') return tenantsTemplate();
  if (state.activeView === 'tasks') return tasksTemplate();
  if (state.activeView === 'billing') return billingTemplate();
  return dashboardTemplate();
}

function dashboardTemplate() {
  const metrics = calculateMetrics();
  return `
    <section class="stack">
      <div class="metrics-grid">
        ${metricTemplate('Clientes activos', metrics.activeTenants)}
        ${metricTemplate('Usuarios totales', metrics.users)}
        ${metricTemplate('Ingresos mensuales', `$${metrics.monthlyRevenue}`)}
        ${metricTemplate('Salud promedio', `${metrics.averageHealth}%`)}
      </div>
      <div class="panel">
        <div class="panel-heading">
          <h2>Estado de clientes</h2>
          <p>Seguimiento de adopción, plan y salud operativa.</p>
        </div>
        <div class="table">
          ${state.tenants.map((tenant) => `
            <div class="table-row">
              <strong>${escapeHtml(tenant.name)}</strong>
              <span>${tenant.plan}</span>
              <span>${tenant.members} usuarios</span>
              <span>${tenant.health}% salud</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function tenantsTemplate() {
  return `
    <section class="grid-two">
      <form id="tenant-form" class="panel form-grid">
        <div class="panel-heading"><h2>Nuevo cliente</h2><p>Agrega una organización para simular alta de tenant.</p></div>
        <label>Empresa<input id="tenant-name" required placeholder="Nombre de la empresa" /></label>
        <label>Plan<select id="tenant-plan">${plans.map((plan) => `<option>${plan.name}</option>`).join('')}</select></label>
        <label>Usuarios iniciales<input id="tenant-members" type="number" min="1" value="1" /></label>
        <button type="submit">Crear cliente</button>
      </form>
      <div class="panel">
        <div class="panel-heading"><h2>Clientes registrados</h2><p>Los cambios se guardan en localStorage.</p></div>
        <div class="cards-list">
          ${state.tenants.map((tenant) => `
            <article class="mini-card">
              <div><h3>${escapeHtml(tenant.name)}</h3><p>${tenant.plan}, ${tenant.status}, ${tenant.members} usuarios</p></div>
              <button class="danger" data-delete-tenant="${tenant.id}">Eliminar</button>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function tasksTemplate() {
  return `
    <section class="grid-two">
      <form id="task-form" class="panel form-grid">
        <div class="panel-heading"><h2>Nueva tarea</h2><p>Controla operaciones internas del SaaS.</p></div>
        <label>Tarea<input id="task-title" required placeholder="Describe la tarea" /></label>
        <label>Responsable<input id="task-owner" value="Admin" placeholder="Equipo o persona" /></label>
        <button type="submit">Agregar tarea</button>
      </form>
      <div class="panel">
        <div class="panel-heading"><h2>Flujo operativo</h2><p>Haz clic en avanzar para cambiar el estado.</p></div>
        <div class="cards-list">
          ${state.tasks.map((task) => `
            <article class="mini-card">
              <div><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.owner)}, ${task.status}</p></div>
              <button class="secondary" data-advance-task="${task.id}">Avanzar</button>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function billingTemplate() {
  const multiplier = state.billingCycle === 'annual' ? 10 : 1;
  return `
    <section class="stack">
      <div class="panel billing-toggle">
        <div><h2>Planes comerciales</h2><p>Calcula precios mensuales o anuales para vender el SaaS.</p></div>
        <div class="segmented">
          <button class="${state.billingCycle === 'monthly' ? 'active' : ''}" data-cycle="monthly">Mensual</button>
          <button class="${state.billingCycle === 'annual' ? 'active' : ''}" data-cycle="annual">Anual</button>
        </div>
      </div>
      <div class="pricing-grid">
        ${plans.map((plan) => `
          <article class="price-card">
            <h3>${plan.name}</h3>
            <p>${plan.description}</p>
            <strong>$${plan.price * multiplier}</strong>
            <span>${state.billingCycle === 'annual' ? 'por año' : 'por mes'}, hasta ${plan.seats} usuarios</span>
            <button>Seleccionar plan</button>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function metricTemplate(label, value) {
  return `<article class="metric-card"><span>${label}</span><strong>${value}</strong></article>`;
}

function bindEvents() {
  document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    state.session = {
      name: document.getElementById('login-name').value.trim(),
      email: document.getElementById('login-email').value.trim()
    };
    writeStorage('ssass-session', state.session);
    render();
  });

  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeView = button.dataset.view;
      render();
    });
  });

  document.querySelector('[data-action="logout"]')?.addEventListener('click', () => {
    state.session = null;
    state.activeView = 'dashboard';
    writeStorage('ssass-session', null);
    render();
  });

  document.getElementById('tenant-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const plan = plans.find((item) => item.name === document.getElementById('tenant-plan').value);
    state.tenants.push({
      id: Date.now(),
      name: document.getElementById('tenant-name').value.trim(),
      plan: plan.name,
      status: 'Prueba',
      members: Number(document.getElementById('tenant-members').value || 1),
      revenue: plan.price,
      health: 88
    });
    writeStorage('ssass-tenants', state.tenants);
    render();
  });

  document.querySelectorAll('[data-delete-tenant]').forEach((button) => {
    button.addEventListener('click', () => {
      state.tenants = state.tenants.filter((tenant) => String(tenant.id) !== button.dataset.deleteTenant);
      writeStorage('ssass-tenants', state.tenants);
      render();
    });
  });

  document.getElementById('task-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    state.tasks.unshift({
      id: Date.now(),
      title: document.getElementById('task-title').value.trim(),
      owner: document.getElementById('task-owner').value.trim() || 'Admin',
      status: 'Pendiente'
    });
    writeStorage('ssass-tasks', state.tasks);
    render();
  });

  document.querySelectorAll('[data-advance-task]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextStatus = { Pendiente: 'En proceso', 'En proceso': 'Completado', Completado: 'Pendiente' };
      state.tasks = state.tasks.map((task) => String(task.id) === button.dataset.advanceTask ? { ...task, status: nextStatus[task.status] } : task);
      writeStorage('ssass-tasks', state.tasks);
      render();
    });
  });

  document.querySelectorAll('[data-cycle]').forEach((button) => {
    button.addEventListener('click', () => {
      state.billingCycle = button.dataset.cycle;
      render();
    });
  });
}

function calculateMetrics() {
  const activeTenants = state.tenants.filter((tenant) => tenant.status === 'Activo').length;
  const monthlyRevenue = state.tenants.reduce((total, tenant) => total + Number(tenant.revenue), 0);
  const users = state.tenants.reduce((total, tenant) => total + Number(tenant.members), 0);
  const averageHealth = state.tenants.length ? Math.round(state.tenants.reduce((total, tenant) => total + tenant.health, 0) / state.tenants.length) : 0;
  return { activeTenants, monthlyRevenue, users, averageHealth };
}

function viewTitle(view) {
  return {
    dashboard: 'Resumen general',
    tenants: 'Gestión de clientes',
    tasks: 'Operaciones internas',
    billing: 'Planes y facturación'
  }[view];
}

function readStorage(key, fallback) {
  const stored = window.localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}

function writeStorage(key, value) {
  if (value === null) {
    window.localStorage.removeItem(key);
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

render();
