let formData = {};
let currentTemplate = 1;

const form = document.getElementById('proposalForm');
const formSection = document.getElementById('formSection');
const templateSection = document.getElementById('templateSection');
const proposalSection = document.getElementById('proposalSection');

// Check if URL has proposal data on page load
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const proposalData = urlParams.get('proposal');
    
    if (proposalData) {
        try {
            const decoded = JSON.parse(atob(proposalData));
            formData = decoded.formData;
            currentTemplate = decoded.template;
            
            // Show proposal directly
            formSection.classList.add('hidden');
            proposalSection.classList.remove('hidden');
            
            document.getElementById('template1').classList.add('hidden');
            document.getElementById('template2').classList.add('hidden');
            document.getElementById('template3').classList.add('hidden');
            document.getElementById(`template${currentTemplate}`).classList.remove('hidden');
            
            populateTemplate(currentTemplate);
        } catch (e) {
            console.error('Invalid proposal link');
        }
    }
});

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Store form data
    formData = {
        yourName: document.getElementById('yourName').value,
        partnerName: document.getElementById('partnerName').value,
        interests: document.getElementById('interests').value,
        memory: document.getElementById('memory').value
    };

    // Show template selection
    formSection.classList.add('hidden');
    templateSection.classList.remove('hidden');
    window.scrollTo(0, 0);
});

// Show specific proposal template
function showProposal(templateNum) {
    currentTemplate = templateNum;
    
    // Hide template selection
    templateSection.classList.add('hidden');
    proposalSection.classList.remove('hidden');
    
    // Hide all templates
    document.getElementById('template1').classList.add('hidden');
    document.getElementById('template2').classList.add('hidden');
    document.getElementById('template3').classList.add('hidden');
    
    // Show selected template
    document.getElementById(`template${templateNum}`).classList.remove('hidden');
    
    // Populate with data
    populateTemplate(templateNum);
    
    window.scrollTo(0, 0);
}

// Populate template with user data
function populateTemplate(num) {
    const { yourName, partnerName, interests, memory } = formData;
    
    // Set title
    document.getElementById(`title${num}`).textContent = `Dear ${partnerName},`;
    
    // Different content for each template
    if (num === 1) {
        // Romantic
        document.getElementById(`intro${num}`).textContent = 
            `From the moment we met, my life has been filled with joy and purpose. You've shown me what true love means, and every day with you is a gift I never want to take for granted.`;
        
        document.getElementById(`memory${num}`).textContent = 
            `I'll never forget ${memory}. That moment showed me how lucky I am to have you in my life.`;
        
        document.getElementById(`interests${num}`).textContent = 
            `Your passion for ${interests} inspires me every single day. Watching you pursue what you love reminds me why I fell for you in the first place.`;
        
        document.getElementById(`question${num}`).textContent = 
            `${partnerName}, I want to spend the rest of my life making you smile, supporting your dreams, and building beautiful memories together.`;
    }
    else if (num === 2) {
        // Playful
        document.getElementById(`intro${num}`).textContent = 
            `Hey ${partnerName}! So... I've been thinking (dangerous, I know 😄). You make every day feel like an adventure, and I can't imagine my life without your laughter and energy.`;
        
        document.getElementById(`memory${num}`).textContent = 
            `Remember ${memory}? That's when I knew you were the one I wanted to be silly with forever!`;
        
        document.getElementById(`interests${num}`).textContent = 
            `The way you light up when talking about ${interests} is absolutely adorable. You make everything more fun!`;
        
        document.getElementById(`question${num}`).textContent = 
            `So here's my question: Want to be my partner in crime, my best friend, and my forever person?`;
    }
    else if (num === 3) {
        // Adventurous
        document.getElementById(`intro${num}`).textContent = 
            `${partnerName}, life with you has been the greatest adventure. Every moment feels like we're discovering something new together, and I never want this journey to end.`;
        
        document.getElementById(`memory${num}`).textContent = 
            `${memory} - that adventure showed me that with you by my side, I'm ready for anything.`;
        
        document.getElementById(`interests${num}`).textContent = 
            `Your love for ${interests} shows your adventurous spirit, and it's one of the million things I love about you.`;
        
        document.getElementById(`question${num}`).textContent = 
            `Let's make it official and embark on our biggest adventure yet. Together, forever.`;
    }
}

// Go back to template selection
function backToTemplates() {
    proposalSection.classList.add('hidden');
    templateSection.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Generate shareable link
function generateLink() {
    const proposalData = {
        formData: formData,
        template: currentTemplate
    };
    
    // Encode data to base64
    const encoded = btoa(JSON.stringify(proposalData));
    
    // Create shareable URL
    const baseUrl = window.location.origin + window.location.pathname;
    const shareableLink = `${baseUrl}?proposal=${encoded}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
        alert('✅ Link copied to clipboard!\n\nShare this link with your partner!');
    }).catch(() => {
        // Fallback if clipboard doesn't work
        prompt('Copy this link to share:', shareableLink);
    });
}

// Download proposal (opens print dialog)
function downloadProposal() {
    alert('💡 Tip: Right-click anywhere on the proposal and select "Save as Image" or use your browser\'s print function to save as PDF!');
    window.print();
}