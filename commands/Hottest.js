import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Hottest extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Hottest, {
      category: category,

      name: 'heavens door hottest',
      aliases: [],
      description: 'Heart attack goes after an image',
      usage: 'heavens door hottest [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door hottest'
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
      .resize({ width: 566, height: 324, fit: 'contain', position: 'center' })
      .extend({ top: 318, bottom: 318, left: 0, right: 0, background: 'black' })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('hottest.png'),
          gravity: 'south'
        }
      ])
  }
}
