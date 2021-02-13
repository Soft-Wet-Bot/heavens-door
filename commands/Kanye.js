import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Kanye extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Kanye, {
      category: category,

      name: 'heavens door kanye',
      aliases: ['trump3'],
      description: 'Trump likes the provided image',
      usage: 'heavens door kanye [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door kanye'
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
      .resize({ width: 558, height: 356, fit: 'fill', position: 'center' })
      .extend({
        top: 292,
        bottom: 43,
        left: 51,
        right: 31,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('kanye.png'),
          gravity: 'south'
        }
      ])
  }
}
