document.addEventListener('DOMContentLoaded', () => {
    fetchModels();
});

// get data wuth async func
async function fetchModels() {
    const container = document.getElementById('models-container');
    const spinner = document.getElementById('loading-spinner');

    try {
        const response = await fetch('https://huggingface.co/api/models?sort=downloads&direction=-1&limit=6');

        if(!response.ok){
            throw new Error(`HTTP error >:( status: ${response.status}`);
        }
        
        const models = await response.json();
        spinner.style.display = 'none';
        renderModels(models, container);
    } catch (error) {
        console.error('error while loading models:', error);
        spinner.innerHTML = `<p class="text-danger">Failed to load models. Please try again later.</p>`;
    }
}

// html rendering
function renderModels(models, container) {
    models.forEach(model => {
        const modelName = model.id.split('/').pop();
        const author = model.author || 'Community';
        const task = model.pipeline_tag || 'Generic Model';
        
        let downloads = model.downloads || 0;
        if (downloads > 1000) {
            downloads = (downloads / 1000).toFixed(1) + 'k';
        }

        const avatarLetter = author.charAt(0).toUpperCase();

        const article = document.createElement('article');
        article.className = 'col-12 col-md-6';
        
        article.innerHTML = `
            <div class="card h-100 shadow-sm p-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge badge-ai">${task}</span>
                    <span class="text-secondary small">⭐ ${downloads}</span>
                </div>
                <h5 class="card-title text-truncate" title="${model.id}">${modelName}</h5>
                <p class="card-text text-white-50 small text-truncate-3 mb-3">
                    ${model.id} - A state-of-the-art machine learning model retrieved directly from the Hugging Face Hub.
                </p>
                <div class="mt-auto d-flex align-items-center justify-content-between border-top border-secondary pt-3">
                    <div class="d-flex align-items-center">
                        <div class="avatar-sm me-2 bg-primary">${avatarLetter}</div>
                        <span class="small text-secondary text-truncate" style="max-width: 100px;">${author}</span>
                    </div>
                    <div class="d-flex gap-2">
                        <span class="badge bg-dark-subtle text-light border border-secondary small">API</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(article);
    });
}