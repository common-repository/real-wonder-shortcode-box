jQuery(function($){
        $('.real_effect[r_tran!=""]').each(function(index, el) {
            var obj = $(this);
            var effect = $(this).attr('r_tran');
            obj.appear();
            obj.bind('appear', function(e, $affected) {
                var oldclass=obj.attr('class');
                obj.attr('class','');
                obj.css('visibility','visible');
                obj.addClass(effect);
                 setTimeout(function(){
                    obj.removeClass(effect);
                    obj.attr('class',oldclass);
                 },2700);
                 obj.unbind('appear');
              });
    });
})