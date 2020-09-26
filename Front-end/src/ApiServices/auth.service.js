import axios from './axiosUrl';

class AuthServices {

    register(data) {
        return axios.put('/signup',data)
        .then(response => {console.log('Response:', response) 
                if(response.status ===201 || response.status ===200){
                    localStorage.setItem('token', response.data.token) 
                    alert(response.data.message);
                    }
                    // this.setState({ redirect: "/signup/otp" });}
                else 
                    alert("Something went wrong")})

            .catch(error=>{console.log(error)});
    }

    otp(data){
        return axios.post("/signup/otp",data)
        .then(response => {console.log('Response:', response) 
            if(response.status ===201 || response.status ===200) 
                {localStorage.removeItem('token') }
            else alert("Something went wrong")})
            .catch(error=>{console.log(error)});

            }



    login(data) {
        return axios.post('/login',data)
        .then(response => {
            console.log('Response:', response)
            if(response.status ===201 || response.status ===200) 
                {alert(response.data.message);
                localStorage.setItem('user',response.data);}
            else 
                alert("Something went wrong")})

        .catch(error=>{console.log(error.response)});
    }



    logout(){
        localStorage.removeItem("user");
    }


    getCurrentUser(){
        return localStorage.getItem('user');
    }



}

export default new AuthServices();