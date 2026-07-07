import API from "../services/api";

// =============================
// Complete Task
// =============================

const projectComplete = async (

    taskId,

    fetchProject

) => {

    try {

        await API.patch(

            `/tasks/${taskId}/status`

        );

        fetchProject();

    }

    catch (err) {

        console.log(err);

    }

};

export default projectComplete;