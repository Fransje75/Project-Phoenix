
(function () {
  const root = document.documentElement;
  const themeButton = document.getElementById('themeButton');
  const testButton = document.getElementById('testButton');
  const toast = document.getElementById('toast');

  const savedTheme = localStorage.getItem('ppcc-theme');
  if (savedTheme === 'light') {
    root.classList.add('light');
    themeButton.textContent = '🌙';
  }

  themeButton.addEventListener('click', function () {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('ppcc-theme', isLight ? 'light' : 'dark');
    themeButton.textContent = isLight ? '🌙' : '☀️';
  });

  testButton.addEventListener('click', function () {
    toast.textContent = 'Foundation werkt: HTML, CSS en JavaScript zijn actief.';
    toast.style.display = 'block';
    window.setTimeout(function () {
      toast.style.display = 'none';
    }, 2500);
  });
})();
