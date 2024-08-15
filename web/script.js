document.addEventListener('DOMContentLoaded', () => {
    const strikeThrough = document.querySelector('.strike-through');
    const rotateText = document.querySelector('.rotate-text');

    // Wait for the typewriter effect to finish (3 seconds) before starting the new animation
    setTimeout(() => {
        strikeThrough.classList.add('active');

        setTimeout(() => {
            rotateText.classList.add('active');
            setTimeout(() => {
                rotateText.textContent = 'Start';
            }, 250);
        }, 1000);

        setTimeout(() => {
            strikeThrough.classList.add('fade-out');
        }, 1250);
    }, 4000);
});