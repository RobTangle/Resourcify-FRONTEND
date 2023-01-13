import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createResource } from "../../redux/features/resource";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-40%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "grey",
  },
};

Modal.setAppElement(document.getElementById('root'));


export function NewResource({ isLoggedIn }) {
  //! REACT MODAL :
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  //! ---------------------------

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
    order: 0,
    keywords: "", // antes de enviar el post, hacer un split(" ")
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const formParsed = {
      ...form,
      keywords: form.keywords.toLowerCase().split(" "),
    };
    dispatch(createResource(formParsed, setForm));
  }

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <>
      {isLoggedIn === true && (
        <div>
           {/* // <!-- Modal toggle --> */}
      <button
        onClick={openModal}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        New Resource
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
         <h2>Save new resource</h2>
         <hr />
         <br/>
         <fieldset>
            <form action="" onSubmit={handleSubmit} className="form">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={handleOnChange} />
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                onChange={handleOnChange}
              ></textarea>
              <label htmlFor="link">Link</label>
              <input type="text" id="link" onChange={handleOnChange} />
              <label htmlFor="category">Category</label>
              <input type="text" id="category" onChange={handleOnChange} />
              <label htmlFor="order">Order</label>
              <input type="number" />
              <label htmlFor="keywords">Keywords</label>
              <input type="text" id="keywords" onChange={handleOnChange} />
              <br/>
              <button>Save</button>
            </form>
          </fieldset>
           {/* <button onClick={closeModal}>Close X</button> */}
          </Modal>
        </div>
      )}
    </>
  );
}
