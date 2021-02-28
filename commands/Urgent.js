import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Urgent extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Urgent, {
      category: category,

      name: 'heavens door urgent',
      aliases: ['message', 'msg', 'dm'],
      description: 'Provided image was urgently sent',
      usage: 'heavens door urgent [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door urgent'
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

  async modifyImage() {
    return this.sharp(this.filename)
      .resize({ width: 546, height: 461, fit: 'fill', position: 'center' })
      .extend({
        top: 14,
        bottom: 684,
        left: 24,
        right: 264,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('urgent.png'),
          gravity: 'south'
        }
      ])
  }
}
