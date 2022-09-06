import LoginForm from "../LoginForm";
import { reAuth } from "../../firebase";

export default function ReAuthModal({ close }) {

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        await reAuth(password);
        close();    
    }

    return (
        <LoginForm handleSubmit={handleSubmit} noEmail={true} />
    )
}