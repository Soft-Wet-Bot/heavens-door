import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Fool extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Fool, {
      category: category,

      name: 'heavens door fool',
      aliases: [],
      description: 'The provided image is a fool',
      usage: 'heavens door fool [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door fool'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const out = await this.modifyImage()

      await this.textChannel.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })
    } catch (e) {
      this.textChannel.send(
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  modifyImage() {
    return this.sharp(this.filename)
      .resize({ width: 485, height: 354, fit: 'fill', position: 'center' })
      .extend({
        top: 60,
        bottom: 66,
        left: 78,
        right: 77,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('fool.png'),
          gravity: 'south'
        }
      ])
  }
}
