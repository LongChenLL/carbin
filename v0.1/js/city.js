/**
 * Created by lenovo on 2017/3/7.
 */
function city(parmes){
    this.parmes=parmes;
    this.input=$("#"+this.parmes);
    this.initialize.apply(this, arguments);
    this.config={
        search_inp:$(".search_inp"),
        bt_calculate_con:$(".bt-calculate-con"),
        city:$(".city"),
        search_con:$(".search_con"),
        start:$("#start"),
        arrive:$("#arrive"),
        guoji:$(".guoji"),
        guonei:$(".guonei"),
        A_Z:$(".A-Z")
    }
}
city.prototype={
    /*初始化*/
    initialize:function(){
        this.input = $("#"+this.parmes);
        this.inputEvent(datacity.guonei);
    },
    /*输入框事件*/
    inputEvent:function(val){
        var that = this;
        this.input.on("click",function(){
            that.config.bt_calculate_con.addClass("hide");
            that.config.city.removeClass("hide");
            if(! that.config.search_inp.hasClass("hide")){
                that.config.search_inp.addClass("hide");
            }
            //var h=$("body").find(".hot")
            //if(h.length==0){
            that.createWarp(val);
            //}
            if(that.config.guoji.hasClass("on")){
                that.config.guoji.removeClass("on");
                that.config.guonei.addClass("on");
                that.search(datacity.guonei);
            }
            if(! that.config.A_Z.hasClass("hide")){
                that.config.A_Z.addClass("hide");
                that.config.search_con.removeClass("hide");
            }
            $(that.input).val("");
        });
        this.input.on('click',function(){
            that.input.select();
        });
        this.input.on("keyup",function(){
            if($(this.input).val()!=""){
                that.config.search_inp.removeClass("hide");
                that.config.city.addClass("hide");
                var arr=[];
                for(var i=0;i<data_search_city.length;i++){
                    if(data_search_city[i].pinyin.indexOf($$.trim($(that.input).val()))==0 || data_search_city[i].name.indexOf($$.trim($(that.input).val()))==0){
                        var html='<li code='+data_search_city[i].code+'>'+data_search_city[i].name+'</li>';
                        arr.push(html);
                    }
                }
                if(arr.length>0){
                    that.config.search_inp.html(arr);
                    $(".search_inp li").on("click",function(){
                        $(that.input).val($(this).text())
                        $(that.input).attr("code",$(this).attr("code"));
                        that.config.search_inp.addClass("hide");
                        that.config.city.removeClass("hide");
                        if((that.config.start.val()!="") && (that.config.arrive.val()!="")){
                            that.config.city.addClass("hide");
                            that.config.bt_calculate_con.removeClass("hide");
                        };
                    })
                }
                else{
                    var html='<li>对不起，没有找到数据，请重新输入</li>';
                    that.config.search_inp.html(html);
                }
            }
        })
    },
    createWarp:function(val){
        var  that=this;
        //if(!that.hot){
            var hot=that.hot=document.createElement('div');
            hot.className = 'hot com con cf';
        //}
        var p='<p class="title">热门城市</p>';
        $(hot).append(p);
        $(".hotcon").html(hot);
        var arr=[];
        for(var i=0;i<12;i++){
            var hot=val[i].name;
            var code=val[i].code;
            var html='<span code='+code+'>'+hot+'</span>';
            arr.push(html);
        }
        arr.unshift(p)
        $(that.hot).html(arr);
        $(this.hot).find("span").on("click",function(){
            var text=$(this).text();
            $(that.input).val(text);
            if((that.config.start.val()!="") && (that.config.arrive.val() !="")){
                that.config.city.addClass("hide");
                that.config.bt_calculate_con.removeClass("hide");
            }
            $(that.input).attr("code",$(this).attr("code"));
        });
        this.search(datacity.guonei);
       /*国际国内切换*/
        that.config.guoji.on("click",function(){
            that.createWarp(datacity.guoji);
            that.search(datacity.guoji);
            that.config.A_Z.addClass("hide");
            that.config.search_con.removeClass("hide");
        });
        that.config.guonei.on("click",function(){
            that.createWarp(datacity.guonei);
            that.search(datacity.guonei);
            that.config.A_Z.addClass("hide");
            that.config.search_con.removeClass("hide");
        })
    },
    search:function(val){
        var that=this;
        $(".search_con span").on('click',function(){
            that.config.search_con.addClass("hide");
            that.config.A_Z.removeClass("hide");
            var text=$(this).text();
            $("#search_val").html(text);
            var arr=[];
        for(var i=0;i<val.length;i++){
            if(val[i].pinyin.indexOf(text.toLocaleLowerCase())==0){
                var html='<li code='+val[i].code+'>'+val[i].name+'</li>';
                arr.push(html);
            }
            else{
                var str='<li>对不起，没有找到'+text+'</li>'
            }
        }
        if(arr.length>0){
            $(".inner-city").html(arr);
        }
        else{
            $(".inner-city").html(str);
        }
        $(".inner-city li").on('click',function(){
            var text=$(this).text();
            $(that.input).val(text);
            $(that.input).attr("code",$(this).attr("code"));
            if((that.config.start.val()!="") && (that.config.arrive.val()!="")){
                that.config.city.addClass("hide");
                that.config.bt_calculate_con.removeClass("hide");
            }
            that.config.A_Z.addClass("hide");
            that.config.search_con.removeClass("hide");

        })

        });
    }
}