const form = document.getElementById('proposalForm');
const formSection = document.getElementById('formSection');
const proposalSection = document.getElementById('proposalSection');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const yourName = document.getElementById('yourName').value;
    const partnerName = document.getElementById('partnerName').value;
    const interests = document.getElementById('interests').value;
    const memory = document.getElementById('memory').value;

    // Generate proposal content
    document.getElementById('proposalTitle').textContent = `Dear ${partnerName},`;
    
    document.getElementById('proposalIntro').textContent = 
        `From the moment we met, my life has been filled with joy and purpose. You've shown me what true love means, and every day with you is a gift I never want to take for granted.`;
    
    document.getElementById('proposalMemory').textContent = 
        `I'll never forget ${memory}. That moment showed me how lucky I am to have you in my life.`;
    
    document.getElementById('proposalInterests').textContent = 
        `Your passion for ${interests} inspires me every single day. Watching you pursue what you love reminds me why I fell for you in the first place.`;
    
    document.getElementById('proposalQuestion').textContent = 
        `${partnerName}, I want to spend the rest of my life making you smile, supporting your dreams, and building beautiful memories together.`;

    // Show proposal, hide form
    formSection.classList.add('hidden');
    proposalSection.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
});

function goBack() {
    formSection.classList.remove('hidden');
    proposalSection.classList.add('hidden');
    window.scrollTo(0, 0);
}