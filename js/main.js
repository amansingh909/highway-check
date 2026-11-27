import { fetchEvents } from './api.js';

const highwaySelect = document.getElementById('highway');
const typeFilterSelect = document.getElementById('type-filter');
const status = document.getElementById('status');
const eventsList = document.getElementById('events');

highwaySelect.addEventListener('change', updateEvents);
typeFilterSelect.addEventListener('change', updateEvents);

async function updateEvents() {
    const highway = highwaySelect.value;
    const type = typeFilterSelect.value;
    status.textContent = 'Loading...';
    try {
        const events = await fetchEvents(highway, type);
        eventsList.innerHTML = '';
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.type}: ${event.description}`;
            eventsList.appendChild(li);
        });
        status.textContent = `${events.length} events found.`;
    } catch (error) {
        console.error(error);
        status.textContent = 'Error loading events.';
    }
}
updateEvents();