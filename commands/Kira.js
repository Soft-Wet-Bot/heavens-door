import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Kira extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Kira, {
      category: category,

      name: 'heavens door kira',
      aliases: [],
      description: 'An image has scared Kira',
      usage: 'heavens door kira [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door kira'
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
      .resize({ width: 382, height: 382, fit: 'fill', position: 'center' })
      .extend({
        top: 0,
        bottom: 0,
        left: 0,
        right: 195,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('kira.png'),
          gravity: 'south'
        }
      ])
      .png()
  }
}
