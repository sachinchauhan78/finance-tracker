const descriptionInput = document.getElementById('descriptionInput');
const amountInput = document.getElementById('amountInput');
const addButton = document.getElementById('addButton');
const entryList = document.getElementById('entryList');

// Load existing entries from local storage
function loadEntries() {
    const storedEntries = JSON.parse(localStorage.getItem('financeEntries')) || [];
    
    storedEntries.forEach(entry => {
        addEntryToDOM(entry.description, entry.amount);
    });
}

// Add entry to the DOM
function addEntryToDOM(description, amount) {
    const li = document.createElement('li');
    
    li.innerHTML = `${description}: ₹${amount} <button class="delete-button">Delete</button>`;
    
    // Add delete functionality
    li.querySelector('.delete-button').addEventListener('click', () => {
        deleteEntry(description);
        li.remove();
    });

    entryList.appendChild(li);
}

// Save entry to local storage
function saveEntry(description, amount) {
    const storedEntries = JSON.parse(localStorage.getItem('financeEntries')) || [];
    
    storedEntries.push({ description, amount });
    
    localStorage.setItem('financeEntries', JSON.stringify(storedEntries));
}

// Delete entry from local storage
function deleteEntry(description) {
    let storedEntries = JSON.parse(localStorage.getItem('financeEntries')) || [];
    
    storedEntries = storedEntries.filter(entry => entry.description !== description);
    
    localStorage.setItem('financeEntries', JSON.stringify(storedEntries));
}

// Add entry on button click
addButton.addEventListener('click', () => {
    const descriptionValue = descriptionInput.value.trim();
    const amountValue = parseFloat(amountInput.value.trim());
    
    if (descriptionValue && !isNaN(amountValue)) {
        addEntryToDOM(descriptionValue, amountValue);
        saveEntry(descriptionValue, amountValue);
        
        // Clear input fields
        descriptionInput.value = '';
        amountInput.value = '';
        
        // Optionally, focus on the description input again
        descriptionInput.focus();
        
        return; // Exit the function after successfully adding an entry
    }

   alert("Please enter valid description and amount.");
});

// Initialize the application
loadEntries();