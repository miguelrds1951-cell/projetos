const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const targetInput = document.getElementById('target-input');
const habitTableBody = document.getElementById('habit-table-body');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveAndRender() {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderTable();
}

function renderTable() {
    habitTableBody.innerHTML = '';

    habits.forEach((habit, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${habit.name}</td>
            <td>${habit.targetDays} dias</td>
            <td>
                <button class="btn-delete" onclick="deleteHabit(${index})" title="Excluir">✕</button>
            </td>
        `;

        habitTableBody.appendChild(tr);
    });
}

habitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const habitName = habitInput.value.trim();
    const targetDays = targetInput.value;
    
    if (habitName && targetDays) {
        habits.push({ 
            name: habitName, 
            targetDays: targetDays 
        });
        
        habitInput.value = '';
        targetInput.value = '';
        saveAndRender();
    }
});

function deleteHabit(index) {
    habits.splice(index, 1);
    saveAndRender();
}

renderTable();
