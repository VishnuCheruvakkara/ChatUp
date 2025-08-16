import Button from "./Button";

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-bgLight/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-lg font-bold text-primary mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <Button onClick={onCancel} className="bg-gray-300 text-gray-600 hover:bg-gray-200" >Cancell</Button>
                    <Button onClick={onConfirm}> Confirm </Button>


                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
