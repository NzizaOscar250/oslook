import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";


export default function ConfirmActions({open,onShowConfirm,onConfirm}){
    
    return (
        <>
            
            <Dialog
            
                disableEscapeKeyDown
                maxWidth='xs'
                open={open}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete?
                        This action can not be undone.
                    </DialogContentText>
                    <DialogActions>
                        <Button color="primary" onClick={onShowConfirm}>
                            Cancel
                        </Button>
                        <Button color="Secondary" onClick={onConfirm}>
                            Delete
                        </Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </>
    )
}