export const logIn = (username: string, userPassword: string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            console.log(username, userPassword)
            const response = await axios.post<any>('http://localhost:4000/user/login', {
                username,
                userPassword
            });
            const token = response.data.token;
            const userId = response.data.userId;
            const name = response.data.userName;
            const admin = response.data.admin;
            const followedTrips = response.data.followedTrips;
            const authorization = response.data.authorization
            console.log(admin)
            const user: userForLocalStorageProps = {
                id: userId,
                admin: admin,
                userName: username,
                password: userPassword,
                followedTrips: followedTrips,
                authorization: authorization
            }
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user as any));

            if (admin) {
                dispatch({
                    type: Actions.Login,
                    payload: {
                        msg: response.data.msg,
                        userId: userId,
                        followedTrips: followedTrips,
                        admin: true,
                        authorization: 'admin',
                        user: name
                    }
                })
            };


            export function checkLocalStorageAction() {
                const athorisation = localStorage.getItem('user');
                if (!athorisation) {
                    return (dispatch: Dispatch) => {
                        dispatch({
                            type: {},
                            payload: {}
                        })
                    }
                };
                if (athorisation) {
                    const user = JSON.parse(athorisation);
                    console.log(user);
                    return (dispatch: Dispatch)=>{
                        dispatch({
                            type: Actions.Login,
                            payload: {
                                msg: 'stay conected',
                                userId: user.id,
                                followedTrips: user.followedTrips,
                                admin: user.admin,
                                authorization: user.authorization,
                                user: user.userName
                            }
                        })
                    }
                }
            
            }
            