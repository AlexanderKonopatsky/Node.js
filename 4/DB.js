const util = require("util");
const events = require("events");

dbData = [
    { id: 0, name : 'Alex', bday : '18.01.2005' },
    { id: 1, name : 'Vlad', bday : '23.02.1995' },
    { id: 2, name : 'Max', bday : '08.03.2000' },
    { id: 3, name : 'Ruslan', bday : '09.06.1998' }
];

    function DB() {
        //GET request
        this.getAllRows = () => {
            return dbData;
        };
        //POST request
        this.addRow = (row) => {
            dbData.push(row);
        };
        //PUT request
        this.editRow = (id, row) => {
            let oldValue = dbData.find(element => element.id == id);
            let index = dbData.indexOf(oldValue)
            
            if (index !== -1) {
                dbData[index] = row;
            }
        };
        //DELETE request
        this.deleteRow = (id) => {
            let row;
            for(let i = 0; i < dbData.length; i++) { 
                if (dbData[i].id == id) {
                    row = dbData[i];
                    dbData.splice(i, 1);
                }
            }
            return row;
        };

        this.lastIndex = () => {
            return dbData.length - 1;
        }
    }


util.inherits(DB, events.EventEmitter);
module.exports = DB;