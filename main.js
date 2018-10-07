let $form = $('#signUpForm')
$form.on('submit',(e)=>{
    let hash = {}
    e.preventDefault()
    let need = ['email','password','password_confirmation']
    need.forEach((name)=>{
        let value = $form.find(`[name=${name}]`).val()
        hash[name] = value
    })
    $form.find('.error').each((index,span)=>{
        $(span).text('')
    })
    if(hash['email'] === ''){
        $form.find('[name="email"]').siblings('.error')
            .text('填邮箱呀同学')
        return
    }
    if(hash['password'] === ''){
        $form.find('[name="password"]').siblings('.error')
            .text('填密码呀同学')
        return
    }
    if(hash['password_confirmation'] === ''){
        $form.find('[name="password_confirmation"]').siblings('.error')
            .text('确认密码呀同学')
        return
    }
    if(hash['password'] !== hash['password_confirmation']){
        $form.find('[name="password_confirmation"]').siblings('.error')
            .text('密码不匹配')
        return
    }
    $.post('/sign_up',hash)
        .then((response)=>{
            console.log(response)
        },(request)=>{
            // let object = JSON.parse(request.responseText)
            // let errors = object.errors
            let {errors} = JSON.parse(request.responseText)
            if(errors.email && errors.email === 'invalid'){
                $form.find('[name="email"]').siblings('.error')
                    .text('邮箱格式错误')
            }
        })
})