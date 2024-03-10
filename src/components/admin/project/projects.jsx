import React from 'react';
import AdminLayout from '../AdminLayout';
import ProjectTable from './projectTable';
const ProjectsMain = ({projects}) => {
    return (
       
        <AdminLayout>


<ProjectTable projects={projects}/>


        </AdminLayout>
    );
}


export default ProjectsMain;
