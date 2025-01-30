// script.js
const daysContainer = document.getElementById("days");
const monthYearDisplay = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const eventList = document.getElementById("eventList");

let currentDate = new Date();

// Defina os eventos específicos por data e os eventos recorrentes para quarta, sábado e domingo
const events = {
  "2024-11-10": { name: "- Confraternização", color: "#89AAE6" },
  "2024-12-25": { name: "- Natal", color: "#89AAE6" },
  "2025-02-02": { name: "- Encontro de Mulheres - 16h30", color: "#89AAE6" },
  "2025-03-01": { name: "- Aviva Jovem - 19h30", color: "#89AAE6" },
  "2025-03-02": { name: "- Aviva Jovem - 18h", color: "#89AAE6" },
  "2025-04-05": { name: "- Culto de Jovens - 18h", color: "#89AAE6" },
  "2025-05-04": { name: "- Encontro de Mulheres - 16h30", color: "#89AAE6" },
  "2025-06-07": { name: "- Culto de Louvor - 18h", color: "#89AAE6" },
  "2025-07-06": { name: "- Culto de Jovens - 18h", color: "#89AAE6" },
  "2025-08-03": { name: "- Encontro de Mulheres - 16h30", color: "#89AAE6" },
  "2025-09-06": { name: "- Culto de Louvor - 18h", color: "#89AAE6" },
  "2025-10-05": { name: "- Culto das Crianças - 18h", color: "#89AAE6" },
};

// Eventos recorrentes em dias da semana específicos
const recurringEvents = {
  3: { name: "Quarta-Feira | Culto de Oração - 20h", color: "#0471A6" },  // Quarta-feira
  6: { name: "Sábado | Culto de Louvor e Adoração - 18h", color: "#3685B5" },        // Sábado
  0: { name: "Domingo | Culto de Louvor e Adoração - 18h", color: "#3685B5" },       // Domingo
};

// Evento para o segundo sábado do mês
const secondSaturdayEvent = { name: "Segundo Sábado | Culto Geral Sede - 18h", color: "#00bcd4" };

// Conjunto para armazenar os eventos recorrentes já exibidos na lista lateral
const displayedRecurringEvents = new Set();

function renderCalendar() {
  daysContainer.innerHTML = "";
  eventList.innerHTML = ""; // Limpa a lista de eventos antes de renderizar
  displayedRecurringEvents.clear(); // Limpa o conjunto de eventos recorrentes já exibidos

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYearDisplay.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

  // Renderiza os dias em branco no início do calendário
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day");
    daysContainer.appendChild(emptyDiv);
  }

  // Calcula o segundo sábado do mês
  const secondSaturday = getSecondSaturday(year, month);

  // Renderiza os dias do mês e destaca os dias com eventos
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = day;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const currentDayOfWeek = new Date(year, month, day).getDay();

    // Verifica se a data tem um evento específico
    if (events[dateStr]) {
      dayDiv.classList.add("event");
      dayDiv.style.backgroundColor = events[dateStr].color; // Define a cor do evento específico
      addEventToList(dateStr, events[dateStr].name, events[dateStr].color); // Adiciona o evento à lista lateral
    }

    // Verifica se há um evento recorrente para o dia da semana
    else if (recurringEvents[currentDayOfWeek]) {
      const recurringEvent = recurringEvents[currentDayOfWeek];
      dayDiv.classList.add("event");
      dayDiv.style.backgroundColor = recurringEvent.color; // Define a cor do evento recorrente

      // Adiciona o evento recorrente à lista lateral apenas se ainda não foi exibido
      if (!displayedRecurringEvents.has(recurringEvent.name)) {
        addEventToList("", recurringEvent.name, recurringEvent.color);
        displayedRecurringEvents.add(recurringEvent.name); // Marca como exibido
      }
    }

    // Verifica se é o segundo sábado e adiciona o evento
    if (day === secondSaturday) {
      dayDiv.classList.add("event");
      dayDiv.style.backgroundColor = secondSaturdayEvent.color;
      addEventToList(dateStr, secondSaturdayEvent.name, secondSaturdayEvent.color); // Adiciona o evento do segundo sábado à lista lateral
    }

    daysContainer.appendChild(dayDiv);
  }
}

// Função para calcular a data do segundo sábado de um mês
function getSecondSaturday(year, month) {
  // Cria uma data para o primeiro dia do mês
  const firstDayOfMonth = new Date(year, month, 1);
  // Determina o dia da semana para o primeiro sábado (7 - dayOfWeek para pegar o primeiro sábado)
  const firstSaturday = (6 - firstDayOfMonth.getDay() + 7) % 7 + 1;

  // O segundo sábado será 7 dias após o primeiro
  return firstSaturday + 7;
}

// Função para adicionar um evento à lista lateral com cor específica
function addEventToList(date, eventName, color) {
  const eventItem = document.createElement("li");
  eventItem.textContent = `${date} ${eventName}`;
  eventItem.style.color = color; // Define a cor do texto do evento
  eventList.appendChild(eventItem);
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
