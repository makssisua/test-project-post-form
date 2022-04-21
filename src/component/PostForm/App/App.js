import { PostForm } from "../postForm";
import "./App.scss";
import "../../../modal/modal.scss";
import axios from "axios";

import { Modal } from "../../../modal/modal";
import { useState } from "react";

function App() {
  const url = "https://postman-echo.com/post";
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    format: "",
    email: "",
    date: ""
  });

  const handleSendReport = () => {
    axios.post(url, {
      name: data.name,
      format: data.format,
      email: data.email,
      date: data.date
    })
      .then(res => {
        if (res.status === 200) {
          alert("Success");
        }
      }, (e) => {
        console.log(e, 'error!');
        alert("Denied");
      })
  };


  return (
    <div className="App">
      <div className="container">
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="btn btn-secondary"
        >
          Send Report
        </button>
      </div>

      <Modal
        title="Export Report"
        onClose={() => setShowModal(false)}
        show={showModal}
        onSend={() => handleSendReport()}
      >
        <PostForm data={data} setData={setData} />
      </Modal>

    </div>
  );
}

export default App;
