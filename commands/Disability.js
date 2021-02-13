import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Disability extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Disability, {
      category: category,

      name: 'heavens door disability',
      aliases: [],
      description: 'Not all disabilities look like "your image"',
      usage: 'heavens door disability [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      examples: ['heavens door disability']
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
      .resize({
        width: 188,
        height: 228,
        fit: 'contain',
        position: 'center',
        background: 'white'
      })
      .extend({
        top: 304,
        bottom: 188,
        left: 506,
        right: 26,
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('disabilities.png'),
          gravity: 'south'
        }
      ])
  }
}
