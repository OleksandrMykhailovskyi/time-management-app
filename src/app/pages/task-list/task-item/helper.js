import hbs from 'handlebars/runtime';

hbs.registerHelper('getDay', function(deadlineDate) {
    const newDate = new Date(deadlineDate);
    return newDate.getDate();
});

hbs.registerHelper('getMonth', function(deadlineDate) {
    const newDate = new Date(deadlineDate);
    const currentMonth = newDate.getMonth();
    const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const currentMonthName = monthNames[currentMonth]
    return currentMonthName;
});

hbs.registerHelper('if_eq', function(deadlineDate,opts){
    //receiving the date values from FB
    const dateFromFB = new Date(deadlineDate);
    const dayFromFB = dateFromFB.getDate();
    const monthFromFB = dateFromFB.getMonth()+1;
    const yearFromFB = dateFromFB.getFullYear();
    //working with the today date info
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth()+1;
    const todayYear = today.getFullYear();
    //receiviтg the formatted date
    const finalDateFromFB = `${dayFromFB}/${monthFromFB}/${yearFromFB}`;
    const todayDate = `${todayDay}/${todayMonth}/${todayYear}`;
    if (finalDateFromFB == todayDate) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
//
hbs.registerHelper('if_Status', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerHelper('times', function(n, block) {
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

hbs.registerHelper('pomodoroStatusesHelper', function(a, b, opts) {
    if (a === 'failed') {
        return opts.fn(this);
    } else if(a==='success'){
        return opts.inverse(this);
    }
});

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});