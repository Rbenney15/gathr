import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import Container from ''

const Landing = () => {
    const { data: userData } = useQuery(QUERY_ME);
    
    const loggedIn = Auth.loggedIn();

    return (

    );
};

export default Landing;