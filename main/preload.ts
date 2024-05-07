import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  postMessage(channel: string, message: any, transfer?: Transferable[]) {
    ipcRenderer.send(channel, message);
  },
  answerTo(channel: string, callback: (...args: unknown[]) => void) {
    ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: unknown[]) => {
      callback(...args);
    });
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
