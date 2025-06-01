import { Builder } from '../builder'

export class TextComponent extends Builder<TextComponent> {
  #content: string

  constructor(content: string | number) {
    super()
    this.#content = content.toString()
  }

  appendNewLine(): this {
    this.#content += '\n'
    return this
  }

  appendSpace(): this {
    this.#content += ' '
    return this
  }

  override toJSON(): string {
    const properties = this.propertiesToJSON()
    return JSON.stringify({
      text: this.#content,
      ...properties
    })
  }
}
