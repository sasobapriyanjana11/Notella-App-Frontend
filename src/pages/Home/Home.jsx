import React, {useState} from 'react'
import Navbar from "../../components/Navbar/Navbar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import {MdAdd} from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";


const Home = () => {

    const[openAddEditModal,setOpenAddEditModal]=useState({
        isShown: false,
        type:"add",
        data:null,
    });

    return (
        <>
            <Navbar/>
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                <NoteCard
                    title="Meeting on 7th April"
                    date="3rd April 2024"
                    content="Meeting on 7th April 2024"
                    tags="#Meeting"
                    isPinned={true}
                    onEdit={()=>{}}
                    onDelete={()=>{}}
                    onPinNote={()=>{}}
                />

                </div>
            </div>
            <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{
                setOpenAddEditModal({isShown: true,type:"add",data:null,})
            }}>
                <MdAdd className="text-[32px] text-white "/>
            </button>
            <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
            style={{
                overlay:{
                    backgroundColor: "rgba(0,0,0,0.2)",
                },

            }}
             contentLabel="Edit Note"
              className="w-[40%] max-h-3/4  bg-white rounded-md max-auto mt-14 p-5 overflow-scroll"

            >
            <AddEditNotes />
            </Modal>
        </>

    );
};
export default Home