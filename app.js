class Contact {
    constructor(name, phone, company) {
      this.name = name;
      this.phone = phone;
      this.company = company;
    }
  }
  
  class UI {
    addContactToList(contact) {
      const list = document.getElementById('contact-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.company}</td>
        <td class="delB"><a href="#" class="fa fa-remove delete btn btn-sm btn-danger"><a></td>
      `;
    
      list.appendChild(row);
    }
  
    showAlert(message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('#content');
      // Get form
      const form = document.querySelector('#contact-form');
      // Insert alert
      container.insertBefore(div, form);
  
      // Timeout after 3 sec
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteContact(target) {
      if(target.parentElement.className ==='delB' && confirm("Are You sure You want to delete this contact?")) {        
        target.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('company').value = '';
    }
  }
  
  // Local Storage Class
  class Store {
    static getContacts() {
      let contacts;
      if(localStorage.getItem('contacts') === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
      }
  
      return contacts;
    }
  
    static displayContacts() {
      const contacts = Store.getContacts();
  
      contacts.forEach(function(contact){
        const ui  = new UI;
  
        // Add Contact to UI
        ui.addContactToList(contact);
      });
    }
  
    static addContact(contact) {
      const contacts = Store.getContacts();
  
      contacts.push(contact);
  
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    static removeContact(phone) {
      const contacts = Store.getContacts();
      
      contacts.forEach(function(contact, index){
       if(contact.phone === phone) {
           
        contacts.splice(index, 1);
       }
      });
  
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayContacts);
  
  // Event Listener for add contact
  document.getElementById('contact-form').addEventListener('submit', function(e){
    // Get form values
    const name = document.getElementById('name').value,
          phone = document.getElementById('phone').value,
          company = document.getElementById('company').value
  
    // Instantiate contact
    const contact = new Contact(name, phone, company);
  
    // Instantiate UI
    const ui = new UI();
  
    console.log(ui);
  
    // Validate
    if(name === '' || phone === '' || company === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'alert-danger');
    } else {
      // Add contact to list
      ui.addContactToList(contact);
  
      // Add to LS
      Store.addContact(contact);
  
      // Show success
      ui.showAlert('Contact Added!', 'alert-success');
    
      // Clear fields
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  // Event Listener for delete
  document.getElementById('contact-list').addEventListener('click', function(e){
    
      // Instantiate UI
      const ui = new UI();
    
      // Delete contact
      ui.deleteContact(e.target);
    
      // Remove from LS
     const removeStoreFromLS = Store.removeContact(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    
      if(removeStoreFromLS){
      ui.showAlert('Contact Removed!', 'alert-warning');
      }
      e.preventDefault();
        
  });