import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

export default function Popup({message = ""}) {
  const [isActive, setIsActive] = useState(true);

  if (!isActive || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-4">
      <div className="w-full max-w-sm rounded-xl border border-blue-200 bg-white p-4 shadow-lg shadow-blue-100/60">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FontAwesomeIcon
              icon={faBell}
              className="animate-bell-ring text-base"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">Notification</p>
            <p className="mt-0.5 text-sm text-slate-600">{message}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsActive(false)}
            className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close notification"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
