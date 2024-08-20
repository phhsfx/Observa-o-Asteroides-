
const apiKey = 'AK84ksF92ouptPjNBwyeXxzHRInUrjxpoH9JAxAB';
const startDate = '2024-08-01'; 
const endDate = '2024-08-07';

const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

async function fetchAsteroidData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro na rede ao buscar dados dos asteroides.');
        }
        const data = await response.json();
        displayAsteroidData(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        document.getElementById('asteroid-info').innerHTML = '<p>Ocorreu um erro ao buscar os dados.</p>';
    }
}

function displayAsteroidData(data) {
    const asteroidList = document.getElementById('asteroid-info');
    asteroidList.innerHTML = ''; 

    if (data.near_earth_objects) {
        Object.values(data.near_earth_objects).forEach(dayAsteroids => {
            dayAsteroids.forEach(asteroid => {
                const asteroidElement = document.createElement('div');
                asteroidElement.className = 'asteroid';

                asteroidElement.innerHTML = `
                    <h2>${asteroid.name}</h2>
                    <p>Diâmetro estimado: ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                    <p>Distância mínima: ${asteroid.close_approach_data[0].miss_distance.kilometers} km</p>
                    <p>Data da abordagem: ${asteroid.close_approach_data[0].close_approach_date}</p>
                `;

                asteroidList.appendChild(asteroidElement);
            });
        });
    } else {
        asteroidList.innerHTML = '<p>Sem dados disponíveis para as datas selecionadas.</p>';
    }
}


fetchAsteroidData();
