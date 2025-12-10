// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Download button functionality
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = 'downloads/Bulk-Rename-Modern-v1.0.0.zip';
        link.download = 'Bulk-Rename-Modern-v1.0.0.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        setTimeout(() => {
            console.log('Download started for Bulk Rename Modern v1.0.0');
        }, 100);
    });
}

// Add scroll animation for features
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Observe steps
document.querySelectorAll('.step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(step);
});