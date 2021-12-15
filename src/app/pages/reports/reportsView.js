import { eventBus } from "../../eventBus";
import tmp from "./reports.handlebars"

const HIGHTCHARTS = require('highcharts');
require('highcharts/modules/exporting')(HIGHTCHARTS)

export class ReportsView{
    constructor(root, model){
        this.root = root;
        this.model = model;
    }
    render(){
        this.root.innerHTML = tmp(this.model);
        this.paintReportsIcon();
        this.attachListeners();
    }
    paintReportsIcon(){
        const targetElement = document.querySelector('.icon-statistics');
        targetElement.style.color='white';
    }
    goToDailyList = () =>{
        const notification = document.querySelector('.ui-tooltip');
        eventBus.publish('CHANGE_LOCATION', 'task-list');
        notification.remove();
    }
    attachListeners(){
        const REPORTS_WRAPPER = document.querySelector('.reports-wrapper');
        const settingReports = {
            category: 'tasks',
            period: 'day'
        }
        this.model.genereteReport(settingReports);
        if(REPORTS_WRAPPER){
            REPORTS_WRAPPER.addEventListener('click', (event) => {
                if(event.target.className.includes('Day')){
                    eventBus.publish('REPORTS_DAY_NAVIGATE', 'Day');
                    settingReports['period'] = 'day';
                    this.model.genereteReport(settingReports);
                }
                else if(event.target.className.includes('Week')){
                    eventBus.publish('REPORTS_WEEK_NAVIGATE', 'Week')
                    settingReports['period'] = 'week';
                    this.model.genereteReport(settingReports);
                }
                else if(event.target.className.includes('Month')){
                    eventBus.publish('REPORTS_MONTH_NAVIGATE', 'Month');
                    settingReports['period'] = 'month';
                    this.model.genereteReport(settingReports);
                }
                else if(event.target.className.includes('Pomodoros')){
                    eventBus.publish('REPORTS_POMODOROS_NAVIGATE', event.target);
                    settingReports['category'] = 'pomodoros';
                    this.model.genereteReport(settingReports);
                }
                else if(event.target.className.includes('Tasks')){
                    eventBus.publish('REPORTS_TASKS_NAVIGATE', event.target);
                    settingReports['category'] = 'tasks';
                    this.model.genereteReport(settingReports);
                }
                else if(event.target.className.includes('icon-arrow-left')){
                    eventBus.publish('ARROW_TO_TASKS_WAS_CLICKED');
                }
            })
        }
    }
    hoverLocation(){
        const urlLocation = window.location.href;
        const hoverDay = document.querySelector('.toggle-list__link--Day');
        const hoverWeek = document.querySelector('.toggle-list__link--Week');
        const hoverMonth = document.querySelector('.toggle-list__link--Month');
        const hoverTasks = document.querySelector('.toggle-list__link--Tasks');
        const hoverPomodoros = document.querySelector('.toggle-list__link--Pomodoros');
        if(urlLocation.includes('/day/tasks')){
            hoverDay.classList.add('active');
            hoverWeek.classList.remove('active');
            hoverMonth.classList.remove('active');
            hoverTasks.classList.add('active');
            hoverPomodoros.classList.remove('active');
        }
        else if (urlLocation.includes('/week/tasks')){
            hoverDay.classList.remove('active');
            hoverWeek.classList.add('active');
            hoverMonth.classList.remove('active');
            hoverTasks.classList.add('active');
            hoverPomodoros.classList.remove('active');
        }
        else if(urlLocation.includes('/month/tasks')){
            hoverDay.classList.remove('active');
            hoverWeek.classList.remove('active');
            hoverMonth.classList.add('active');
            hoverTasks.classList.add('active');
            hoverPomodoros.classList.remove('active');
        }
        else if(urlLocation.includes('/day/pomodoros')){
            hoverDay.classList.add('active');
            hoverWeek.classList.remove('active');
            hoverMonth.classList.remove('active');
            hoverTasks.classList.remove('active');
            hoverPomodoros.classList.add('active');
        }
        else if(urlLocation.includes('/week/pomodoros')){
            hoverDay.classList.remove('active');
            hoverWeek.classList.add('active');
            hoverMonth.classList.remove('active');
            hoverTasks.classList.remove('active');
            hoverPomodoros.classList.add('active');
        }
        else if(urlLocation.includes('/month/pomodoros')){
            hoverDay.classList.remove('active');
            hoverWeek.classList.remove('active');
            hoverMonth.classList.add('active');
            hoverTasks.classList.remove('active');
            hoverPomodoros.classList.add('active');
        }
    }
    addActive(targetElement) {
        const reportButtonMenu = document.querySelectorAll('.toggle-list__link--bottom');
        reportButtonMenu.forEach(element =>
        element.classList.remove('active'));
        targetElement.classList.add('active');
    }
}