import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Brazzers extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Brazzers, {
      category: category,

      name: 'heavens door brazzers',
      aliases: [],
      description: 'Adds the brazzers watermark to a picture',
      usage: 'heavens door brazzers [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door brazzers'
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
        width: 768,
        height: 768,
        fit: 'outside',
        position: 'center',
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('brazzerswatermark.png'),
          gravity: 'northeast'
        }
      ])
  }
}
