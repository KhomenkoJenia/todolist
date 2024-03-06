import { useRef } from "react";
import Input from "./Inuput";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const dueData = useRef();

  function handlerSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueData = dueData.current.value;
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueData.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueData: enteredDueData,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonChaption="okey">
        <h2 className="text-xl font-bold text-stone-600 my-4">Invalid Input</h2>
        <p className="text-stone-700 mb-4">
          Opss ... looks like you forgot to enter a value
        </p>
        <p className="text-stone-700 mb-4">
          Please make sure you provide a valid value for evry input value
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handlerSave}
              className="px-6 py-4 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input type="text" ref={description} label="Description" textarea />
          <Input type="date" ref={dueData} label="Due Date" />
        </div>
      </div>
    </>
  );
}
