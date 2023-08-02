const BASEURL = 'http://localhost:8000';

const ROUTES = {
    BASEURL: `${BASEURL}`,
    AUTH: {
        LOGIN: `${BASEURL}/auth/token`,
        REFRESH: `${BASEURL}/auth/token/refresh`,
        VERIFY: `${BASEURL}/auth/verify`,
    },
    POST: {
        SIGNUP: `${BASEURL}/post/signup`,
    },

    API: {
        USERS: `${BASEURL}/api/users`,  
        USER: function(username) {
            return `${BASEURL}/api/user/${username}`;
        },
        MARKS: function(username) {
            return `${BASEURL}/api/user/${username}/marks`;
        },
        ACHIEVEMENTS: function(username) {
            return `${BASEURL}/api/user/${username}/achievements`;
        },
        TAGS: function(username) {
            return `${BASEURL}/api/user/${username}/tags`;
        },
        COURSES: function(username) {
            return `${BASEURL}/api/user/${username}/courses`;
        },

    }
};

export default ROUTES;