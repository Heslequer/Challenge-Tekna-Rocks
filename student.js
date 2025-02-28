class Student{
    constructor(registration, name, absences, p1, p2, p3) {
        this._dados = { registration, name, absences, p1, p2, p3, status: "", fga: 0};

        Object.keys(this._dados).forEach(props => {
            Object.defineProperty(this, props, {
                get: () => this._dados[props],
                set: (value) => this._dados[props] = value
            });
        });
    }

    calcAvg() {
        const grades = [parseInt(this.p1), parseInt(this.p2),parseInt(this.p3)]
        const sumGrades = grades.reduce((acc,act)=> acc + act);
        const avg = (sumGrades)/3
        return(Math.round(avg))
    }

    getSituation(){
        const avg = this.calcAvg();

        if(this.absences >= 0.25 * 60){
            this.status = "Reprovado por Faltas";
        }else if(avg <50){  
            
            this.status = "Reprovado por Notas";
        }else if(avg<70){
            this.status = "Exame Final";
            this.fga = this.calcFinalGradeApproval(avg)
        }else if(avg>=70){
            this.status = "Aprovado";
        }

        return [this.status, this.fga]

    }   

    calcFinalGradeApproval(avg){
        return (100 - avg)
    }

}
module.exports = Student;