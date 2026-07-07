import API from "../services/api";

// =============================
// Create Task
// =============================

const projectCreate = async (

    id,

    task,

    fetchProject,

    setOpenModal

) => {

    try {

        const res = await API.post(

            `/tasks/${id}`,

            task

        );

        console.log(res.data);

        fetchProject();

        setOpenModal(false);

    }

    catch (err) {

        console.log("ERROR:", err.response?.data);

    }

};

export default projectCreate;