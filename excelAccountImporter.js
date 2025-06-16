import { LightningElement } from 'lwc';
import xlsxLib from '@salesforce/resourceUrl/xlsx';
import {loadScript} from 'lightning/platformResourceLoader';
import insertAccounts from '@salesforce/apex/ExcelAccountController.insertAccounts';

export default class ExcelAccountImporter extends LightningElement {
    xlsxInitialized = false;

connectedCallback() {
    loadScript(this, xlsxLib)
        .then(() => {
            if (window.XLSX && typeof window.XLSX.read === 'function') {
                console.log('✅ SheetJS loaded');
                this.xlsxInitialized = true;
            } else {
                console.error('❌ XLSX is not attached to window');
            }
        })
        .catch((error) => {
            console.error('❌ Error loading SheetJS:', error);
        });
}


    handleFileChange(event) {
        if (!this.xlsxInitialized) {
            alert('SheetJS not loaded yet.');
            return;
        }

     //Getting the File: When user selects a file, this grabs the first (and usually only) file they chose.
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            //Unit8Array converts the raw file data into a format that excel library can understand
            const data = new Uint8Array(e.target.result);
            console.log(data)
            //window.XLSX.read(data,{type:'array'}) is like telling the translator to read the file
            const workbook = window.XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = window.XLSX.utils.sheet_to_json(sheet);
            
            // Gets the first sheet name from the Excel file
            // Gets the actual sheet data
            // Converts the sheet into JSON (JavaScript Object Notation) - a format JavaScript loves



            console.log('Parsed Excel JSON:', JSON.stringify(json, null, 2));


         
          try{
            insertAccounts({accountList:json})
            .then(result => {
                console.log(result);
                alert(result);
            })
         .catch(error => {
                console.log(error)
                alert(error);
            })
          }catch(error){
            console.log(error)
          }



        };

        //Converts file to binary data
          reader.readAsArrayBuffer(file);


          }
}