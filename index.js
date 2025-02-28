const Student = require('./student');
const {accessSpreadsheet, updateSpreadsheet} = require('./acessAndUpdtadeSpreadsheet');

accessSpreadsheet().then((data)=>{

    console.log('Spreadsheet accessed successfully')

    const processedData = processData(data);

    updateSpreadsheet(processedData).then(()=>{

        console.log('ALL STUDENTS STATUS UPDATED')

    }).catch((error)=>{
        console.error('failed to update spreadsheet', error)
    });

}).catch((error)=>{
    console.error('failed to access spreadsheet', error)
});


function processData(data){
    const students = data.map(studentData =>
    new Student(...studentData));
    var valuesToUpdate = [];
    for(index in students){
        students[index].getSituation();
        valuesToUpdate[index] = [students[index].status, students[index].fga];
    }
    return valuesToUpdate;
}
