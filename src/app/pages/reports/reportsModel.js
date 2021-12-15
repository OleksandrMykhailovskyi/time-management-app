import firebase from '../../firebase';
const HIGHTCHARTS = require('highcharts');
require('highcharts/modules/exporting')(HIGHTCHARTS)

export class ReportsModel {
    //the format of data (model) is created here
    constructor({days, links}){
        this.days = days;
        this.links = links;
        this.xAxis = ['Urgent', 'High', 'Middle', 'Low', 'Failed'];
        this.currentDayscategories = ['Urgent', 'High', 'Middle', 'Low', 'Failed'];
        this.currentWeekcategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.currentMonthcategories = Array.from({length: 30}, (v, k) => k+1); 
    }
    getTasks = async() =>{
        //initializing the db creating
        const db = firebase.database();
        const firebaseRef = db.ref('tasks');
        let data
        await firebaseRef.once("value", function(snapshot){
            data = snapshot.val();        
        });
        //returning the object with data from FB
        return data;
    }
    genereteReport(setting){
        //the dates in different formats required for the calculation
        const today = new Date();
        const todayDate = today.getDate();
        const todayDay = today.getDay();
        let requiredTodayDay
        if(todayDay===0){
            requiredTodayDay=6;
        }else{
            requiredTodayDay=todayDay-1;
        }
        let todayMonth = today.getMonth()+1;
        const todayYear = today.getFullYear();
        const todayDateString = `${todayDate}/${todayMonth}/${todayYear}`;
        const firstDayOfWeek = new Date(today.setDate(todayDate - requiredTodayDay));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        let objectPriorities = {
            'urgent': [],
            'high': [],
            'middle': [],
            'low': [],
            'failed': [],
        }
        //filling in the arrays with 0
        const buildEmpty = (segment) => {
            for (let key in objectPriorities) {
                objectPriorities[key] = new Array(segment).fill(0);
            }
        }
        let stackDayMode
        //settings the exact number of columns that will be rendered
        switch (setting.period) {
            case 'day':
                this.xAxis = this.currentDayscategories;
                buildEmpty(5);
                stackDayMode= true;
                break;
            case 'week':
                this.xAxis = this.currentWeekcategories;
                buildEmpty(7);
                stackDayMode = false;
                break;
            case 'month':
                this.xAxis = this.currentMonthcategories;
                buildEmpty(30);
                stackDayMode = false;
                break;
        }
        //receiving the object with the tasks from FB
        this.getTasks().then(valuesObj => {
            if(setting.period==='day'){
                for(let card in valuesObj){
                    if(valuesObj[card].status==='Completed'){
                        const dateFromFB = new Date(valuesObj[card].completeDate);
                        const dayFromFB = dateFromFB.getDate();
                        const monthFromFB = dateFromFB.getMonth()+1;
                        const yearFromFB = dateFromFB.getFullYear();
                        const finalDateFromFB = `${dayFromFB}/${monthFromFB}/${yearFromFB}`;
                        let fillInDayTasksArray = () => {
                            if(valuesObj[card].completedCount>=valuesObj[card].failedPomodoros){
                                if(valuesObj[card].priority==='urgent'){
                                    objectPriorities.urgent[0]+=1;
                                }
                                else if(valuesObj[card].priority==='high'){
                                    objectPriorities.high[1]+=1;
                                }
                                else if(valuesObj[card].priority==='middle'){
                                    objectPriorities.middle[2]+=1;
                                }
                                else if(valuesObj[card].priority==='low'){
                                    objectPriorities.low[3]+=1;
                                }
                            }
                            else{
                                objectPriorities.failed[4]+=1;
                            }
                        }
                        let fillInDayPomodorosArray = () =>{
                            if(valuesObj[card].priority==='urgent'){
                                objectPriorities.urgent[0]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='high'){
                                objectPriorities.high[1]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='middle'){
                                objectPriorities.middle[2]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='low'){
                                objectPriorities.low[3]+=valuesObj[card].completedCount;
                            }
                            objectPriorities.failed[4]+=valuesObj[card].failedPomodoros;
                        }
                        if(todayDateString===finalDateFromFB){
                            if(setting.category==='tasks'){
                                fillInDayTasksArray();
                            }else{
                                fillInDayPomodorosArray();
                            }
                        }
                    }
                }
                objectPriorities.stackDayMode = stackDayMode;
                this.renderReport(objectPriorities, this.currentDayscategories);
            }
            else if(setting.period==='week'){
                for(let card in valuesObj){
                    if(valuesObj[card].status==='Completed'){
                        let fillInWeekTasksArray = (index) => {
                            if(valuesObj[card].completedCount>=valuesObj[card].failedPomodoros){
                                if(valuesObj[card].priority==='urgent'){
                                    objectPriorities.urgent[index]+=1;
                                }
                                else if(valuesObj[card].priority==='high'){
                                    objectPriorities.high[index]+=1;
                                }
                                else if(valuesObj[card].priority==='middle'){
                                    objectPriorities.middle[index]+=1;
                                }
                                else if(valuesObj[card].priority==='low'){
                                    objectPriorities.low[index]+=1;
                                }
                            }
                            else{
                                objectPriorities.failed[index]+=1;
                            }
                        }
                        let fillInWeekPomodorosArray = (index) =>{
                            if(valuesObj[card].priority==='urgent'){
                                objectPriorities.urgent[index]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='high'){
                                objectPriorities.high[index]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='middle'){
                                objectPriorities.middle[index]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='low'){
                                objectPriorities.low[index]+=valuesObj[card].completedCount;
                            }
                            objectPriorities.failed[index]+=valuesObj[card].failedPomodoros;
                        }
                        const dateFromFB = new Date(valuesObj[card].completeDate);
                        let dayFromFB
                        if(dateFromFB.getDay()===0){
                            dayFromFB = 6;
                        }else{
                            dayFromFB = dateFromFB.getDay()-1;
                        }
                        if(dateFromFB>=firstDayOfWeek&&dateFromFB<lastDayOfWeek){
                            if(setting.category==='tasks'){
                                fillInWeekTasksArray(dayFromFB);
                            }else{
                                fillInWeekPomodorosArray(dayFromFB);
                            }
                        }
                    }
                }
                objectPriorities.stackDayMode = stackDayMode;
                this.renderReport(objectPriorities, this.currentWeekcategories);
            }else if(setting.period==='month'){
                for(let card in valuesObj){
                    if(valuesObj[card].status==='Completed'){
                        let fillInMonthTasksArray = (index) => {
                            if(valuesObj[card].completedCount>=valuesObj[card].failedPomodoros){
                                if(valuesObj[card].priority==='urgent'){
                                    objectPriorities.urgent[index]+=1;
                                }
                                else if(valuesObj[card].priority==='high'){
                                    objectPriorities.high[index]+=1;
                                }
                                else if(valuesObj[card].priority==='middle'){
                                    objectPriorities.middle[index]+=1;
                                }
                                else if(valuesObj[card].priority==='low'){
                                    objectPriorities.low[index]+=1;
                                }
                            }
                            else{
                                objectPriorities.failed[index]+=1;
                            }
                        }
                        let fillInMonthPomodorosArray = (index) =>{
                            if(valuesObj[card].priority==='urgent'){
                                objectPriorities.urgent[index]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='high'){
                                objectPriorities.high[index]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='middle'){
                                objectPriorities.middle[index]+=valuesObj[card].completedCount;
                            }
                            else if(valuesObj[card].priority==='low'){
                                objectPriorities.low[index]+=valuesObj[card].completedCount;
                            }
                            objectPriorities.failed[index]+=valuesObj[card].failedPomodoros;
                        }
                        const dateFromFB = new Date(valuesObj[card].completeDate);
                        let monthFromFB = dateFromFB.getMonth()+1;
                        let dayFromFB = dateFromFB.getDate();
                        if(todayMonth=monthFromFB){
                            if(setting.category==='tasks'){
                                fillInMonthTasksArray(dayFromFB);
                            }else{
                                fillInMonthPomodorosArray(dayFromFB);
                            }
                        }
                    }
                }
                objectPriorities.stackDayMode = stackDayMode;
                this.renderReport(objectPriorities, this.currentMonthcategories);
            }
        });
    }
    renderReport(objectPriorities, categoriesColumns){
        const firstStackGroup = 'oneColumn';
        const secondStackGroup = objectPriorities.stackDayMode ? 'oneColumn' : 'twoColumns'
        HIGHTCHARTS.chart('highcharts-container', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categoriesColumns
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Urgent',
                data: objectPriorities.urgent,
                stack: firstStackGroup
            }, {
                name: 'High',
                data: objectPriorities.high,
                stack: firstStackGroup
            },  {
                name: 'Middle',
                data: objectPriorities.middle,
                stack: firstStackGroup
            }, {
                name: 'Low',
                data: objectPriorities.low,
                stack: firstStackGroup
            }, {
                name: 'Failed',
                data: objectPriorities.failed,
                stack: secondStackGroup
            }, ],
        });
    }
}