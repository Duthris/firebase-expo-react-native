import ReAuthModal from "../components/modals/ReAuthModal";
import LogoutModal from "../components/modals/LogoutModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import RemoveAvatarModal from "../components/modals/RemoveAvatarModal";

const modals = [
    {
        name: "re-auth-modal",
        element: ReAuthModal
    },
    {
        name: 'logout-modal',
        element: LogoutModal
    },
    {
        name: 'forgot-password-modal',
        element: ForgotPasswordModal
    },
    {
        name: 'remove-avatar-modal',
        element: RemoveAvatarModal
    }
]

export default modals;