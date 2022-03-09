export default class OkParser {

  match(data) {
    return data.startsWith('ok')
  }

  parse(data, controller) {
    controller.emit('data:ok', data)
  }

}