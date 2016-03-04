
(function($){
    $.fn.viModal = function(options){
        var def = {
            css3 : true,            //enable css3 for smooth animation
            close_overlay : true,   //close when click on overlay
            close_link : true       //insert close link
        };
        var opt = $.extend(def, options),
            obj = $(this),
            link = obj.find('.vimodal-link'),
            excBox = $('#'+obj.data('url')),
            win = $(window);
        
        //insert modal box for fake animation box
        obj.prepend('<div class="vimodal-box"><div class="loading">Loading...</div></div>');
        var box = obj.children('.vimodal-box');
        var load = obj.find('.loading');
        
        //if you want to insert close link
        if(opt.close_link){
            box.append('<a href="/" class="vimodal-close">Close</a>');
        }
        
        //insert overlay box
        obj.prepend('<div class="vimodal-overlay"></div>');
        var overlay = obj.children('.vimodal-overlay');
        
        //set box position relative to window
        var boxWidth = box.width(),
            boxHeight = box.height(),
            boxTop = box.offset().top,
            boxLeft = box.offset().left;
    
        box.css({top: boxTop, left: boxLeft, 'position': 'fixed', width: boxWidth, height: boxHeight});
        
        //get size of content modal
        var modalWidth = excBox.outerWidth(),
            modalHeight = excBox.outerHeight(),
            modalTop = win.height() / 2 - excBox.height() / 2,
            modalLeft = win.width() / 2 - excBox.width() / 2,
            modalMargLeft = (modalWidth / 2) - modalWidth;
        
        //link on click
        link.click(function(e){
            box.css('visibility', 'visible');
            //box.show(function(){
                load.show();
                e.preventDefault();
                overlay.addClass('fade');
                box.fadeIn('fast', function(){
                    box.css({top: modalTop, 'margin-left': modalMargLeft, left: '50%', width: modalWidth, height: modalHeight}).addClass('in');
                    setTimeout(function(){
                        if(box.height() === modalHeight){
                            moveBox();
                        }
                    }, 1000);
                    
                });
                
            //});
            
        });
        
        //function for move execute box to fake box
        var moveBox = function(){
            excBox.appendTo(box).fadeIn();
            load.hide();
        };
        
        //function to close modal
        var closeModal = function(){
            excBox.fadeOut('fast', function(){
                overlay.removeClass('fade');
                box.css({top: boxTop, left: boxLeft, 'margin-left': 0, width: boxWidth, height: boxHeight}).removeClass('in');
                setTimeout(function(){
                    if(box.height() === boxHeight){
                        box.hide();
                    }
                }, 1000);
                
            });
            
        };
        
        //click close link
        $('.vimodal-close').click(function(e){
            e.preventDefault();
           closeModal(); 
        });
        
        //click on overlay
        if(opt.close_overlay){
            $('body').on('click','.vimodal-overlay.fade',function(){
                closeModal(); 
            });
        }
        
        //if window scroll
        win.scroll(function(){
            var scroll = $(window).scrollTop();
            if(!box.hasClass('in') && scroll > 0){
                box.css({position: 'absolute', top: 0, left: 0});
            }else{
                box.css({position: 'fixed', top: boxTop, left: boxLeft});
            } 
        });
    }
})(jQuery);