const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const spreadsheetId = '1IRt--KrLCLbcpMaUUf3TC3_0x-wJEHg7yg_i8ieEDPk';

async function accessSpreadsheet() {

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });


    const range = 'engenharia_de_software!A4:H27';

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range, 
    });


    const data = response.data.values;

    return data;

}

async function updateSpreadsheet(processedData) {
   

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });
    
        for(var x = 0; x <=1; x++)
        {
            var acc = 0
            for(var y = 4; y <=27; y++)
            {
                var variableRange = ''
                if(x === 1)
                {
                        variableRange = 'H' + y
                }else
                    {
                        variableRange =  'G' + y
                    }
                    const dataInput = processedData[acc][x]
                    const response = await sheets.spreadsheets.values.update({
                        spreadsheetId,
                        range: variableRange,
                        valueInputOption: "RAW",
                        resource: { values: [[dataInput]]}
                    });

                    console.log('Cell ' + variableRange + ' updated'  )
                acc++;
            }
        }

}

module.exports = {accessSpreadsheet,updateSpreadsheet}