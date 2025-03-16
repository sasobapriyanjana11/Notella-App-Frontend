import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast.jsx";
import EmptyCard from "../../components/EmptyCard/EmptyCard.jsx";
import AddNotesImg from "../../assets/images/add-notes.svg";

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        type: "add",
        message: "",
    });

    const [allNotes, setAllNotes] = useState([]); // Corrected state for all notes
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    const handleEdit=(noteDetails)=>{
        setOpenAddEditModal({isShown: true,data:noteDetails,type:"edit"});
    }

    const showToastMessage=(message,type)=>{
        setShowToastMsg({
            isShown: true,
            message,
            type

        });
    };

    const handleCloseToast=()=>{
        setShowToastMsg({
            isShown: false,
            message: "",

        });
    };


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
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Try again later.");
        }
    };

    // delete note
    const deleteNote = async (data) => {
        const noteId=data._id;
        try{
            const response=await axiosInstance.delete("/delete-note/"+noteId);
            if(response.data && !response.data.error){
                showToastMessage("Note Deleted Successfully!",'delete');
                getAllNotes()

            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                console.log("An unexpected error occurred. Try again later.");
            }
        }
    }

    useEffect(() => {
        getAllNotes();
        getUserInfo();
    }, []); // Empty dependency array to only call once when the component mounts

    return (
        <>
            <Navbar userInfo={userInfo} />
            <div className="container mx-auto">
                { allNotes.length> 0 ? (
                        <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() =>handleEdit(item)}
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => {}}
                        />
                    ))}
                </div>): (
                    <EmptyCard imgSrc={AddNotesImg}
                               message={`Start to create your first note! Click the 'Add' button to jot down your
                                        thoughts ,ideas,and reminders. Let's get started !`}/>
                )}
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
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                    showToastMessage={showToastMessage}
                />
            </Modal>
            <Toast
            isShown={showToastMsg.isShown}
            message={showToastMsg.message}
            type={showToastMsg.type}
            onClose={handleCloseToast}
            />
        </>
    );
};

export default Home;
