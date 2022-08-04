const form = layui.form;

form.verify({

    rePwd: value => {
        // value: 表单的值、item: 表单的DOM对象
        const pwd =$('.layui-form [name=newPwd]').val()
        if (pwd !== value) return "两次密码不一致！";
    },
   
    samePwd: value => {
        const pwd =$('.layui-form [name=oldPwd]').val()
        if (pwd === value)  return "新旧密码不能相同！";
    },

    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});


$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: '/my/updatepwd',
        data: form.val('formPassword'),
        success: res => {
            const {status, message} = res
            layer.msg(message)
            if(status !== 0) return 
            // $('#resetBtn').click()
            $('.layui-form')[0].reset()
        }
    })
})