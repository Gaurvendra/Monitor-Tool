import "./logsModal.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogsModal = ({ viewLogModal, setViewLogModal }) => {
  const { logs } = useSelector((state) => state);

  if (!viewLogModal) return <></>;

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    toast.success("Logs are ready!");
    setViewLogModal(false);
  }

  const handleExport = (name, logs) => {
    download(logs, name, "text/plain");
  };

  return (
    <div className="logs-modal-container">
      <p style={{ fontSize: "20px", fontWeight: "500" }}>Logs File Name</p>
      <br />
      Enter File Name
      <br />
      <input type="text" id="logs-download-id" style={{ color: "white" }} />
      <div className="logs-btn">
        {/** logs-btn is present in logsModal.css */}
        <button
          style={{ backgroundColor: "#2b4591" }}
          onClick={() => {
            let name = document.getElementById("logs-download-id").value;
            if (name) handleExport(name, logs);
            else toast.error("Enter log file name");
          }}
        >
          Export
        </button>
        <button
          style={{ backgroundColor: "#dc3545" }}
          onClick={() => setViewLogModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default LogsModal;
