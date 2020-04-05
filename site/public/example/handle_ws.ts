import { createApp } from "../../../mod.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";

function handleHandshake(sock: WebSocket) {
  async function handleMessage(sock: WebSocket) {
    for await (const msg of sock.receive()) {
      if (typeof msg === "string") {
        sock.send(msg);
      }
    }
  }
  handleMessage(sock);
}
const app = createApp();
app.ws("/ws", handleHandshake);
app.listen({ port: 8899 });