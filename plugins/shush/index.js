import { findByProps } from "@vendetta/metro"
import { before, instead } from "@vendetta/patcher"

const shushUpBby = args => {
  const msg = (args.length>1)?args[1]:args[0].parsedMessage
  let smol = false, quiet = false
  if(!msg.content.startsWith(",")) smol = true
  else msg.content = msg.content.substring(1)
  if(!msg.content.startsWith(".")) quiet = true
  else msg.content = msg.content.substring(1)
  msg.content = quiet?'@silent ':'' + smol?'-# ':'' + msg.content
}
let unpatch = []

export default {
  onLoad() {
    unpatch.push(before("sendMessage", findByProps("sendMessage", "receiveMessage"), shushUpBby))
    unpatch.push(before("uploadLocalFiles", findByProps("uploadLocalFiles"), shushUpBby))
    unpatch.push(instead("startTyping", findByProps("startTyping", "stopTyping"), _=>{}))
    unpatch.push(instead("stopTyping", findByProps("startTyping", "stopTyping"), _=>{}))
  },
  onUnload() {
    unpatch.forEach((x) => x())
    unpatch = []
  }
}
