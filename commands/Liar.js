import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Liar extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Liar, {
      category: category,

      name: 'heavens door liar',
      aliases: [],
      description: 'An image has the taste of a liar',
      usage: 'heavens door liar [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door liar'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const out = await this.modifyImage()

      await this.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })
    } catch (e) {
      this.send(
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  modifyImage() {
    return this.sharp(this.filename)
      .resize({ width: 383, height: 383, fit: 'fill', position: 'center' })
      .extend({ top: 0, bottom: 0, left: 0, right: 231, background: 'black' })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('liar.png'),
          gravity: 'south'
        }
      ])
  }
}
