document.addEventListener('DOMContentLoaded', () => {
    const modelData = localStorage.getItem('selectedModel');
    
    if (!modelData) {
        console.error("Данные модели не найдены");
        return;
    }

    const model = JSON.parse(modelData);
    const modelName = model.id.split('/').pop();
    const author = model.author || 'Community';

    document.getElementById('model-title').textContent = modelName;
    document.getElementById('breadcrumb-model').textContent = modelName;
    document.getElementById('model-author').textContent = author;
    document.getElementById('author-avatar').textContent = author.charAt(0).toUpperCase();
    document.getElementById('model-task').textContent = model.pipeline_tag || 'General';
    
    let downloads = model.downloads || 0;
    if (downloads > 1000) downloads = (downloads / 1000).toFixed(1) + 'k';
    document.getElementById('model-downloads').textContent = `⭐ ${downloads} downloads`;

    document.getElementById('model-description').textContent = 
        `${model.id} - это современная модель машинного обучения, загруженная из Hugging Face Hub. Теги: ${model.tags?.slice(0, 5).join(', ') || 'AI'}.`;
});