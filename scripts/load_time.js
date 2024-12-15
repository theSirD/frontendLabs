(function () {
    window.addEventListener('load', () => {
        const [navigationEntry] = performance.getEntriesByType('navigation');
        
        if (navigationEntry) {
            const loadTime = navigationEntry.domContentLoadedEventEnd.toFixed(2);
            
            const footer = document.querySelector('.footer');
            if (footer) {
                const loadInfo = document.createElement('p');
                loadInfo.classList.add('footer__load-info');
                loadInfo.textContent = `Страница загружена за ${loadTime} мс.`;
                footer.appendChild(loadInfo);
            }
            
            console.log(`Страница загружена за ${loadTime} мс.`);
        } else {
            console.warn('Navigation performance data недоступна.');
        }
    });
})();
