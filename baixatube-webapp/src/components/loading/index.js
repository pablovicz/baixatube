import "./styles.css";
import { LoopCircleLoading } from "react-loadingg";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <LoopCircleLoading color="#E02626" style={{display:'flex', alignItems: 'center', justifyContent: 'center'}} />
      </div>
    </div>
  );
}

export default Loading;
