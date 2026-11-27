const BASE_URL = "https://api.open511.gov.bc.ca/events";

function cleanEvent(raw) {
    return {
        id: raw.id,
        severity: raw.severity,
        type: raw.event_type,
        description: raw.description,
        updated: raw.updated,
        state: raw.roads?.[0]?.state,
    };
}

export async function fetchEvents(highway, type) {
    const url = `${BASE_URL}?format=json&status=ACTIVE&road_name=${encodeURIComponent(highway)}&limit=500`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`DriveBC returned ${response.status}`);
    }
    const data = await response.json();
    let events = data.events.map(cleanEvent);
    if (type) {
        events = events.filter(event => event.type === type);
    }
    return events;
}