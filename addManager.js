const axios = require('axios');

const newManager = {
    name: 'Yeuda Rotam',
    phone: '0527174567',
    email: 'YeudaRotam@buisness.com',
    password: 'securepassworD123',
    role: 'manager' 
   
};

axios.post('http://localhost:3000/login/add-manager', newManager)
    .then(response => {
        console.log('Manager added successfully:', response.data);
    })
    .catch(error => {
        console.error('Error adding manager:', error.response ? error.response.data : error.message);
    });
