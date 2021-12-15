import firebase from '../../firebase';
import './timer-plugin/timer-plugin'
import '../notification/notification-jquery'
import { SettingsModel } from '../settings/settingsModel';
import {eventBus} from '../../eventBus';

export class TimerModel {
    //the format of data (model) is created here
    constructor({tasks}){
        this.tasks=tasks;
        this.execQue = 0;
        this.iterationsQue=1;
        this.estimation = this.tasks[0].estimation;
        this.iterations = [...new Array(+this.estimation)].map( iteration => 'not set');
        this.db = firebase.database();
        this.MAXESTIMATION = 9;
        this.category = this.tasks[0].category;
        this.fbID = this.tasks[0].fbID;
        this.completedCount = 0;
        this.failedPomodoros = 0;
    }
    //it changes changes the current pomodoro status at statusArray and returns the updated array
    iterationHandler(status){
        if(this.execQue<this.MAXESTIMATION){
            if(sessionStorage.getItem('timer')){
                if(status === 'success'){
                    this.completedCount++;
                }else{
                    this.failedPomodoros++;
                }
                this.iterations = [...new Array(+this.estimation)].map( iteration => 'not set');
                this.execQue=0;
                this.iterations[this.execQue] = status;
                this.execQue++;
                this.updatePomodoroStatus(this.iterations, this.completedCount, this.failedPomodoros);
                sessionStorage.removeItem('timer');
                if(status='success'&&this.execQue!==this.iterations.length){
                    jQuery('#root1').notificationPlugin({
                        type: 'info',
                        message: 'Your finished pomodoro!',
                        icon: 'icon-tomato-info',
                        time: 5000
                    })
                }
            }else{
                if(status === 'success'){
                    this.completedCount++;
                }else{
                    this.failedPomodoros++;
                }
                this.iterations[this.execQue] = status;
                this.execQue++;
                this.updatePomodoroStatus(this.iterations, this.completedCount, this.failedPomodoros);
                if(status='success'&&this.execQue!==this.iterations.length){
                    jQuery('#root1').notificationPlugin({
                        type: 'info',
                        message: 'Your finished pomodoro!',
                        icon: 'icon-tomato-info',
                        time: 5000
                    })
                }
            }
        }
    }
    //updates the array of pomodoro statuses at FB
    updatePomodoroStatus(statusArray, completedCount, failedPomodoros){
        let values = this.tasks[0];
        values.pomodoroStatuses=statusArray;
        values.estimation=String(values.estimation);
        values.completedCount=completedCount;
        values.failedPomodoros=failedPomodoros;
        let taskID = values.fbID;
        //adding generated id to the object that will be sent to the FB
        let updateData = (object) =>{
            this.db.ref('tasks/'+taskID).set(object);
        }
        updateData(values);
    }
    pomodoroStatusHandler(status){
        this.iterationHandler(status);т
    }
    iterationHandlerStart(){
        this.iterations = [...new Array(+this.estimation)].map( iteration => 'not set');
        this.updatePomodoroStatus(this.iterations);
    }
    startTimer(){
        let settingsModel = new SettingsModel();
        let currentCategory = this.category;
        let currentID = this.fbID;
        settingsModel.receiveData().then(newValuesObj => {
            jQuery('.timer-content').timerPlugin({
                time: newValuesObj.workTime,
                buttons: 'startPomodora',
                phase: 'text',
                content: 'Let`s do it!',
                category: currentCategory,
                cardObject: this.tasks[0],
                menu: 'arrows-left',
                fbID: currentID
            })
        })
    }
    startTask(){
        let settingsModel = new SettingsModel();
        let pomodoroBreak = this.pomodoroBreak;
        let pomodoroStatus = this.pomodoroStatusHandler;
        let outerThis = this;
        let currentCategory = this.category;
        sessionStorage.setItem('timer is clicked', true);
        settingsModel.receiveData().then(newValuesObj => {
            jQuery('.timer-content').timerPlugin({
                time: newValuesObj.workTime,
                breakShow: 'hidden',
                buttons: 'iteration',
                phase: 'iteration',
                timerRequired: true,
                category: currentCategory,
                cardObject: this.tasks[0],
                ontimeout: function(){
                    pomodoroBreak.call(outerThis);
                    pomodoroStatus.call(outerThis, 'success');
                } 
            })
        })
    }
    pomodoroBreak(){
        let settingsModel = new SettingsModel();
        const fbID = this.tasks[0].fbID;
        let currentCategory = this.category;
        settingsModel.receiveData().then(newValuesObj => {
            if(this.iterationsQue<newValuesObj.workIterations){
                if(this.execQue===this.iterations.length){
                    this.changeStatus(fbID, 'Completed');
                    this.taskCompleted();
                }else{
                    jQuery('.timer-content').timerPlugin({
                        time: newValuesObj.shortBreak,
                        buttons: 'break',
                        phase: 'iteration',
                        timerRequired: true,
                        category: currentCategory,
                        cardObject: this.tasks,
                        ontimeout: function(){
                            jQuery('.timer-content').timerPlugin({
                                buttons: 'break is over',
                                showFull: true,
                                content: 'Break is over!',
                                phase: 'text',
                                fbID: fbID,
                                category: currentCategory,
                                cardObject: this.tasks,
                            })
                        } 
                    })
                }
                this.iterationsQue++
            }else{
                if(this.execQue===this.iterations.length){
                    this.changeStatus(fbID, 'Completed');
                    this.taskCompleted();
                }else{
                    jQuery('.timer-content').timerPlugin({
                        time: newValuesObj.longBreak,
                        buttons: 'break',
                        phase: 'iteration',
                        timerRequired: true,
                        category: currentCategory,
                        cardObject: this.tasks,
                        ontimeout: function(){
                            jQuery('.timer-content').timerPlugin({
                                buttons: 'break is over',
                                showFull: true,
                                content: 'Break is over!',
                                phase: 'text',
                                fbID: fbID,
                                category: currentCategory,
                                cardObject: this.tasks,
                            })
                        } 
                    })
                }
                this.iterationsQue=0;
            }
        })
    };
    taskCompleted(){
        let currentCategory = this.category;
        let currentID = this.fbID;
        jQuery('.timer-content').timerPlugin({
            showFull: true,
            phase: 'text',
            content: 'The task is completed!',
            category: currentCategory,
            cardObject: this.tasks,
            menu: 'arrows-all',
            // fbID: currentID
        })
    }
    goToDailyList = () =>{
        const notification = document.querySelector('.ui-tooltip');
        eventBus.publish('CHANGE_LOCATION', 'task-list');
        notification.remove();
    }
    goToReports = () =>{
        const notification = document.querySelector('.ui-tooltip');
        eventBus.publish('CHANGE_LOCATION', 'reports');
        notification.remove();
    }
    downloadCard(taskID){
        let arrayTasks = [];
        //downloading the task with the currentID from the DB and adding it to the array
        const db = firebase.database();
        db.ref('tasks/').on('value', function(snapshot){
            snapshot.forEach((childSnapshot)=>{
                let childDataKey = childSnapshot.key;
                if(childDataKey===taskID){
                    arrayTasks.push({
                        ...childSnapshot.val(),
                        fbID: childSnapshot.key,
                    });
                }
            })
        });
        let tasksObj = arrayTasks[0];
        return tasksObj;
    }
    changeStatus(taskID, newStatus){
        const db = firebase.database();
        //downloading the cardObject from FB
        let tasksObj = this.downloadCard(taskID);
        tasksObj.status=newStatus;
        if(newStatus==='Completed'){
            tasksObj.completeDate= Date.now();
        }
        try{
            let updateData = (object) =>{
                db.ref('tasks/'+taskID).set(object);
            }
            updateData(tasksObj);
            if(this.execQue===this.iterations.length){
                jQuery('#root1').notificationPlugin({
                    type: 'warning',
                    message: 'Long break started, please have a rest!".',
                    icon: 'icon-tomato-warning',
                    time: 5000
                })
            }else if(newStatus==='Completed'){
                jQuery('#root1').notificationPlugin({
                    type: 'success',
                    message: 'Your finished pomodoro!',
                    icon: 'icon-tomato-success',
                    time: 5000
                })
            }
        }catch(e){
            jQuery('#root1').notificationPlugin({
                type: 'error',
                message: 'Unable to mark pomodoro/task as completed. Try again later',
                icon: 'icon-tomato-error',
                time: 5000
            })
        }
    }

    addEstimation = (taskID) =>{
        let arrayTasks = [];
        const MAX_ESTIMATION = 9;
        const PLUS_ELEMENT = document.querySelector('.timer-content__plus');
        //downloading the task with the currentID from the DB and adding it to the array
        const db = firebase.database();
        db.ref('tasks/').on('value', function(snapshot){
            snapshot.forEach((childSnapshot)=>{
                let childDataKey = childSnapshot.key;
                if(childDataKey===taskID){
                    arrayTasks.push({
                        ...childSnapshot.val(),
                        fbID: childSnapshot.key,
                    });
                }
            })
        });
        let tasksObj = arrayTasks[0];
        if(tasksObj.estimation>MAX_ESTIMATION){
            PLUS_ELEMENT.hidden='true';
        }else{
            tasksObj.estimation=++tasksObj.estimation;
            tasksObj.pomodoroStatuses.push('not set');
        }
        let updateData = (object) =>{
            db.ref('tasks/'+taskID).set(object);
        }
        updateData(tasksObj);
    }
}