/**
 * Created by lenovo on 2017/3/3.
 */
var $$=function(){};
$$.prototype={
    trim:function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    ajax:function(parmas,url,completeHandler){
        $.ajax({
            type: "post",
            dataType: "json",
            url:url,
            data:parmas,
            success:function (data){
                if( data.status == 1 )
                {
                    if(completeHandler)
                        completeHandler(data);
                }
                else
                    alert(data.msg );
            }
        })
    },
    split:function(str){
        var arr=str.split("/");
        var y=arr[2],
            m=arr[0],
            d=arr[1];
        return y+"-"+m+"-"+d;
},
    BindTemplate:function (data,Template) {
        var html = template(Template, data);
        return html;
    },
    open:function(){}
}
$$ = new $$();

