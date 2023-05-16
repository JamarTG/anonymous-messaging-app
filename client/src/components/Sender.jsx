export default function Sender({ name, id, setUserToReplyTo, isUserMessage }) {
    return (
        <div className={`text-xs ${isUserMessage ? "text-green-400" : "text-slate-400"}`}>
            <button onClick={function () {setUserToReplyTo({ name, id });}}>
                reply to {name}
            </button>
        </div>
    );
}