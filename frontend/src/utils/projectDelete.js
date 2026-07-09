import API from "../services/api";
//delete 
const projectDelete = async (

    taskId,

    fetchProject

) => {

    try {

        await API.delete(
            `/tasks/${taskId}`
        );
        fetchProject();
    }

    catch (err) {
        console.log(err);
    }

};

export default projectDelete;