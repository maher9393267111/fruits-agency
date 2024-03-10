import React from 'react';
import AdminLayout from '../AdminLayout';
import UsersTable from './usersTable';
const UsersMain = ({users}) => {
    return (
        <AdminLayout>
        <UsersTable users={users}/>    
        </AdminLayout>
    );
}


export default UsersMain;