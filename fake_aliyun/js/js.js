/**
 * Created by Administrator on 2016/6/30.
 */
$(function(){
    //console.log('!!');
    var left_nav = $('.left_nav'),left_nav_1 = $('.left_nav_1');
    var min_width = 40,max_width = 180;
    //console.log(left_nav.css('width'));
    //console.log(left_nav_1.css('width'));
    //console.log($('body').css('height'));

//console.log($.cookie('last_frame')==undefined);
    left_nav.css('width', $.cookie('width1'));
    left_nav_1.css('width', $.cookie('width2'));
    $('.test').css('margin-left',$.cookie('width1') + $.cookie('width2'));
    //$('.test').css('margin-left',parseInt(left_nav.css('width'))+parseInt(left_nav_1.css('width')));
    $('iframe').css({
        'height': parseInt($('body').css('height'))-55,
        'margin-top': 50
    });
    left_nav_1.children('ul').children('li').hide().eq($.cookie('last_li')).fadeIn();
    $('.test').children('iframe').attr('src', $.cookie('last_frame'));

    function cookie1(width){
        $.cookie('width1', width , {expires: 36500, path: '/'});//将当前选择的主题保存到cookie
    }
    function cookie2(width){
        $.cookie('width2', width , {expires: 36500, path: '/'});//将当前选择的主题保存到cookie
    }


    //$('.left_nav').mouseover(function(){
    //    if(parseInt($(this).css('width')) < 100){
    //        console.log($(this).css('width'));
    //        $(this).hover(function(){
    //            $(this).css('width',180);
    //        },function(){
    //            $(this).css('width',40);
    //        });
    //    }
    //});



    left_nav.on('click','a',function(){
        var main_src = $(this).attr('href');
        $.cookie('last_frame', main_src , {expires: 36500, path: '/'});//将当前选择的主题保存到cookie
        //console.log($(this).parent().index());
        $.cookie('last_li', $(this).parent().index() , {expires: 36500, path: '/'});//将当前选择的主题保存到cookie
    });
    $(window).resize(function(){
        $('iframe').css('height', parseInt($('body').css('height'))-55);
    });
    $('#slide1').on('click',function(){
        if(parseInt(left_nav.css('width'))>100){
            cookie1(min_width);
            left_nav.css('width',min_width);
            parseInt(left_nav_1.css('width'))>100 ?
                $('.test').css('margin-left',min_width + max_width) :
                $('.test').css('margin-left',min_width + min_width)
        }else{
            cookie1(max_width);
            left_nav.css('width',max_width);
            parseInt(left_nav_1.css('width'))>100 ?
                $('.test').css('margin-left',max_width + max_width) :
                $('.test').css('margin-left',max_width + min_width)
        }
    });
    $('#slide2').on('click',function(){
        if(parseInt(left_nav_1.css('width'))>100){
            cookie2(min_width);
            left_nav_1.css('width',min_width);
            parseInt(left_nav.css('width'))>100 ?
                $('.test').css('margin-left',min_width + max_width) :
                $('.test').css('margin-left',min_width + min_width)
        }else{
            cookie2(max_width);
            left_nav_1.css('width',max_width);
            parseInt(left_nav_1.css('width'))>100 ?
                $('.test').css('margin-left',max_width + max_width) :
                $('.test').css('margin-left',max_width + min_width)
        }
    });

    //$('.test').on('click',function(){
    //    console.log(left_nav.css('width'));
    //    console.log(left_nav_1.css('width'));
    //});

    left_nav.on('click','li',function(){
        //console.log($(this).index());
        //console.log($(left_nav_1).children('.sec_contain').children('li').eq(1).children('ul').children('li'));
        $(left_nav_1).children('.sec_contain').children('li').hide().eq($(this).index()).fadeIn();
        $(left_nav_1).children('.sec_contain').children('li').find('a').removeClass('active');
        $(left_nav_1).children('.sec_contain').children('li').eq($(this).index()).find('a').eq(0).addClass('active');
        //$(left_nav_1).children('.sec_contain').children('li').eq($(this).index()).siblings('li').find('a').siblings('li').children('a').removeClass('active');
        //console.log($(left_nav_1).children('.sec_contain').children('li').eq($(this).index()).children('ul').children('li').length);
        var l = $(left_nav_1).children('.sec_contain').children('li').eq($(this).index()).children('ul').children('li').length;
        if(l <= 1){
            if(parseInt(left_nav_1.css('width')) > 100){
                $('#slide2').trigger('click');
            }
        }else{
            if(parseInt(left_nav_1.css('width')) < 100){
                $('#slide2').trigger('click');
            }
        }
    });
    left_nav_1.on('click','li',function(){
        $(this).children('a').addClass('active');
        $(this).siblings('li').children('a').removeClass('active');
    });
});