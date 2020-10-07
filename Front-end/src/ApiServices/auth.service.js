import axios from './axiosUrl';

class AuthServices {

    register(data) {
        return axios.put('/signup',data)
    


                    }

    otp(data){
        return axios.post("/signup/otp",data)
  

        }


    otpResend(data){
        return axios.post('/signup/otp-resend',data)
        

    }


    login(data) {
        return axios.post('/login',data)
       
    }

    VerifyEmail(data){
        return axios.post('/signup/resetOtp',data);
    }

    VerifyOtp(data){
        return axios.post('/signup/checkOtp',data);
    }

    ResetPassword(data){
        return axios.post('/signup/reset-password',data);
    }
    
    UpdatedCourse(data){
        return axios.put('home/courseUpdate',data);
    }

    logout(){
       localStorage.clear();
    }


    getCurrentUser(){
        return localStorage.getItem('user');
    }

    getUserName(){
       let userName=localStorage.getItem('userName');
       if(userName!=null)
        userName= userName.charAt(0).toUpperCase() + userName.slice(1);
        return userName;
    }

}

export default new AuthServices();