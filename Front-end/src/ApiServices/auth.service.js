import axios from './axiosUrl';

class AuthServices {

    register(data) {
        return axios.put('/signup',data)
        // .then(response => {console.log('Response:', response) 
        //          if(response.status ===201 || response.status ===200){
        //              localStorage.setItem('token', response.data.token) 
        //              console.log(response.data.token);

                 
        //            alert(response.data.message);
        //              }
                     
        //          else 
        //              alert("Something went wrong")})

        //      .catch(error=>{console.log(error); alert("Something went wrong")} );

                    


                    }

    otp(data){
        return axios.post("/signup/otp",data)
        // .then(response => {console.log('Response:', response) 
        //     if(response.status ===201 || response.status ===200) 
              
        //         {  alert(response.data.message);
        //             localStorage.removeItem('token') 
        //          localStorage.removeItem('email') 
            
        //         }
        //     else alert("Something went wrong")})
        //     .catch(error=>{console.log(error); alert("Something went wrong")});

        }


    otpResend(data){
        return axios.post('/signup/otp-resend',data)
        

    }


    login(data) {
        return axios.post('/login',data)
       
    }



    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
    }


    getCurrentUser(){
        return localStorage.getItem('user');
    }

    getUserName(){
        return localStorage.getItem('userName');
    }

}

export default new AuthServices();