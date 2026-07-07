import API from "../services/api";

// =============================
// Load Project + Tasks
// =============================

const projectFetch = async (

    id,

    setProject,

    setTasks,

    setLoading

) => {

    try {

        const { data: projectData } = await API.get(
            `/projects/${id}`
        );

        setProject(projectData.project);

        const { data: taskData } = await API.get(
            `/tasks/project/${id}`
        );

        setTasks(taskData.tasks);

    }

    catch (err) {

        console.log(err.response?.data || err);

    }

    finally {

        setLoading(false);

    }

};

export default projectFetch;