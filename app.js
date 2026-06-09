const data = {
  roles: [
    {
      id: "shift-lead",
      name: "Руководитель смены",
      scope: "Корпоративное ядро + площадка",
      summary:
        "Обеспечивает выполнение сменного плана, управляет отклонениями, распределяет людей по задачам и подтверждает готовность смены к безопасной работе.",
      tasks: [
        { id: "task-plan", name: "Запуск смены", context: "Начало смены, передача статуса, проверка ресурсов" },
        { id: "task-incident", name: "Разбор отклонения", context: "Сбой процесса, риск простоя или нарушения безопасности" },
        { id: "task-coach", name: "Поддержка новичка", context: "Сотрудник выполняет задачу под наблюдением" }
      ],
      requirements: [
        {
          id: "req-map",
          name: "Восстанавливает карту сменных задач и ответственных",
          critical: true,
          taskId: "task-plan",
          skill: "Планирование смены",
          risk: "Неверное распределение людей по критичным операциям",
          criterion: "За 10 минут собирает план смены и объясняет приоритеты",
          intervention: "Короткий разбор шаблона сменного плана с наставником"
        },
        {
          id: "req-risk",
          name: "Определяет критичность отклонения и маршрут эскалации",
          critical: true,
          taskId: "task-incident",
          skill: "Оценка риска",
          risk: "Поздняя эскалация и повторение инцидента",
          criterion: "На кейсе выбирает корректный уровень критичности и действие",
          intervention: "Практический кейс по трем типам отклонений"
        },
        {
          id: "req-feedback",
          name: "Дает прикладную обратную связь сотруднику",
          critical: false,
          taskId: "task-coach",
          skill: "Наставничество",
          risk: "Ошибки новичка закрепляются как привычный способ работы",
          criterion: "Формулирует наблюдение, риск и следующее действие",
          intervention: "Микропрактика: 15 минут наблюдения и обратной связи"
        }
      ]
    },
    {
      id: "process-engineer",
      name: "Инженер процесса",
      scope: "Функция + локальные регламенты",
      summary:
        "Анализирует устойчивость процесса, связывает отклонения с причинами, обновляет рабочие практики и переводит экспертные знания в воспроизводимые правила.",
      tasks: [
        { id: "task-root", name: "Поиск причины", context: "Повторяющееся отклонение показателей" },
        { id: "task-standard", name: "Обновление стандарта", context: "Изменение процесса или оборудования" },
        { id: "task-transfer", name: "Передача знания", context: "Новая команда или масштабирование практики" }
      ],
      requirements: [
        {
          id: "req-cause",
          name: "Связывает симптом, причину и проверяемую гипотезу",
          critical: true,
          taskId: "task-root",
          skill: "Причинно-следственный анализ",
          risk: "Организация лечит симптом вместо причины",
          criterion: "Строит цепочку фактов и проверок без скачков в логике",
          intervention: "Разбор одного реального отклонения по шаблону 5 Why"
        },
        {
          id: "req-standard",
          name: "Обновляет стандарт без потери локальной специфики",
          critical: true,
          taskId: "task-standard",
          skill: "Стандартизация",
          risk: "Корпоративная модель становится слишком общей или несопоставимой",
          criterion: "Разделяет обязательное ядро и локальное расширение",
          intervention: "Шаблон описания: ядро, вариация, условие применимости"
        },
        {
          id: "req-transfer",
          name: "Упаковывает экспертное знание в повторяемую практику",
          critical: false,
          taskId: "task-transfer",
          skill: "Формализация знания",
          risk: "Критическое знание остается у одного носителя",
          criterion: "Создает инструкцию, критерии ошибки и проверочный кейс",
          intervention: "Интервью с экспертом и сбор карты ошибок"
        }
      ]
    },
    {
      id: "mentor",
      name: "Наставник",
      scope: "Локальная роль с корпоративными критериями",
      summary:
        "Помогает сотруднику освоить рабочую задачу в контексте, наблюдает выполнение, выявляет точечные дефициты и подтверждает готовность практикой.",
      tasks: [
        { id: "task-observe", name: "Наблюдение практики", context: "Сотрудник выполняет задачу на рабочем месте" },
        { id: "task-gap", name: "Выявление дефицита", context: "Ошибка, заминка или неполное понимание требования" },
        { id: "task-confirm", name: "Подтверждение готовности", context: "Допуск к самостоятельной работе" }
      ],
      requirements: [
        {
          id: "req-observe",
          name: "Отличает ошибку знания от ошибки процесса",
          critical: true,
          taskId: "task-observe",
          skill: "Диагностика выполнения",
          risk: "Сотруднику назначают лишнее обучение вместо точечной помощи",
          criterion: "По наблюдению классифицирует источник ошибки",
          intervention: "Чек-лист наблюдения: знание, навык, контекст, ресурс"
        },
        {
          id: "req-gap",
          name: "Формулирует дефицит через задачу и контекст",
          critical: true,
          taskId: "task-gap",
          skill: "Описание дефицита",
          risk: "Развитие не прослеживается от проблемы до результата",
          criterion: "Записывает дефицит как проверяемое несоответствие",
          intervention: "Практика переформулирования пяти типовых ошибок"
        },
        {
          id: "req-confirm",
          name: "Подтверждает готовность наблюдаемым результатом",
          critical: false,
          taskId: "task-confirm",
          skill: "Оценка готовности",
          risk: "Решение о допуске остается субъективным",
          criterion: "Фиксирует факт, критерий и ограничение готовности",
          intervention: "Калибровка критериев на двух кейсах допуска"
        }
      ]
    }
  ],
  employees: [
    {
      id: "ivanova",
      name: "Анна Иванова",
      assessments: {
        "shift-lead": { "req-map": 3, "req-risk": 1, "req-feedback": 2 },
        "process-engineer": { "req-cause": 2, "req-standard": 1, "req-transfer": 2 },
        mentor: { "req-observe": 2, "req-gap": 1, "req-confirm": 2 }
      }
    },
    {
      id: "petrov",
      name: "Михаил Петров",
      assessments: {
        "shift-lead": { "req-map": 2, "req-risk": 2, "req-feedback": 1 },
        "process-engineer": { "req-cause": 3, "req-standard": 2, "req-transfer": 1 },
        mentor: { "req-observe": 3, "req-gap": 2, "req-confirm": 1 }
      }
    },
    {
      id: "sokolova",
      name: "Елена Соколова",
      assessments: {
        "shift-lead": { "req-map": 3, "req-risk": 3, "req-feedback": 2 },
        "process-engineer": { "req-cause": 2, "req-standard": 3, "req-transfer": 3 },
        mentor: { "req-observe": 2, "req-gap": 3, "req-confirm": 3 }
      }
    }
  ],
  levels: [
    { value: 0, label: "Нет данных" },
    { value: 1, label: "Не соотв." },
    { value: 2, label: "Частично" },
    { value: 3, label: "Соотв." }
  ]
};

const state = {
  mode: "role",
  roleId: data.roles[0].id,
  employeeId: data.employees[0].id,
  pendingEmployeeId: null,
  peopleOpen: false,
  rolesOpen: true
};

const byId = (items, id) => items.find((item) => item.id === id);

function getAssessment(employee, role) {
  employee.assessments[role.id] ||= {};
  role.requirements.forEach((requirement) => {
    employee.assessments[role.id][requirement.id] ??= 0;
  });
  return employee.assessments[role.id];
}

function calculateReadiness(role, assessment) {
  const max = role.requirements.length * 3;
  const current = role.requirements.reduce((sum, requirement) => sum + assessment[requirement.id], 0);
  return Math.round((current / max) * 100);
}

function renderRoleList() {
  const list = document.querySelector("#roleList");
  document.querySelector("#roleCount").textContent = data.roles.length;
  list.innerHTML = "";
  list.classList.toggle("collapsed", !state.rolesOpen);
  document.querySelector("#rolesToggle").setAttribute("aria-expanded", String(state.rolesOpen));

  data.roles.forEach((role) => {
    const button = document.createElement("button");
    button.className = `role-button${state.mode === "role" && role.id === state.roleId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${role.name}</strong><span>${role.scope}</span>`;
    button.addEventListener("click", () => {
      state.mode = "role";
      state.roleId = role.id;
      state.pendingEmployeeId = null;
      render();
    });
    list.append(button);
  });
}

function renderPeopleList() {
  const list = document.querySelector("#peopleList");
  document.querySelector("#peopleCount").textContent = data.employees.length;
  list.innerHTML = "";
  list.classList.toggle("collapsed", !state.peopleOpen);
  document.querySelector("#peopleToggle").setAttribute("aria-expanded", String(state.peopleOpen));

  data.employees.forEach((employee) => {
    const button = document.createElement("button");
    button.className = `person-button${state.mode === "person" && employee.id === state.employeeId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${employee.name}</strong><span>Оценка готовности по роли</span>`;
    button.addEventListener("click", () => {
      state.pendingEmployeeId = employee.id;
      openRolePicker(employee);
    });
    list.append(button);
  });
}

function renderPassport(role) {
  document.querySelector("#roleTitle").textContent = role.name;
  document.querySelector("#roleScope").textContent = role.scope;
  document.querySelector("#roleSummary").textContent = role.summary;

  const facts = document.querySelector("#roleFacts");
  facts.innerHTML = "";
  [
    ["Задачи", role.tasks.map((task) => task.name).join(", ")],
    ["Критичные требования", role.requirements.filter((item) => item.critical).length],
    ["Контекст", role.tasks.map((task) => task.context).join("; ")],
    ["Критерии готовности", role.requirements.map((item) => item.criterion).join("; ")]
  ].forEach(([label, value]) => {
    const fact = document.createElement("div");
    fact.className = "fact";
    fact.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    facts.append(fact);
  });
}

function renderRequirements(role, employee, assessment) {
  document.querySelector("#assessmentContext").textContent = employee.name;
  const list = document.querySelector("#requirementsList");
  list.innerHTML = "";

  role.requirements.forEach((requirement) => {
    const item = document.createElement("div");
    item.className = "requirement";
    item.innerHTML = `
      <div class="requirement-header">
        <strong>${requirement.name}</strong>
        <span class="critical">${requirement.critical ? "Критично" : "Развивающее"}</span>
      </div>
      <div class="segmented" role="group" aria-label="${requirement.name}"></div>
    `;

    const controls = item.querySelector(".segmented");
    data.levels.forEach((level) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = level.label;
      button.className = assessment[requirement.id] === level.value ? "active" : "";
      button.addEventListener("click", () => {
        assessment[requirement.id] = level.value;
        render();
      });
      controls.append(button);
    });

    list.append(item);
  });
}

function getGaps(role, assessment) {
  return role.requirements
    .filter((requirement) => assessment[requirement.id] < 3)
    .map((requirement) => ({
      ...requirement,
      level: assessment[requirement.id],
      severity: requirement.critical && assessment[requirement.id] < 2 ? "high" : "medium"
    }));
}

function renderGaps(role, assessment) {
  const gaps = getGaps(role, assessment);
  const list = document.querySelector("#gapList");
  document.querySelector("#gapCount").textContent = gaps.length ? `${gaps.length} активн.` : "нет";
  list.innerHTML = "";

  if (!gaps.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "По выбранной роли дефициты не выявлены. Готовность можно подтвердить наблюдаемым результатом и сохранить как доказательство.";
    list.append(empty);
    return;
  }

  gaps.forEach((gap) => {
    const task = byId(role.tasks, gap.taskId);
    const item = document.createElement("div");
    item.className = `gap ${gap.severity === "medium" ? "medium" : ""}`;
    item.innerHTML = `
      <strong>${gap.name}</strong>
      <p><b>Связка:</b> ${task.name} -> ${gap.skill} -> ${gap.criterion}</p>
      <p><b>Риск:</b> ${gap.risk}</p>
      <p><b>Минимальное действие:</b> ${gap.intervention}</p>
    `;
    list.append(item);
  });
}

function renderGraph(role, assessment) {
  const svg = document.querySelector("#knowledgeGraph");
  const width = svg.clientWidth || 900;
  const height = svg.clientHeight || 330;
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const center = { id: role.id, label: role.name, x: width * 0.16, y: height * 0.5, type: "role" };
  const nodes = [center];
  const edges = [];

  role.tasks.forEach((task, index) => {
    const y = ((index + 1) / (role.tasks.length + 1)) * height;
    const taskNode = { id: task.id, label: task.name, x: width * 0.38, y, type: "task" };
    nodes.push(taskNode);
    edges.push([center.id, task.id]);

    const reqs = role.requirements.filter((req) => req.taskId === task.id);
    reqs.forEach((req) => {
      const reqNode = {
        id: req.id,
        label: req.skill,
        x: width * 0.62,
        y,
        type: "req",
        value: state.mode === "person" ? assessment[req.id] : null
      };
      const riskNode = { id: `${req.id}-risk`, label: "Риск", x: width * 0.78, y: y - 34, type: "risk" };
      const actionNode = { id: `${req.id}-action`, label: "Действие", x: width * 0.78, y: y + 34, type: "action" };
      nodes.push(reqNode, riskNode, actionNode);
      edges.push([task.id, req.id], [req.id, riskNode.id], [req.id, actionNode.id]);
    });
  });

  const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]));
  edges.forEach(([from, to]) => {
    const a = nodeMap[from];
    const b = nodeMap[to];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "edge");
    line.setAttribute("x1", a.x);
    line.setAttribute("y1", a.y);
    line.setAttribute("x2", b.x);
    line.setAttribute("y2", b.y);
    svg.append(line);
  });

  nodes.forEach((node) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "node");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", node.type === "role" ? 25 : 19);
    circle.setAttribute("fill", getNodeColor(node));

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y + 34);
    text.setAttribute("text-anchor", "middle");
    text.textContent = node.label;

    group.append(circle, text);
    svg.append(group);
  });
}

function getNodeColor(node) {
  if (node.type === "role") return "var(--node-role)";
  if (node.type === "task") return "var(--node-task)";
  if (node.type === "risk") return "var(--node-risk)";
  if (node.type === "action") return "var(--node-action)";
  if (node.value === null) return "var(--node-req)";
  if (node.value === 3) return "var(--ok)";
  if (node.value === 2) return "var(--warn)";
  return "var(--danger)";
}

function render() {
  const role = byId(data.roles, state.roleId);
  const employee = byId(data.employees, state.employeeId);
  const assessment = getAssessment(employee, role);
  const readiness = calculateReadiness(role, assessment);

  renderRoleList();
  renderPeopleList();
  renderPassport(role);
  renderMode(role, employee, assessment);
  renderGraph(role, assessment);
  if (state.mode === "person") {
    document.querySelector("#readinessScore").textContent = `${readiness}%`;
  }
}

function renderMode(role, employee, assessment) {
  const details = document.querySelector("#detailsGrid");
  const graphArea = document.querySelector(".graph-area");
  const readiness = document.querySelector(".readiness");
  const label = document.querySelector("#modeLabel");

  if (state.mode === "role") {
    label.textContent = "Граф знаний роли";
    details.classList.add("hidden");
    graphArea.classList.add("graph-only");
    readiness.classList.add("hidden");
    return;
  }

  label.textContent = `${employee.name} -> ${role.name}`;
  details.classList.remove("hidden");
  graphArea.classList.remove("graph-only");
  readiness.classList.remove("hidden");
  renderRequirements(role, employee, assessment);
  renderGaps(role, assessment);
}

function openRolePicker(employee) {
  const picker = document.querySelector("#rolePicker");
  const list = document.querySelector("#rolePickerList");
  document.querySelector("#rolePickerEmployee").textContent = `${employee.name}: выберите роль для оценки готовности.`;
  list.innerHTML = "";

  data.roles.forEach((role) => {
    const button = document.createElement("button");
    button.className = "role-button";
    button.type = "button";
    button.innerHTML = `<strong>${role.name}</strong><span>${role.scope}</span>`;
    button.addEventListener("click", () => {
      state.mode = "person";
      state.employeeId = employee.id;
      state.roleId = role.id;
      state.pendingEmployeeId = null;
      closeRolePicker();
      render();
    });
    list.append(button);
  });

  picker.classList.remove("hidden");
}

function closeRolePicker() {
  state.pendingEmployeeId = null;
  document.querySelector("#rolePicker").classList.add("hidden");
}

document.querySelector("#peopleToggle").addEventListener("click", () => {
  state.peopleOpen = !state.peopleOpen;
  renderPeopleList();
});

document.querySelector("#rolesToggle").addEventListener("click", () => {
  state.rolesOpen = !state.rolesOpen;
  renderRoleList();
});

document.querySelector("#rolePickerClose").addEventListener("click", closeRolePicker);
document.querySelector("#rolePicker").addEventListener("click", (event) => {
  if (event.target.id === "rolePicker") {
    closeRolePicker();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRolePicker();
  }
});

render();
window.addEventListener("resize", render);
