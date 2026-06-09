const data = {
  roles: [
    {
      id: "l1-support",
      name: "L1 специалист поддержки",
      scope: "Единый фронт поддержки + продуктовая специфика",
      summary:
        "Принимает обращения пользователей enterprise-продукта, классифицирует их, восстанавливает базовый контекст, решает типовые случаи и корректно передает сложные инциденты дальше.",
      tasks: [
        { id: "task-triage", name: "Первичная классификация обращения", context: "Новый тикет, неполное описание, пользователь ожидает быстрый ответ" },
        { id: "task-basic-resolution", name: "Решение типового случая", context: "Известная ошибка, настройка доступа, вопрос по стандартному сценарию" },
        { id: "task-handoff", name: "Передача на следующий уровень", context: "Обращение выходит за рамки L1 или затрагивает критичный клиентский процесс" }
      ],
      foundations: [
        { id: "foundation-ticket-impact", taskId: "task-triage", name: "Модель влияния обращения", description: "Базовое понимание того, как тип обращения, число затронутых пользователей, критичность бизнес-процесса и договоренности SLA превращаются в приоритет поддержки." },
        { id: "foundation-support-playbooks", taskId: "task-basic-resolution", name: "Структура типовых playbook", description: "Знание логики стандартных сценариев поддержки: входные признаки, проверки, допустимые действия, стоп-сигналы и условия, при которых кейс нельзя решать на L1." },
        { id: "foundation-handoff-package", taskId: "task-handoff", name: "Пакет диагностического контекста", description: "Представление о минимальном наборе данных, который нужен следующему уровню поддержки: окружение, шаги, влияние, логи, проверки и история коммуникации." }
      ],
      requirements: [
        {
          id: "req-triage-severity",
          name: "Определяет тип, приоритет и влияние обращения",
          critical: true,
          taskId: "task-triage",
          foundationId: "foundation-ticket-impact",
          skill: "Триаж и severity",
          risk: "Критичный инцидент ошибочно остается в очереди низкого приоритета",
          criterion: "По описанию тикета определяет тип, влияние, срочность и следующий маршрут",
          intervention: "Разбор 12 реальных тикетов с калибровкой severity"
        },
        {
          id: "req-basic-playbook",
          name: "Применяет проверенный playbook без лишней эскалации",
          critical: true,
          taskId: "task-basic-resolution",
          foundationId: "foundation-support-playbooks",
          skill: "Работа с playbook",
          risk: "L2 перегружается типовыми случаями, а пользователь получает долгий ответ",
          criterion: "На типовом кейсе выбирает правильный playbook и фиксирует результат",
          intervention: "15-минутная практика по дереву решений для частых обращений"
        },
        {
          id: "req-handoff-context",
          name: "Передает достаточный контекст для L2/L3",
          critical: false,
          taskId: "task-handoff",
          foundationId: "foundation-handoff-package",
          skill: "Контекстная эскалация",
          risk: "Следующий уровень заново собирает данные и теряет время SLA",
          criterion: "Передает шаги воспроизведения, окружение, влияние, логи и уже выполненные проверки",
          intervention: "Шаблон handoff + проверка трех неполных эскалаций"
        }
      ]
    },
    {
      id: "l2-application-support",
      name: "L2 инженер прикладной поддержки",
      scope: "Продуктовая экспертиза + клиентские окружения",
      summary:
        "Диагностирует сложные обращения, связывает симптомы с конфигурацией продукта и данными клиента, готовит обходные решения и передает дефекты в разработку.",
      tasks: [
        { id: "task-diagnosis", name: "Диагностика сложного обращения", context: "Симптом не покрыт L1 playbook или зависит от конфигурации клиента" },
        { id: "task-workaround", name: "Подбор обходного решения", context: "Нужно восстановить бизнес-процесс до полноценного исправления" },
        { id: "task-defect-handoff", name: "Передача дефекта в разработку", context: "Подтвержден продуктовый дефект с воспроизводимым сценарием" }
      ],
      foundations: [
        { id: "foundation-product-topology", taskId: "task-diagnosis", name: "Топология продукта и окружений", description: "Понимание компонентов продукта, версий, конфигураций, зависимостей, клиентских данных и того, где искать наблюдаемые признаки сбоя." },
        { id: "foundation-evidence-chain", taskId: "task-diagnosis", name: "Цепочка диагностического доказательства", description: "Гносеологическое основание диагностики: различение факта, симптома, гипотезы, проверки и вывода, чтобы не подменять знание первым правдоподобным объяснением." },
        { id: "foundation-client-process-model", taskId: "task-diagnosis", name: "Модель клиентского бизнес-процесса", description: "Понимание того, как ошибка продукта проявляется в реальном процессе клиента: какие роли затронуты, где возникает блокировка и какой результат становится невозможным." },
        { id: "foundation-data-safety", taskId: "task-workaround", name: "Границы безопасного вмешательства", description: "Знание того, какие временные действия допустимы без риска потери данных, нарушения аудита, ухудшения интеграций или блокировки будущего исправления." },
        { id: "foundation-reproducibility", taskId: "task-defect-handoff", name: "Воспроизводимость дефекта", description: "Базовая логика доказательства продуктового дефекта: шаги, expected/actual, артефакты, окружение, версия и бизнес-влияние." }
      ],
      requirements: [
        {
          id: "req-config-diagnosis",
          name: "Связывает симптом с конфигурацией, данными и версией продукта",
          critical: true,
          taskId: "task-diagnosis",
          foundationId: "foundation-product-topology",
          skill: "Прикладная диагностика",
          risk: "Команда исправляет неверную причину или дает клиенту неподходящую рекомендацию",
          criterion: "Строит проверяемую гипотезу по версии, настройкам, данным и логам",
          intervention: "Кейс-лаборатория: диагностика трех обращений по логам и конфигурации"
        },
        {
          id: "req-diagnostic-evidence",
          name: "Отделяет наблюдаемый факт от гипотезы и интерпретации",
          critical: true,
          taskId: "task-diagnosis",
          foundationId: "foundation-evidence-chain",
          skill: "Доказательная диагностика",
          risk: "Команда преждевременно принимает гипотезу за причину и уводит решение в неверную сторону",
          criterion: "В кейсе маркирует факты, симптомы, гипотезы, проверки и подтвержденный вывод",
          intervention: "Разметка трех сложных тикетов по цепочке факт -> гипотеза -> проверка -> вывод"
        },
        {
          id: "req-business-process-impact",
          name: "Связывает технический симптом с нарушением процесса клиента",
          critical: false,
          taskId: "task-diagnosis",
          foundationId: "foundation-client-process-model",
          skill: "Процессный контекст клиента",
          risk: "Поддержка снижает приоритет технически тихой ошибки, хотя она блокирует критичный процесс клиента",
          criterion: "Описывает затронутый процесс, роль пользователя, остановленный результат и временное ограничение",
          intervention: "Разбор двух обращений через карту процесса клиента и точки блокировки"
        },
        {
          id: "req-safe-workaround",
          name: "Предлагает обходное решение без нарушения целостности данных",
          critical: true,
          taskId: "task-workaround",
          foundationId: "foundation-data-safety",
          skill: "Безопасный workaround",
          risk: "Временное решение создает новый дефект, потерю данных или нарушение регламента клиента",
          criterion: "Описывает эффект, ограничения, rollback и условия применения workaround",
          intervention: "Разбор матрицы безопасных и запрещенных обходных действий"
        },
        {
          id: "req-dev-handoff",
          name: "Передает дефект в разработку в воспроизводимом виде",
          critical: false,
          taskId: "task-defect-handoff",
          foundationId: "foundation-reproducibility",
          skill: "Bug report для разработки",
          risk: "Дефект возвращается из разработки из-за неполных данных и теряется время клиента",
          criterion: "Фиксирует шаги, expected/actual, окружение, артефакты и бизнес-влияние",
          intervention: "Ревью пяти bug report по чек-листу воспроизводимости"
        }
      ]
    },
    {
      id: "incident-manager",
      name: "Incident Manager",
      scope: "Единый процесс инцидентов + клиентская критичность",
      summary:
        "Управляет критичными инцидентами enterprise-клиентов: координирует роли, поддерживает коммуникацию, следит за SLA и закрывает инцидент с разбором причин.",
      tasks: [
        { id: "task-major-incident", name: "Запуск major incident процесса", context: "Высокое влияние на клиента, угроза SLA или публичная эскалация" },
        { id: "task-war-room", name: "Координация war room", context: "Несколько команд одновременно ищут причину и восстановление сервиса" },
        { id: "task-postmortem", name: "Пост-инцидентный разбор", context: "Сервис восстановлен, нужно предотвратить повторение" }
      ],
      foundations: [
        { id: "foundation-incident-policy", taskId: "task-major-incident", name: "Политика критичности инцидентов", description: "Понимание уровней инцидентов, SLA, клиентской критичности, критериев объявления major incident и последствий неверной классификации." },
        { id: "foundation-coordination-loop", taskId: "task-war-room", name: "Цикл координации инцидента", description: "Знание ритма управления: гипотезы, владельцы, таймбоксы, решения, next update, внешний статус и единая картина для всех участников." },
        { id: "foundation-incident-epistemics", taskId: "task-war-room", name: "Эпистемика коллективного расследования", description: "Понимание того, как в условиях неопределенности группа различает известное, неизвестное, предположение, проверку и принятое решение." },
        { id: "foundation-stakeholder-communication", taskId: "task-war-room", name: "Коммуникационная карта заинтересованных сторон", description: "Знание того, кому, в какой форме и с какой частотой нужен статус инцидента: клиенту, руководству, поддержке, инженерам и аккаунтной команде." },
        { id: "foundation-learning-loop", taskId: "task-postmortem", name: "Контур организационного обучения", description: "Понимание, как инцидент переводится в timeline, contributing factors, корректирующие действия, владельцев и проверку предотвращения повторения." }
      ],
      requirements: [
        {
          id: "req-incident-severity",
          name: "Корректно объявляет уровень инцидента и режим управления",
          critical: true,
          taskId: "task-major-incident",
          foundationId: "foundation-incident-policy",
          skill: "Major incident activation",
          risk: "Критичный инцидент не получает нужной скорости реакции или, наоборот, команда перегружается ложной тревогой",
          criterion: "По сигналам влияния, клиентской критичности и SLA выбирает уровень инцидента",
          intervention: "Калибровка severity на архиве major incident за последний квартал"
        },
        {
          id: "req-war-room-rhythm",
          name: "Поддерживает ритм решений, владельцев и коммуникаций",
          critical: true,
          taskId: "task-war-room",
          foundationId: "foundation-coordination-loop",
          skill: "Координация инцидента",
          risk: "Команды работают параллельно без владельцев, клиент получает противоречивые статусы",
          criterion: "Фиксирует владельцев, next update, гипотезы, решения и внешний статус",
          intervention: "Симуляция 30-минутного war room с таймбоксами и статусами"
        },
        {
          id: "req-unknowns-management",
          name: "Управляет неизвестным как отдельным объектом работы",
          critical: true,
          taskId: "task-war-room",
          foundationId: "foundation-incident-epistemics",
          skill: "Работа с неопределенностью",
          risk: "Команды спорят версиями без явного списка неизвестного и проверок",
          criterion: "Ведет список known/unknown, гипотез, проверок, владельцев и критериев подтверждения",
          intervention: "Симуляция incident board с отдельной колонкой неизвестного и проверок"
        },
        {
          id: "req-stakeholder-updates",
          name: "Разделяет инженерный статус и статус для заинтересованных сторон",
          critical: false,
          taskId: "task-war-room",
          foundationId: "foundation-stakeholder-communication",
          skill: "Incident stakeholder updates",
          risk: "Клиент и руководство получают слишком технический или неполный статус и теряют доверие к управлению инцидентом",
          criterion: "Формирует разные апдейты для инженеров, клиента и руководства с единым фактическим ядром",
          intervention: "Переписывание трех war room статусов для разных аудиторий"
        },
        {
          id: "req-actionable-postmortem",
          name: "Проводит postmortem с действиями, а не поиском виновных",
          critical: false,
          taskId: "task-postmortem",
          foundationId: "foundation-learning-loop",
          skill: "Blameless postmortem",
          risk: "Инцидент повторяется, потому что причины и действия не формализованы",
          criterion: "Отделяет timeline, contributing factors, corrective actions и владельцев",
          intervention: "Разбор одного postmortem и переписывание действий в проверяемую форму"
        }
      ]
    },
    {
      id: "sre",
      name: "SRE / инженер надежности",
      scope: "Платформа, наблюдаемость и эксплуатационные SLO",
      summary:
        "Поддерживает надежность enterprise-продукта через мониторинг, SLO, автоматизацию восстановления, анализ деградаций и снижение операционного риска.",
      tasks: [
        { id: "task-observability", name: "Настройка наблюдаемости", context: "Нужно видеть состояние сервиса до обращения клиента" },
        { id: "task-reliability-response", name: "Реакция на деградацию", context: "Метрики или алерты показывают ухудшение пользовательского опыта" },
        { id: "task-change-risk", name: "Оценка риска изменений", context: "Планируется релиз, миграция или изменение инфраструктуры" }
      ],
      foundations: [
        { id: "foundation-slo-model", taskId: "task-observability", name: "SLO-модель сервиса", description: "Понимание связи между SLI, SLO, error budget, пользовательским опытом и тем, какие сигналы действительно требуют реакции." },
        { id: "foundation-telemetry-semantics", taskId: "task-observability", name: "Семантика телеметрии", description: "Понимание смысла метрик, логов и трассировок: что именно они измеряют, какие искажения содержат и какие выводы из них допустимы." },
        { id: "foundation-service-dependency-map", taskId: "task-observability", name: "Карта зависимостей сервиса", description: "Знание связей между компонентами, интеграциями, очередями, базами данных и внешними провайдерами, чтобы алерт был привязан к возможной зоне причины." },
        { id: "foundation-operational-recovery", taskId: "task-reliability-response", name: "Модель операционного восстановления", description: "Знание типовых деградаций, runbook, условий эскалации, rollback и критериев, по которым восстановление считается подтвержденным." },
        { id: "foundation-change-blast-radius", taskId: "task-change-risk", name: "Blast radius изменений", description: "Понимание того, какие пользователи, компоненты, интеграции и данные может затронуть изменение, а также как ограничить и откатить влияние." }
      ],
      requirements: [
        {
          id: "req-slo-alerts",
          name: "Связывает алерты с пользовательским SLO и бизнес-влиянием",
          critical: true,
          taskId: "task-observability",
          foundationId: "foundation-slo-model",
          skill: "SLO-based monitoring",
          risk: "Команда реагирует на шумные технические алерты и пропускает реальную деградацию клиента",
          criterion: "Для сервиса задает SLI, порог, источник данных и действие при нарушении",
          intervention: "Пересборка одного алерта из технического в SLO-ориентированный"
        },
        {
          id: "req-telemetry-meaning",
          name: "Интерпретирует метрики и логи с учетом ограничений источника",
          critical: true,
          taskId: "task-observability",
          foundationId: "foundation-telemetry-semantics",
          skill: "Семантическая интерпретация телеметрии",
          risk: "Команда строит алерт на шумном или двусмысленном сигнале и теряет доверие к мониторингу",
          criterion: "Объясняет, что измеряет сигнал, чего он не доказывает и какой второй сигнал нужен для проверки",
          intervention: "Аудит пяти алертов: смысл сигнала, ложные срабатывания, подтверждающая метрика"
        },
        {
          id: "req-dependency-aware-alerting",
          name: "Связывает алерт с картой зависимостей сервиса",
          critical: false,
          taskId: "task-observability",
          foundationId: "foundation-service-dependency-map",
          skill: "Dependency-aware monitoring",
          risk: "Алерт показывает деградацию, но не помогает быстро определить вероятную зону причины",
          criterion: "Для алерта указывает затронутую зависимость, upstream/downstream эффект и первый диагностический шаг",
          intervention: "Построение мини-карты зависимостей для одного критичного пользовательского сценария"
        },
        {
          id: "req-runbook-response",
          name: "Использует runbook восстановления без импровизации в критичный момент",
          critical: true,
          taskId: "task-reliability-response",
          foundationId: "foundation-operational-recovery",
          skill: "Runbook execution",
          risk: "Восстановление зависит от личной памяти эксперта и занимает дольше SLA",
          criterion: "По алерту выполняет runbook, фиксирует результат и условие эскалации",
          intervention: "Game day: восстановление тестовой деградации по runbook"
        },
        {
          id: "req-change-guardrails",
          name: "Оценивает операционный риск изменения до релиза",
          critical: false,
          taskId: "task-change-risk",
          foundationId: "foundation-change-blast-radius",
          skill: "Change risk review",
          risk: "Релиз нарушает доступность или производительность критичного клиента",
          criterion: "Проверяет blast radius, rollback, мониторинг и окно изменений",
          intervention: "Чек-лист pre-release readiness для одного изменения"
        }
      ]
    },
    {
      id: "customer-success",
      name: "Customer Success Manager",
      scope: "Клиентский контур + продуктовая ценность",
      summary:
        "Связывает работу поддержки с бизнес-целями enterprise-клиента: управляет ожиданиями, рисками внедрения, эскалациями и доказательством ценности продукта.",
      tasks: [
        { id: "task-account-context", name: "Ведение клиентского контекста", context: "У клиента есть роли, процессы, интеграции, ограничения и политическая карта" },
        { id: "task-exec-communication", name: "Коммуникация при эскалации", context: "Клиент требует понятный статус, сроки и влияние на бизнес" },
        { id: "task-value-risk", name: "Управление риском ценности", context: "Клиент использует продукт, но не получает ожидаемый результат" }
      ],
      foundations: [
        { id: "foundation-account-system", taskId: "task-account-context", name: "Система клиентского контекста", description: "Понимание структуры клиента: stakeholders, процессы, интеграции, ограничения, критичные периоды, договоренности и история взаимодействия." },
        { id: "foundation-executive-framing", taskId: "task-exec-communication", name: "Управленческая рамка коммуникации", description: "Знание, как переводить техническую ситуацию в понятные для клиента категории влияния, контроля, сроков, владельцев и следующего обновления." },
        { id: "foundation-value-realization", taskId: "task-value-risk", name: "Модель реализации ценности", description: "Понимание связи между целями клиента, использованием продукта, барьерами внедрения, показателями успеха и риском оттока." }
      ],
      requirements: [
        {
          id: "req-account-map",
          name: "Восстанавливает карту клиента, процессов и критичных пользователей",
          critical: true,
          taskId: "task-account-context",
          foundationId: "foundation-account-system",
          skill: "Account context mapping",
          risk: "Поддержка решает тикет технически, но упускает бизнес-критичный контекст клиента",
          criterion: "Описывает stakeholders, процессы, интеграции, критичные периоды и договоренности",
          intervention: "Заполнение account map на одном активном клиенте с ревью руководителя"
        },
        {
          id: "req-exec-status",
          name: "Переводит технический статус в управленческое сообщение",
          critical: true,
          taskId: "task-exec-communication",
          foundationId: "foundation-executive-framing",
          skill: "Executive communication",
          risk: "Клиент воспринимает ситуацию как неконтролируемую, даже если команда уже работает над решением",
          criterion: "Формулирует влияние, текущий статус, следующий шаг, срок обновления и владельца",
          intervention: "Переписывание трех технических апдейтов в executive update"
        },
        {
          id: "req-value-gap",
          name: "Выявляет разрыв между использованием продукта и ожидаемой ценностью",
          critical: false,
          taskId: "task-value-risk",
          foundationId: "foundation-value-realization",
          skill: "Value gap diagnosis",
          risk: "Клиент формально активен, но риск оттока растет незаметно",
          criterion: "Связывает usage, цель клиента, барьер внедрения и нужное действие",
          intervention: "Короткое интервью по value gap и фиксация next best action"
        }
      ]
    },
    {
      id: "knowledge-manager",
      name: "Knowledge Manager поддержки",
      scope: "База знаний, playbook и переиспользование экспертизы",
      summary:
        "Превращает повторяющиеся обращения, экспертные решения и incident learnings в управляемые знания, которые ускоряют поддержку и снижают зависимость от отдельных экспертов.",
      tasks: [
        { id: "task-article-intake", name: "Отбор знания для формализации", context: "Повторяющийся тикет, новый workaround или урок после инцидента" },
        { id: "task-article-design", name: "Проектирование статьи или playbook", context: "Знание должно помогать L1/L2 принять решение, а не просто храниться" },
        { id: "task-knowledge-health", name: "Контроль актуальности знаний", context: "Версии продукта, процессы и клиентские сценарии меняются" }
      ],
      foundations: [
        { id: "foundation-reuse-value", taskId: "task-article-intake", name: "Ценность переиспользования знания", description: "Понимание, какие решения стоит формализовать по частоте, влиянию, аудитории, риску ошибки и потенциалу сокращения времени поддержки." },
        { id: "foundation-decision-logic", taskId: "task-article-design", name: "Логика принятия решения", description: "Знание того, как превратить экспертный текст в дерево проверок, условий, стоп-сигналов, исключений и маршрутов эскалации." },
        { id: "foundation-knowledge-lifecycle", taskId: "task-knowledge-health", name: "Жизненный цикл знания", description: "Понимание владения знанием, триггеров обновления, версионности, метрик полезности и риска устаревания после релизов и инцидентов." }
      ],
      requirements: [
        {
          id: "req-knowledge-intake",
          name: "Отличает критичное переиспользуемое знание от разового случая",
          critical: true,
          taskId: "task-article-intake",
          foundationId: "foundation-reuse-value",
          skill: "Knowledge intake",
          risk: "База знаний разрастается шумом, а критичные решения остаются в головах экспертов",
          criterion: "По тикету определяет частоту, влияние, аудиторию и формат знания",
          intervention: "Сортировка 20 тикетов по матрице: статья, playbook, known issue, не формализовать"
        },
        {
          id: "req-decision-playbook",
          name: "Проектирует playbook как дерево решений и проверок",
          critical: true,
          taskId: "task-article-design",
          foundationId: "foundation-decision-logic",
          skill: "Decision playbook design",
          risk: "Сотрудник читает статью, но не понимает, какое действие выбрать в своем контексте",
          criterion: "Создает шаги проверки, условия ветвления, стоп-сигналы и критерий эскалации",
          intervention: "Переработка одной длинной статьи в decision playbook"
        },
        {
          id: "req-knowledge-lifecycle",
          name: "Поддерживает жизненный цикл знания после релизов и инцидентов",
          critical: false,
          taskId: "task-knowledge-health",
          foundationId: "foundation-knowledge-lifecycle",
          skill: "Knowledge lifecycle",
          risk: "Устаревшая статья приводит к неверному решению или лишней эскалации",
          criterion: "Назначает владельца, срок ревью, триггер обновления и метрику полезности",
          intervention: "Настройка ревью-цикла для десяти наиболее используемых статей"
        }
      ]
    }
  ],
  employees: [
    {
      id: "ivanova",
      name: "Анна Иванова",
      assessments: {
        "l1-support": { "req-triage-severity": 3, "req-basic-playbook": 3, "req-handoff-context": 2 },
        "l2-application-support": { "req-config-diagnosis": 2, "req-diagnostic-evidence": 2, "req-business-process-impact": 1, "req-safe-workaround": 1, "req-dev-handoff": 2 },
        "incident-manager": { "req-incident-severity": 2, "req-war-room-rhythm": 1, "req-unknowns-management": 1, "req-stakeholder-updates": 2, "req-actionable-postmortem": 2 },
        sre: { "req-slo-alerts": 1, "req-telemetry-meaning": 2, "req-dependency-aware-alerting": 1, "req-runbook-response": 2, "req-change-guardrails": 1 },
        "customer-success": { "req-account-map": 2, "req-exec-status": 2, "req-value-gap": 1 },
        "knowledge-manager": { "req-knowledge-intake": 3, "req-decision-playbook": 2, "req-knowledge-lifecycle": 1 }
      }
    },
    {
      id: "petrov",
      name: "Михаил Петров",
      assessments: {
        "l1-support": { "req-triage-severity": 2, "req-basic-playbook": 2, "req-handoff-context": 3 },
        "l2-application-support": { "req-config-diagnosis": 3, "req-diagnostic-evidence": 3, "req-business-process-impact": 2, "req-safe-workaround": 2, "req-dev-handoff": 3 },
        "incident-manager": { "req-incident-severity": 2, "req-war-room-rhythm": 2, "req-unknowns-management": 2, "req-stakeholder-updates": 1, "req-actionable-postmortem": 1 },
        sre: { "req-slo-alerts": 2, "req-telemetry-meaning": 2, "req-dependency-aware-alerting": 2, "req-runbook-response": 3, "req-change-guardrails": 2 },
        "customer-success": { "req-account-map": 1, "req-exec-status": 1, "req-value-gap": 2 },
        "knowledge-manager": { "req-knowledge-intake": 2, "req-decision-playbook": 1, "req-knowledge-lifecycle": 1 }
      }
    },
    {
      id: "sokolova",
      name: "Елена Соколова",
      assessments: {
        "l1-support": { "req-triage-severity": 3, "req-basic-playbook": 2, "req-handoff-context": 3 },
        "l2-application-support": { "req-config-diagnosis": 2, "req-diagnostic-evidence": 2, "req-business-process-impact": 3, "req-safe-workaround": 2, "req-dev-handoff": 2 },
        "incident-manager": { "req-incident-severity": 3, "req-war-room-rhythm": 3, "req-unknowns-management": 2, "req-stakeholder-updates": 3, "req-actionable-postmortem": 2 },
        sre: { "req-slo-alerts": 2, "req-telemetry-meaning": 2, "req-dependency-aware-alerting": 3, "req-runbook-response": 2, "req-change-guardrails": 3 },
        "customer-success": { "req-account-map": 3, "req-exec-status": 3, "req-value-gap": 2 },
        "knowledge-manager": { "req-knowledge-intake": 2, "req-decision-playbook": 3, "req-knowledge-lifecycle": 2 }
      }
    },
    {
      id: "orlov",
      name: "Дмитрий Орлов",
      assessments: {
        "l1-support": { "req-triage-severity": 1, "req-basic-playbook": 2, "req-handoff-context": 1 },
        "l2-application-support": { "req-config-diagnosis": 1, "req-diagnostic-evidence": 1, "req-business-process-impact": 1, "req-safe-workaround": 1, "req-dev-handoff": 1 },
        "incident-manager": { "req-incident-severity": 1, "req-war-room-rhythm": 1, "req-unknowns-management": 1, "req-stakeholder-updates": 0, "req-actionable-postmortem": 0 },
        sre: { "req-slo-alerts": 3, "req-telemetry-meaning": 3, "req-dependency-aware-alerting": 2, "req-runbook-response": 2, "req-change-guardrails": 2 },
        "customer-success": { "req-account-map": 1, "req-exec-status": 1, "req-value-gap": 1 },
        "knowledge-manager": { "req-knowledge-intake": 1, "req-decision-playbook": 1, "req-knowledge-lifecycle": 2 }
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
  rolesOpen: true,
  nodePositions: {}
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
    ["Фундамент", role.foundations.map((foundation) => foundation.name).join(", ")],
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
  svg.onpointermove = null;
  svg.onpointerup = null;
  svg.onpointerleave = null;

  const center = {
    id: role.id,
    label: role.name,
    x: width * 0.12,
    y: height * 0.5,
    type: "role",
    entityType: "role",
    entityId: role.id
  };
  const nodes = [center];
  const edges = [];
  const graphKey = getGraphKey();

  role.tasks.forEach((task, index) => {
    const y = ((index + 1) / (role.tasks.length + 1)) * height;
    const taskNode = {
      id: task.id,
      label: task.name,
      x: width * 0.32,
      y,
      type: "task",
      entityType: "task",
      entityId: task.id
    };
    nodes.push(taskNode);
    edges.push([center.id, task.id]);

    const foundations = role.foundations.filter((foundation) => foundation.taskId === task.id);
    foundations.forEach((foundation, foundationIndex) => {
      const foundationY = foundations.length === 1 ? y : y + (foundationIndex - (foundations.length - 1) / 2) * 54;
      const foundationNode = {
        id: foundation.id,
        label: foundation.name,
        x: width * 0.52,
        y: foundationY,
        type: "foundation",
        entityType: "foundation",
        entityId: foundation.id
      };
      nodes.push(foundationNode);
      edges.push([task.id, foundation.id]);

      const reqs = role.requirements.filter((req) => req.foundationId === foundation.id);
      reqs.forEach((req, reqIndex) => {
        const reqY = reqs.length === 1 ? foundationY : foundationY + (reqIndex - (reqs.length - 1) / 2) * 54;
      const reqNode = {
        id: req.id,
        label: req.skill,
          x: state.mode === "person" ? width * 0.68 : width * 0.76,
          y: reqY,
        type: "req",
        value: state.mode === "person" ? assessment[req.id] : null,
        requirementId: req.id
      };
      nodes.push(reqNode);
        edges.push([foundation.id, req.id]);

      if (state.mode === "person") {
          const riskNode = { id: `${req.id}-risk`, label: "Риск", x: width * 0.86, y: reqY - 30, type: "risk" };
          const actionNode = { id: `${req.id}-action`, label: "Действие", x: width * 0.86, y: reqY + 30, type: "action" };
        nodes.push(riskNode, actionNode);
        edges.push([req.id, riskNode.id], [req.id, actionNode.id]);
      }
      });
    });
  });

  nodes.forEach((node) => {
    const saved = state.nodePositions[graphKey]?.[node.id];
    if (saved) {
      node.x = saved.x;
      node.y = saved.y;
    }
  });

  const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const edgeElements = [];
  edges.forEach(([from, to]) => {
    const a = nodeMap[from];
    const b = nodeMap[to];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "edge");
    line.setAttribute("x1", a.x);
    line.setAttribute("y1", a.y);
    line.setAttribute("x2", b.x);
    line.setAttribute("y2", b.y);
    line.dataset.from = from;
    line.dataset.to = to;
    svg.append(line);
    edgeElements.push(line);
  });

  nodes.forEach((node) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const isClickable = ["role", "task", "foundation"].includes(node.type) || (node.type === "req" && state.mode === "role");
    group.setAttribute("class", `node draggable${isClickable ? " clickable" : ""}`);
    group.dataset.nodeId = node.id;
    group.addEventListener(
      "click",
      (event) => {
        if (node.wasDragged) {
          event.preventDefault();
          event.stopImmediatePropagation();
          node.wasDragged = false;
        }
      },
      true
    );
    if (["role", "task", "foundation"].includes(node.type)) {
      group.setAttribute("role", "button");
      group.setAttribute("tabindex", "0");
      group.setAttribute("aria-label", `Открыть описание: ${node.label}`);
      group.addEventListener("click", () => openEntityModal(role, node.entityType, node.entityId));
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openEntityModal(role, node.entityType, node.entityId);
        }
      });
    }
    if (node.type === "req" && state.mode === "role") {
      group.setAttribute("role", "button");
      group.setAttribute("tabindex", "0");
      group.setAttribute("aria-label", `Открыть требование: ${node.label}`);
      group.addEventListener("click", () => openRequirementModal(role, node.requirementId));
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRequirementModal(role, node.requirementId);
        }
      });
    }
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", getNodeRadius(node));
    circle.setAttribute("fill", getNodeColor(node));

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y + getLabelOffset(node));
    text.setAttribute("text-anchor", "middle");
    const labelBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    labelBox.setAttribute("class", "node-label-box");
    labelBox.setAttribute("rx", "6");
    labelBox.setAttribute("ry", "6");
    renderWrappedLabel(text, node.label, node.type === "foundation" ? 16 : 18);
    positionLabelBox(labelBox, text, node.x, node.y + getLabelOffset(node));

    group.addEventListener("pointerdown", (event) => {
      startNodeDrag(event, svg, group, node, nodeMap, edgeElements, graphKey, width, height);
    });

    group.append(circle, labelBox, text);
    svg.append(group);
  });
}

function getGraphKey() {
  return `${state.mode}:${state.roleId}:${state.mode === "person" ? state.employeeId : "role-only"}`;
}

function getLabelOffset(node) {
  if (node.type === "foundation") return 25;
  if (node.type === "role") return 38;
  return 33;
}

function renderWrappedLabel(text, label, maxChars) {
  const words = label.split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  const limited = lines.slice(0, 3);
  if (lines.length > 3) {
    limited[2] = `${limited[2].replace(/\.$/, "")}...`;
  }

  text.innerHTML = "";
  limited.forEach((line, index) => {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.setAttribute("x", text.getAttribute("x"));
    tspan.setAttribute("dy", index === 0 ? "0" : "13");
    tspan.textContent = line;
    text.append(tspan);
  });
}

function positionLabelBox(labelBox, text, x, y) {
  const lineCount = text.children.length || 1;
  const width = Math.min(168, Math.max(62, [...text.children].reduce((max, item) => Math.max(max, item.textContent.length * 6.2), 0) + 16));
  const height = lineCount * 13 + 8;
  labelBox.setAttribute("x", x - width / 2);
  labelBox.setAttribute("y", y - 11);
  labelBox.setAttribute("width", width);
  labelBox.setAttribute("height", height);
}

function startNodeDrag(event, svg, group, node, nodeMap, edgeElements, graphKey, width, height) {
  if (event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();

  const point = getSvgPoint(svg, event);
  const offset = { x: point.x - node.x, y: point.y - node.y };
  node.wasDragged = false;
  group.classList.add("dragging");
  group.setPointerCapture(event.pointerId);

  svg.onpointermove = (moveEvent) => {
    const next = getSvgPoint(svg, moveEvent);
    const x = clamp(next.x - offset.x, 36, width - 36);
    const y = clamp(next.y - offset.y, 30, height - 54);
    if (Math.abs(x - node.x) > 2 || Math.abs(y - node.y) > 2) {
      node.wasDragged = true;
    }

    node.x = x;
    node.y = y;
    nodeMap[node.id] = node;
    state.nodePositions[graphKey] ||= {};
    state.nodePositions[graphKey][node.id] = { x, y };
    updateNodePosition(group, node);
    updateConnectedEdges(edgeElements, nodeMap, node.id);
  };

  const finish = (upEvent) => {
    group.classList.remove("dragging");
    svg.onpointermove = null;
    svg.onpointerup = null;
    svg.onpointerleave = null;
    try {
      group.releasePointerCapture(upEvent.pointerId);
    } catch {
      // Pointer capture can already be released by the browser.
    }
  };

  svg.onpointerup = finish;
  svg.onpointerleave = finish;
}

function getSvgPoint(svg, event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function updateNodePosition(group, node) {
  const circle = group.querySelector("circle");
  const text = group.querySelector("text");
  const box = group.querySelector(".node-label-box");
  circle.setAttribute("cx", node.x);
  circle.setAttribute("cy", node.y);
  text.setAttribute("x", node.x);
  text.setAttribute("y", node.y + getLabelOffset(node));
  [...text.children].forEach((tspan) => tspan.setAttribute("x", node.x));
  positionLabelBox(box, text, node.x, node.y + getLabelOffset(node));
}

function updateConnectedEdges(edgeElements, nodeMap, nodeId) {
  edgeElements.forEach((line) => {
    if (line.dataset.from !== nodeId && line.dataset.to !== nodeId) return;
    const from = nodeMap[line.dataset.from];
    const to = nodeMap[line.dataset.to];
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getNodeRadius(node) {
  if (node.type === "role") return 25;
  if (node.type === "foundation") return 12;
  return 19;
}

function getNodeColor(node) {
  if (node.type === "role") return "var(--node-role)";
  if (node.type === "task") return "var(--node-task)";
  if (node.type === "foundation") return "var(--node-task)";
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

function openEntityModal(role, entityType, entityId) {
  let title = "";
  let facts = [];

  if (entityType === "role") {
    title = role.name;
    facts = [
      ["Тип сущности", "Роль"],
      ["Назначение", role.summary],
      ["Граница применимости", role.scope],
      ["Связанные задачи", role.tasks.map((task) => task.name).join(", ")],
      ["Фундаментальные знания", role.foundations.map((foundation) => foundation.name).join(", ")]
    ];
  }

  if (entityType === "task") {
    const task = byId(role.tasks, entityId);
    const foundations = role.foundations.filter((foundation) => foundation.taskId === task.id);
    const requirements = role.requirements.filter((requirement) => foundations.some((foundation) => foundation.id === requirement.foundationId));
    title = task.name;
    facts = [
      ["Тип сущности", "Задача"],
      ["Описание", task.context],
      ["Почему важна", "Задача описывает прикладное действие роли в конкретном рабочем контексте. Ее выполнение зависит от связанных фундаментальных знаний и проверяемых требований."],
      ["Связанный фундамент", foundations.map((foundation) => foundation.name).join(", ")],
      ["Требования", requirements.map((requirement) => requirement.name).join("; ")]
    ];
  }

  if (entityType === "foundation") {
    const foundation = byId(role.foundations, entityId);
    const task = byId(role.tasks, foundation.taskId);
    const requirements = role.requirements.filter((requirement) => requirement.foundationId === foundation.id);
    title = foundation.name;
    facts = [
      ["Тип сущности", "Фундамент"],
      ["Описание", foundation.description],
      ["Связанная задача", `${task.name}: ${task.context}`],
      ["Логика связи", "Без этого знания сотрудник может выполнить отдельные шаги механически, но не сможет надежно принять решение в изменившемся контексте."],
      ["Требования / знания / навыки", requirements.map((requirement) => requirement.name).join("; ")]
    ];
  }

  document.querySelector("#requirementModalTitle").textContent = title;
  document.querySelector("#requirementModalBody").innerHTML = facts
    .map(([label, value]) => `
      <div class="modal-fact">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `)
    .join("");
  document.querySelector("#requirementModal").classList.remove("hidden");
}

function openRequirementModal(role, requirementId) {
  const requirement = byId(role.requirements, requirementId);
  const task = byId(role.tasks, requirement.taskId);
  const foundation = byId(role.foundations, requirement.foundationId);
  document.querySelector("#requirementModalTitle").textContent = requirement.name;
  document.querySelector("#requirementModalBody").innerHTML = `
    <div class="modal-fact">
      <span>Знание / навык</span>
      <strong>${requirement.skill}</strong>
    </div>
    <div class="modal-fact">
      <span>Фундамент</span>
      <strong>${foundation.name}: ${foundation.description}</strong>
    </div>
    <div class="modal-fact">
      <span>Связанная задача</span>
      <strong>${task.name}: ${task.context}</strong>
    </div>
    <div class="modal-fact">
      <span>Критерий готовности</span>
      <strong>${requirement.criterion}</strong>
    </div>
    <div class="modal-fact">
      <span>Риск</span>
      <strong>${requirement.risk}</strong>
    </div>
    <div class="modal-fact">
      <span>Минимальное действие развития</span>
      <strong>${requirement.intervention}</strong>
    </div>
  `;
  document.querySelector("#requirementModal").classList.remove("hidden");
}

function closeRequirementModal() {
  document.querySelector("#requirementModal").classList.add("hidden");
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

document.querySelector("#requirementModalClose").addEventListener("click", closeRequirementModal);
document.querySelector("#requirementModal").addEventListener("click", (event) => {
  if (event.target.id === "requirementModal") {
    closeRequirementModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRolePicker();
    closeRequirementModal();
  }
});

render();
window.addEventListener("resize", render);
