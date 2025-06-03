import { Builder } from '../builder'

export class TextComponent extends Builder {
  private content: string

  constructor(content: string | number) {
    super()
    this.content = content.toString()
  }

  appendNewLine(): this {
    this.content += '\n'
    return this
  }

  appendSpace(): this {
    this.content += ' '
    return this
  }

  override toJSON(): string {
    return JSON.stringify({
      text: this.content,
      ...this.build()
    })
  }
}
