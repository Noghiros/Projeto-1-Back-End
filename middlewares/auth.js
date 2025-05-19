const isLogin =  async(req, res, next)=>{

    try{

        if(req.session.user){}
            res.redirecti('/dashboard');
            next();
        


    } catch (error) {
        console.log(error.message);
    }

}

const isLogout =  async(req, res, next)=>{

    try{

        if(req.session.user){}
            res.redirecti('/dashboard');
            next();
        


    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    isLogin,
    isLogout
}