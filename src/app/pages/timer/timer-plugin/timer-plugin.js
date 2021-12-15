import timerHbs from './timer-plugin.handlebars';
import timerButtonsHbs from './timer-plugin__buttons.handlebars';
import timerPomodorosHbs from './timer-plugin__pomodoros.handlebars';

(function ($) {
    $.fn.timerPlugin = function (options) {
        const args= {
            breakShow: options.breakShow,
            buttons: options.buttons,
            phase: options.phase,
            showFull: options.showFull,
            content: options.content,
            onTimeout: options.ontimeout,
            timerRequired: options.timerRequired,
            fbID: options.fbID,
            category: options.category,
            cardObject: options.cardObject,
            menu: options.menu,
        };
        let startOffset = 0;
        let i = 1;
        let initialOffset = 597;
        let time = options.time;
        if(options.showFull===true){
            $(timerPomodorosHbs(args)).replaceAll('.timer-content__pomodoros--wrapper');
            $(timerHbs(args)).replaceAll('.timer-circle');
            $(timerButtonsHbs(args)).replaceAll('.timer-buttons');
            $('.circle_animation').css('stroke-dashoffset', startOffset);
            $('.circle_animation').css('transition', 'none');
        }
        else if(options.timerRequired===true){
            $('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));
            let interval = 0
            interval = setInterval(function() {
                $('.time__minutes').text(i);
                if (i == time) {
                    clearInterval(interval);
                    options.ontimeout();
                    return;
                }
                $('.button--fail-pomodoro').click(function(){
                    clearInterval(interval);
                    return;
                })
                $('.button--finish-pomodoro').click(function(){
                    clearInterval(interval);
                    return;
                })
                $('.button--start-pomodoro').click(function(){
                    clearInterval(interval);
                    return;
                })
                $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
                i++;  
            }, 1000);
            $(timerPomodorosHbs(args)).replaceAll('.timer-content__pomodoros--wrapper');
            $(timerHbs(args)).replaceAll('.timer-circle');
            $(timerButtonsHbs(args)).replaceAll('.timer-buttons');
        }else{
            $(timerPomodorosHbs(args)).replaceAll('.timer-content__pomodoros--wrapper');
            $(timerHbs(args)).replaceAll('.timer-circle');
            $(timerButtonsHbs(args)).replaceAll('.timer-buttons');
        }
    }
})(jQuery);