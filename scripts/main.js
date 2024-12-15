document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена:', document.title);

    const links = document.querySelectorAll('.header__link');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('header__link--active');
        }
    });
});
