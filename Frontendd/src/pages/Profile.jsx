import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import "./Profile.css"

const Profile = () => {
    const { logout } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        try {
            const { data } = await api.get("/auth/profile");
            setUser(data.user);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <sidebar />
            <div className="profile-page">
                <Navbar />
                <div className="profile-container">
                    <div className="profile-card">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff&size=200`}
                            alt="profile"
                        />

                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>

                        <div className="profile-info">
                            <div>
                                <h4>Joined</h4>

                                <span>
                                    {user?.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "-"}
                                </span>

                            </div>

                            <div>
                                <h4>User ID</h4>
                                <span>{user?._id}</span>
                            </div>


                        </div>

                        <button className="logout-button" onClick={logout}>
                            Logout
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Profile;