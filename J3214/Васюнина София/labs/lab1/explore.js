let allModels = []; 
const itemsPerPage = 6;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchModels();
    setupPagination();
});

// get data wuth async func
async function fetchModels() {
    const spinner = document.getElementById('loading-spinner');

    try {
        const response = await fetch('https://huggingface.co/api/models?sort=downloads&direction=-1&limit=18');

        if(!response.ok){
            throw new Error(`HTTP error >:( status: ${response.status}`);
        }
        
        allModels = await response.json();
        spinner.style.display = 'none';
        renderPage(1);
    } catch (error) {
        console.error('error while loading models:', error);
        spinner.innerHTML = `<p class="text-danger">Failed to load models. Please try again later.</p>`;
    }
}

// html rendering
function renderPage(page) {
    currentPage = page;
    const container = document.getElementById('models-container');
    container.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const modelsToRender = allModels.slice(start, end);

    modelsToRender.forEach(model => {
        const modelName = model.id.split('/').pop();
        const author = model.author || 'Community';
        const task = model.pipeline_tag || 'Generic Model';
        
        let downloads = model.downloads || 0;
        if (downloads > 1000) downloads = (downloads / 1000).toFixed(1) + 'k';

        const avatarLetter = author.charAt(0).toUpperCase();

        const article = document.createElement('article');
        article.className = 'col-12 col-md-6';
        article.style.cursor = 'pointer';
        
        article.innerHTML = `
            <div class="card h-100 shadow-sm p-3">
                <div class="d-flex align-items-center mb-2">
                    <div class="avatar-sm me-2 bg-secondary text-white d-flex align-items-center justify-content-center rounded">
                        ${author.charAt(0).toUpperCase()}
                    </div>
                    <span class="text-secondary small">${author}</span>
                </div>
                <h5 class="card-title mb-1 text-truncate">${modelName}</h5>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-light text-dark border">${model.pipeline_tag || 'AI'}</span>
                    <span class="text-secondary small">⭐ ${model.downloads || 0}</span>
                </div>
            </div>
        `;

        article.addEventListener('click', () => {
            localStorage.setItem('selectedModel', JSON.stringify(model));
            window.location.href = 'item-card.html';
        });

        container.appendChild(article);

    });

    updatePaginationUI();
}

// pages clicker
function setupPagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    pagination.addEventListener('click', (e) => {
        e.preventDefault();
        
        const target = e.target;
        if (!target.classList.contains('page-link')) return;

        const text = target.innerText;
        const maxPage = Math.ceil(allModels.length / itemsPerPage);

        if (text === 'Previous') {
            if (currentPage > 1) renderPage(currentPage - 1);
        } else if (text === 'Next') {
            if (currentPage < maxPage) renderPage(currentPage + 1);
        } else {
            const pageNum = parseInt(text);
            if (!isNaN(pageNum)) renderPage(pageNum);
        }
    });
}

function updatePaginationUI() {
    const paginationItems = document.querySelectorAll('.pagination .page-item');
    if (paginationItems.length === 0) return;

    const maxPage = Math.ceil(allModels.length / itemsPerPage);

    if (currentPage === 1) paginationItems[0].classList.add('disabled');
    else paginationItems[0].classList.remove('disabled');

    for (let i = 1; i <= 3; i++) {
        if (i === currentPage) paginationItems[i].classList.add('active');
        else paginationItems[i].classList.remove('active');
    }

    if (currentPage === maxPage) paginationItems[4].classList.add('disabled');
    else paginationItems[4].classList.remove('disabled');
}