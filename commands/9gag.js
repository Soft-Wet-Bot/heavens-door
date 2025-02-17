import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class NineGaG extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(NineGaG, {
      category: category,

      name: 'heavens door 9gag',
      aliases: [],
      description: 'Adds the 9gag watermark to a picture',
      usage: 'heavens door 9gag [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door 9gag'
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
        'Unknown error occured, notify the creator of the bot if this persists:```js\n' +
        e.stack +
        '```'
      )
    }

    return true
  }

  modifyImage() {
    return this.sharp(this.filename)
      .resize({
        width: 512,
        height: 512,
        fit: 'outside',
        position: 'center',
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('9gag_watermark.png'),
          gravity: 'east'
        }
      ])
  }
}
