const BASEURL = 'http://localhost:8000';

const ROUTES = {
    BASEURL: `${BASEURL}`,
    AUTH: {
        LOGIN: `${BASEURL}/auth/token`,
        REFRESH: `${BASEURL}/auth/refresh`,
        VERIFY: `${BASEURL}/auth/verify`,
    },
    POST: {

    },

    API: {
        USERS: `${BASEURL}/api/users`,        
    }
};

export default ROUTES;