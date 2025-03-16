import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import moment from "moment";

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [allNotes, setAllNotes] = useState([]); // Corrected state for all notes
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    // Fetch user information
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            // Clear local storage and redirect to login on failure
            localStorage.clear();
            navigate("/login");
        }
    };

    // Get all notes
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes); // Corrected to set all notes
            }
        } catch (error) {
            console.log("An unexpected error occurred. Try again later.");
        }
    };

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []); // Empty dependency array to only call once when the component mounts

    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => setOpenAddEditModal({ isShown: true, type: "edit", data: item })}
                            onDelete={() => {}}
                            onPinNote={() => {}}
                        />
                    ))}
                </div>
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                appElement={document.getElementById('root')} // Add this line to specify the root element
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel="Edit Note"
                className="w-[40%] max-h-3/4 bg-white rounded-md max-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllNotes={getAllNotes}
                />
            </Modal>
        </>
    );
};

export default Home;
