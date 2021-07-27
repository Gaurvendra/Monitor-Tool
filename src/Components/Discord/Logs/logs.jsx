import './logs.css'

import {useSelector, useDispatch} from 'react-redux';
import {clearLogs} from '../../../Redux/Actions/actionCreator'


const Logs = ({viewLogModal, setViewLogModal}) =>{

    const dispatch = useDispatch();

    const {logs, webHookToggles} = useSelector(state=> state);
    
    if(!webHookToggles[2]) return <></>
    //third element in webHookToggles array is boolean initially set to true
    //check webhookToggles in initialState.js
    
    return (
      <div className="logs-container">
        <div className="logs-btn">
          <button
            style={{ backgroundColor: "#2b4591" }}
            onClick={() => setViewLogModal(true)}
          >
            Export
          </button>
          <button
            style={{ backgroundColor: "#dc3545" }}
            onClick={() => dispatch(clearLogs())}
          >
            Clear
          </button>
        </div>
        <div className="log-text">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    );
}
export default Logs;