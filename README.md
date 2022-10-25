# DrNg Appointment Ledger
![alt text](https://github.com/NkwetiAwa/drng_frontend/blob/main/img/home.png?raw=true)

A web application to keet track of appoinments for. The application supports __creating new__ appointments, __updating__ existing appointents, __searching__ for an appointments by name, unique code, age, or any parameters in the table, and also __sorting__ appointments by any parameters.

## Reproduce

### Clone this repo

`git clone https://github.com/NkwetiAwa/drng_frontend.git`

### Install packages

Enter the drectory you just cloned the file into and run the command to install packages
`npm install`

### Get the backend repo
Download and setup the [Backend Repository](https://github.com/NkwetiAwa/drng_backend.git)

`git clone https://github.com/NkwetiAwa/drng_backend.git`

### Point frontend to backend
Navaigate to the src/Components/URL.js 
  
Edit the return string to point to where your backend server is hosted e.g 

`return("http://backend.example.com/")`
