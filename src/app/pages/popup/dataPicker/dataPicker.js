import 'jquery-ui/ui/widgets/datepicker'

export default () => $(function(){
    $('#datePick').datepicker();
    $('.ui-state-default').on('click', function(){
        $(this).datepicker('setDate', $(this).val());
    });
});