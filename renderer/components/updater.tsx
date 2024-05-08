import { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useUpdate } from './providers/update'

const UpdaterComponent = () => {
    const { updateStatus } = useUpdate();

    useEffect(() => {
        ipcRenderer.on('message', (_, message) => {
            updateStatus(message);
        });

        return () => {
            ipcRenderer.removeAllListeners('message');
        };
    }, [updateStatus]);

    return null; // This component does not render anything
};

export default UpdaterComponent;