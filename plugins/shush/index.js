import { findByProps } from "@vendetta/metro"
import { before } from "@vendetta/patcher"

const shushUpBby = args => {
  const msg = (args.length>1)?args[1]:args[0].parsedMessage
  if(!msg.content.startsWith(".")) msg.content = '@silent ' + msg.content
  else msg.content = msg.content.substring(1)
}
let unpatch = []

export default {
  onLoad() {
    unpatch.push(before("sendMessage", findByProps("sendMessage", "receiveMessage"), shushUpBby))
    unpatch.push(before("uploadLocalFiles", findByProps("uploadLocalFiles"), shushUpBby))
  },
  onUnload() {
    unpatch.forEach((x) => x())
    unpatch = []
  }
}
