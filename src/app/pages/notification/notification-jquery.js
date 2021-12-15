import hbs from './notifications.handlebars';
// import jQuery from 'jquery';

(function ($) {
    $.fn.notificationPlugin = function (options) {
        //the method that is called to remove the notification automatically in some time
        const setDelay = (time) => {
            setTimeout(() => {
                $('.notication-list').remove();
            }, time);
        }
        //the method that removes the notification Node from DOM
        const cleanNotification = () => {
            $('.icon-close').on('click', () => {
                $('.notication-list').remove();
            });
        }
        //the arguments that will be added to the notifications.handlebars
        const args= {
            type: options.type,
            message: options.message,
            time: options.time,
            icon: options.icon,
        };
        //adding the element to the DOM
        document.querySelector('#root1').insertAdjacentHTML('afterend', hbs(args));
        //unless the type of notification is "error", the notification should be automatically removed
        if (options.type !== 'error') {
            setDelay(options.time)
            cleanNotification();
        }
    };
})(jQuery);

